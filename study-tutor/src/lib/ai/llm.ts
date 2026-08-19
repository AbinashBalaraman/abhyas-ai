export async function callLLM(
  model: string,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const modelKey = (model || 'deepseek-v4-flash-free').toLowerCase();

  const geminiKey = process.env.GEMINI_API_KEY || '';
  const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

  // --- TIER 2 EXPLICIT: Google Gemini API ---
  if (modelKey.includes('gemini')) {
    const geminiResult = await callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
    if (geminiResult) return geminiResult;

    // Fallback to Tier 1 (OpenCode Zen)
    console.log('Tier 2 Gemini unavailable. Falling back to Tier 1 OpenCode...');
    return callTier1OpenCodeCascade('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey, geminiKey);
  }

  // --- TIER 1: OpenCode Zen (DeepSeek v4 Flash / Mimo 2.5) ---
  const initialTier1Model = modelKey.includes('mimo') 
    ? 'mimo-v2.5-free' 
    : 'deepseek-v4-flash-free';

  return callTier1OpenCodeCascade(
    initialTier1Model,
    systemPrompt,
    userMessage,
    openCodeKey,
    geminiKey
  );
}

// -------------------------------------------------------------
// TIER 1: OpenCode Zen Models Cascade (DeepSeek v4 Flash -> Mimo 2.5)
// -------------------------------------------------------------
const TIER1_MODELS = [
  'deepseek-v4-flash-free',
  'mimo-v2.5-free',
  'nemotron-3.5-lightning-free',
  'hy3-free'
];

async function callTier1OpenCodeCascade(
  preferredModel: string,
  systemPrompt: string,
  userMessage: string,
  openCodeKey: string,
  geminiKey: string
): Promise<string> {
  // 1. Try preferred Tier 1 model first (e.g. DeepSeek v4 Flash or Mimo 2.5)
  let result = await tryOpenCode(preferredModel, systemPrompt, userMessage, openCodeKey);
  if (result.success) return result.text;

  // 2. Cascade through remaining Tier 1 models
  for (const altModel of TIER1_MODELS) {
    if (altModel === preferredModel) continue;
    result = await tryOpenCode(altModel, systemPrompt, userMessage, openCodeKey);
    if (result.success) return result.text;
  }

  // 3. Auto-escalate to Tier 2 (Google Gemini API) if Tier 1 endpoints are busy
  if (geminiKey) {
    console.log('Tier 1 OpenCode busy. Escalating to Tier 2 Google Gemini API...');
    const geminiText = await callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
    if (geminiText) return geminiText;
  }

  // 4. Last resort: unauthenticated pool
  result = await tryOpenCode('nemotron-3.5-lightning-free', systemPrompt, userMessage, '');
  if (result.success) return result.text;

  return `⚠️ All AI channels are temporarily busy. Please wait a moment and try your question again.`;
}

async function tryOpenCode(
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  apiKey: string
): Promise<{ success: boolean; text: string; error?: string }> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(4500),
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, text: '', error: `HTTP ${response.status} - ${errorText.substring(0, 100)}` };
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return { success: true, text: data.choices[0].message.content };
    }
    return { success: false, text: '', error: 'Empty choices in response' };
  } catch (error: any) {
    return { success: false, text: '', error: error.message };
  }
}

// -------------------------------------------------------------
// TIER 2: Google Gemini Direct API Call
// -------------------------------------------------------------
async function callGeminiDirect(
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  apiKey: string
): Promise<string | null> {
  if (!apiKey) return null;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(4500),
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${userMessage}` }]
            }
          ],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1500 }
        })
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  } catch (error: any) {
    return null;
  }
}

export interface WebSearchSource {
  title: string;
  uri: string;
}

export interface WebSearchResult {
  text: string;
  sources: WebSearchSource[];
}

export async function webSearch(query: string): Promise<WebSearchResult> {
  // 1. Google Gemini Native Search Grounding (if key available)
  const geminiKey = process.env.GEMINI_API_KEY || '';
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(3500),
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Search the web and give the most current, accurate, and up-to-date information for the following query. Prefer official sources (e.g. sbi.co.in, ibps.in, ssc.nic.in) and recent articles. Query: ${query}`
                  }
                ]
              }
            ],
            tools: [{ googleSearch: {} }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 1000 }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const parts = data.candidates?.[0]?.content?.parts || [];
        const text = parts.map((p: any) => p.text || '').join('');

        const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources: WebSearchSource[] = chunks
          .filter((c: any) => c.web?.uri)
          .map((c: any) => ({ title: c.web.title || c.web.uri, uri: c.web.uri }));

        if (text.trim()) {
          return { text: text.trim(), sources };
        }
      }
    } catch (error: any) {
      console.error('Gemini search grounding error:', error.message);
    }
  }

  // 2. Keyless Zero-Key Open Search (DuckDuckGo Instant Answer API - Always 100% Free & No Keys Required)
  try {
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetch(ddgUrl, { signal: AbortSignal.timeout(3000) });
    if (ddgRes.ok) {
      const data = await ddgRes.json();
      const textParts: string[] = [];
      const sources: WebSearchSource[] = [];

      if (data.Heading && data.AbstractText) {
        textParts.push(`• **${data.Heading}** (${data.AbstractSource || 'Web'}):\n${data.AbstractText}`);
        if (data.AbstractURL) {
          sources.push({ title: data.Heading, uri: data.AbstractURL });
        }
      }

      if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
        for (const topic of data.RelatedTopics.slice(0, 4)) {
          if (topic.Text) {
            textParts.push(`• ${topic.Text}`);
            if (topic.FirstURL) {
              sources.push({ title: topic.Text.split(' - ')[0] || 'Official Source', uri: topic.FirstURL });
            }
          }
        }
      }

      if (textParts.length > 0) {
        return {
          text: textParts.join('\n\n'),
          sources
        };
      }
    }
  } catch (e: any) {
    console.error('DuckDuckGo keyless search error:', e.message);
  }

  return { text: '', sources: [] };
}
