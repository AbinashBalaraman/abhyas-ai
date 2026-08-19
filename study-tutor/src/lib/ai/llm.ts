export async function callLLM(
  model: string,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const modelKey = model.toLowerCase();

  const geminiKey = process.env.GEMINI_API_KEY || '';
  const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

  // 1. Google Gemini Models
  if (modelKey === 'gemini' || modelKey === 'gemini-1.5-flash' || modelKey === 'gemini-2.5-flash') {
    const modelName = modelKey === 'gemini' ? 'gemini-2.5-flash' : modelKey;
    try {
      console.log(`Routing to Gemini (${modelName})...`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${systemPrompt}\n\nUser Message: ${userMessage}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      throw new Error('Gemini API returned an empty or invalid response format');
    } catch (error: any) {
      console.error(`Gemini call failed for ${modelName}:`, error.message);
      // Fallback to OpenCode Zen deepseek model
      console.log('Falling back to OpenCode Zen (deepseek-v4-flash-free)...');
      return callOpenCodeZen('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey);
    }
  }

  // 2. OpenCode Zen - DeepSeek Free Model
  if (modelKey === 'deepseek-free' || modelKey === 'deepseek-v4-flash-free' || modelKey === 'opencode') {
    return callOpenCodeZen('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey);
  }

  // 3. OpenCode Zen - Mimo Free Model
  if (modelKey === 'mimo-free' || modelKey === 'mimo-v2.5-free') {
    return callOpenCodeZen('mimo-v2.5-free', systemPrompt, userMessage, openCodeKey);
  }

  // 4. Local Ollama (Qwen)
  if (modelKey === 'ollama' || modelKey === 'qwen2.5:3b') {
    try {
      console.log('Routing to Local Ollama (qwen2.5:3b)...');
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen2.5:3b',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          options: {
            temperature: 0.3
          },
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.message?.content) {
        return data.message.content;
      }
      throw new Error('Ollama returned an empty response');
    } catch (error: any) {
      console.error('Ollama call failed:', error.message);
      console.log('Ollama is offline. Falling back to OpenCode Zen (deepseek-v4-flash-free)...');
      return callOpenCodeZen('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey);
    }
  }

  // 5. Default / Mistral (Fallback to OpenCode Zen deepseek-v4-flash-free)
  console.log('Defaulting/Fallback to OpenCode Zen deepseek-v4-flash-free...');
  return callOpenCodeZen('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey);
}

async function callOpenCodeZen(
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  retryCount: number = 0
): Promise<string> {
  try {
    console.log(`Routing to OpenCode Zen (${modelName})...`);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      // If rate limited on this key/model, cascade gracefully
      if (response.status === 429 && retryCount === 0) {
        console.warn('OpenCode key hit 429 rate limit. Retrying with alternative public channel...');
        // Retry with public pool or alternative model
        return callOpenCodeZen(modelName === 'deepseek-v4-flash-free' ? 'mimo-v2.5-free' : 'deepseek-v4-flash-free', systemPrompt, userMessage, '', 1);
      }
      throw new Error(`OpenCode Zen error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    throw new Error('OpenCode Zen returned empty choices');
  } catch (error: any) {
    console.error(`OpenCode Zen call failed for ${modelName}:`, error.message);
    if (retryCount === 0) {
      console.log('Attempting fallback to mimo-v2.5-free...');
      return callOpenCodeZen('mimo-v2.5-free', systemPrompt, userMessage, '', 1);
    }
    return `⚠️ Model communication error: ${error.message}. Please check if the API keys are correct and you are connected to the internet.`;
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

/**
 * Performs a LIVE web search using Gemini's built-in Google Search grounding.
 * Returns real-time, cited information. Best-effort: returns empty on failure
 * so the caller can fall back to local study material.
 */
export async function webSearch(query: string): Promise<WebSearchResult> {
  const geminiKey = process.env.GEMINI_API_KEY || '';
  if (!geminiKey) {
    console.warn('GEMINI_API_KEY not configured. Skipping live web search.');
    return { text: '', sources: [] };
  }
  try {
    console.log('Performing live web search for:', query);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          generationConfig: { temperature: 0.2 }
        })
      }
    );

    if (!response.ok) {
      console.error('Web search request failed:', response.status);
      return { text: '', sources: [] };
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const text = parts.map((p: any) => p.text || '').join('');

    const chunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: WebSearchSource[] = chunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({ title: c.web.title || c.web.uri, uri: c.web.uri }));

    return { text: text.trim(), sources };
  } catch (error: any) {
    console.error('Live web search failed:', error?.message);
    return { text: '', sources: [] };
  }
}
