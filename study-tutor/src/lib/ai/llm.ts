export async function callLLM(
  model: string,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const modelKey = (model || 'deepseek-free').toLowerCase();

  const geminiKey = process.env.GEMINI_API_KEY || '';
  const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

  // 1. Google Gemini Models
  if (modelKey === 'gemini' || modelKey === 'gemini-1.5-flash' || modelKey === 'gemini-2.5-flash') {
    const geminiResult = await callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
    if (geminiResult) return geminiResult;

    // Fallback to OpenCode Zen
    console.log('Gemini failed/unavailable. Falling back to OpenCode Zen...');
    return callOpenCodeZenWithFallback('deepseek-v4-flash-free', systemPrompt, userMessage, openCodeKey, geminiKey);
  }

  // 2. OpenCode Zen Models (Default / DeepSeek / Mimo / Mistral)
  return callOpenCodeZenWithFallback(
    modelKey === 'mimo-free' || modelKey === 'mimo-v2.5-free' ? 'mimo-v2.5-free' : 'deepseek-v4-flash-free',
    systemPrompt,
    userMessage,
    openCodeKey,
    geminiKey
  );
}

async function callGeminiDirect(
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  apiKey: string
): Promise<string | null> {
  if (!apiKey) return null;
  try {
    console.log(`Routing to Gemini (${modelName})...`);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Message: ${userMessage}` }]
            }
          ],
          generationConfig: { temperature: 0.3 }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Gemini API returned ${response.status}:`, errorText);
      return null;
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  } catch (error: any) {
    console.warn('Gemini call error:', error.message);
    return null;
  }
}

async function callOpenCodeZenWithFallback(
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  apiKey: string,
  geminiKey: string
): Promise<string> {
  // Step 1: Try requested model with API key
  let result = await tryOpenCode(modelName, systemPrompt, userMessage, apiKey);
  if (result.success) return result.text;

  // Step 2: If rate limited or failed, try alternative OpenCode model (mimo <-> deepseek)
  const altModel = modelName === 'deepseek-v4-flash-free' ? 'mimo-v2.5-free' : 'deepseek-v4-flash-free';
  console.log(`OpenCode primary attempt failed (${result.error}). Trying alternative model (${altModel})...`);
  result = await tryOpenCode(altModel, systemPrompt, userMessage, apiKey);
  if (result.success) return result.text;

  // Step 3: Try Google Gemini as seamless resilient fallback
  if (geminiKey) {
    console.log('OpenCode models rate-limited. Seamlessly falling back to Google Gemini 2.5 Flash...');
    const geminiText = await callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
    if (geminiText) return geminiText;
  }

  // Step 4: Try unauthenticated OpenCode public pool
  console.log('Trying unauthenticated OpenCode public pool...');
  result = await tryOpenCode('deepseek-v4-flash-free', systemPrompt, userMessage, '');
  if (result.success) return result.text;

  return `⚠️ Model communication error: OpenCode and fallback channels are temporarily busy (${result.error}). Please wait a few seconds and try again.`;
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

export interface WebSearchSource {
  title: string;
  uri: string;
}

export interface WebSearchResult {
  text: string;
  sources: WebSearchSource[];
}

export async function webSearch(query: string): Promise<WebSearchResult> {
  const geminiKey = process.env.GEMINI_API_KEY || '';
  if (!geminiKey) {
    return { text: '', sources: [] };
  }
  try {
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
    return { text: '', sources: [] };
  }
}
