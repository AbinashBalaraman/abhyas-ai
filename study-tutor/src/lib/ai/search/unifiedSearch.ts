import { NormalizedSearchResult } from '../core/types';

export interface SearchOptions {
  maxResults?: number;
  timeoutMs?: number;
  domainFilter?: string;
}

export class UnifiedSearchAdapter {
  private static instance: UnifiedSearchAdapter;

  private constructor() {}

  public static getInstance(): UnifiedSearchAdapter {
    if (!UnifiedSearchAdapter.instance) {
      UnifiedSearchAdapter.instance = new UnifiedSearchAdapter();
    }
    return UnifiedSearchAdapter.instance;
  }

  /**
   * Search against multi-tier providers:
   * Tier 1: Google Gemini Grounding (if key available)
   * Tier 2: Brave Search / Tavily (if keys available)
   * Tier 3: Keyless Jina Reader & DuckDuckGo Instant (Always free & available)
   */
  async search(query: string, options: SearchOptions = {}): Promise<{
    provider: string;
    text: string;
    results: NormalizedSearchResult[];
  }> {
    const maxResults = options.maxResults || 5;

    // 1. Google Gemini Native Grounding
    const geminiKey = process.env.GEMINI_API_KEY || '';
    if (geminiKey) {
      try {
        const geminiRes = await this.tryGeminiGrounding(query, geminiKey, options);
        if (geminiRes && geminiRes.results.length > 0) {
          return geminiRes;
        }
      } catch (e: any) {
        console.warn('[UnifiedSearch] Gemini grounding failed, falling back...', e.message);
      }
    }

    // 2. Brave Search API (if key present)
    const braveKey = process.env.BRAVE_SEARCH_API_KEY || '';
    if (braveKey) {
      try {
        const braveRes = await this.tryBraveSearch(query, braveKey, options);
        if (braveRes && braveRes.results.length > 0) {
          return braveRes;
        }
      } catch (e: any) {
        console.warn('[UnifiedSearch] Brave search failed, falling back...', e.message);
      }
    }

    // 3. Keyless Jina AI & DuckDuckGo Instant Engine (Guaranteed 100% Free Fallback)
    return this.tryKeylessSearch(query, options);
  }

  private async tryGeminiGrounding(
    query: string,
    apiKey: string,
    options: SearchOptions
  ): Promise<{ provider: string; text: string; results: NormalizedSearchResult[] } | null> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(options.timeoutMs || 3500),
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `Search the web and provide the latest facts, dates, and official notices for: ${query}` }]
            }
          ],
          tools: [{ googleSearch: {} }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1000 }
        })
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p: any) => p.text || '').join('').trim();
    const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const results: NormalizedSearchResult[] = chunks
      .filter((c: any) => c.web?.uri)
      .slice(0, options.maxResults || 5)
      .map((c: any) => ({
        title: c.web.title || c.web.uri,
        url: c.web.uri,
        snippet: c.web.title || '',
        provider: 'Google:GeminiGrounding'
      }));

    if (text) {
      return { provider: 'Google:GeminiGrounding', text, results };
    }
    return null;
  }

  private async tryBraveSearch(
    query: string,
    apiKey: string,
    options: SearchOptions
  ): Promise<{ provider: string; text: string; results: NormalizedSearchResult[] } | null> {
    const params = new URLSearchParams({
      q: query,
      count: String(options.maxResults || 5)
    });

    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': apiKey
      },
      signal: AbortSignal.timeout(options.timeoutMs || 3500)
    });

    if (!response.ok) return null;
    const data = await response.json();
    const webResults = data.web?.results || [];

    const results: NormalizedSearchResult[] = webResults.map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.description || '',
      publishedDate: r.page_age,
      provider: 'BraveSearch'
    }));

    const text = results.map(r => `• **${r.title}**: ${r.snippet}`).join('\n\n');
    return { provider: 'BraveSearch', text, results };
  }

  private async tryKeylessSearch(
    query: string,
    options: SearchOptions
  ): Promise<{ provider: string; text: string; results: NormalizedSearchResult[] }> {
    const results: NormalizedSearchResult[] = [];
    const textParts: string[] = [];

    // A. DuckDuckGo Instant Answer API
    try {
      const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
      const res = await fetch(ddgUrl, { signal: AbortSignal.timeout(options.timeoutMs || 2500) });
      if (res.ok) {
        const data = await res.json();
        if (data.Heading && data.AbstractText) {
          textParts.push(`• **${data.Heading}** (${data.AbstractSource || 'Web'}):\n${data.AbstractText}`);
          if (data.AbstractURL) {
            results.push({
              title: data.Heading,
              url: data.AbstractURL,
              snippet: data.AbstractText,
              provider: 'DuckDuckGo:Instant'
            });
          }
        }

        if (Array.isArray(data.RelatedTopics)) {
          for (const topic of data.RelatedTopics.slice(0, options.maxResults || 4)) {
            if (topic.Text && topic.FirstURL) {
              results.push({
                title: topic.Text.split(' - ')[0] || 'Official Source',
                url: topic.FirstURL,
                snippet: topic.Text,
                provider: 'DuckDuckGo:Related'
              });
              textParts.push(`• ${topic.Text}`);
            }
          }
        }
      }
    } catch {}

    // B. Jina Search Reader (s.jina.ai) if DuckDuckGo had limited matches
    if (results.length === 0) {
      try {
        const jinaUrl = `https://s.jina.ai/${encodeURIComponent(query)}`;
        const jinaRes = await fetch(jinaUrl, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(3000)
        });
        if (jinaRes.ok) {
          const jinaData = await jinaRes.json();
          if (Array.isArray(jinaData.data)) {
            for (const item of jinaData.data.slice(0, options.maxResults || 4)) {
              results.push({
                title: item.title || query,
                url: item.url,
                snippet: item.description || item.content?.substring(0, 200) || '',
                provider: 'JinaReader'
              });
              textParts.push(`• **${item.title}**: ${item.description || item.content?.substring(0, 200)}`);
            }
          }
        }
      } catch {}
    }

    return {
      provider: results[0]?.provider || 'KeylessEngine',
      text: textParts.join('\n\n'),
      results
    };
  }
}
