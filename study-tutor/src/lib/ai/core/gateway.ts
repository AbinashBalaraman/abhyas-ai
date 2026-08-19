export type ModelTier = 'TIER1_GEMINI_LITE' | 'TIER2_OPENCODE' | 'TIER3_SAFE_FALLBACK';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class MultiTierModelGateway {
  private static instance: MultiTierModelGateway;

  private constructor() {}

  public static getInstance(): MultiTierModelGateway {
    if (!MultiTierModelGateway.instance) {
      MultiTierModelGateway.instance = new MultiTierModelGateway();
    }
    return MultiTierModelGateway.instance;
  }

  /**
   * Execute multi-turn conversation with high-speed LLM cascading across Gemini Flash-Lite & OpenCode
   */
  async executeChat(
    messages: ChatMessage[],
    systemPrompt: string,
    preferredModel: string = 'gemini-flash-lite-latest'
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

    // 1. Primary: Lightning-fast Gemini Flash-Lite models (sub-1s latency)
    if (geminiKey) {
      const geminiCandidates = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'];
      for (const gm of geminiCandidates) {
        try {
          const text = await this.callGeminiDirect(gm, systemPrompt, messages, geminiKey);
          if (text) {
            return {
              text,
              tierUsed: 'TIER1_GEMINI_LITE',
              provider: gm
            };
          }
        } catch (e) {
          // try next model
        }
      }
    }

    // 2. Secondary: OpenCode Models (Nemotron 3.5 Lightning -> DeepSeek v4)
    if (openCodeKey) {
      const openCodeCandidates = ['nemotron-3.5-lightning-free', 'deepseek-v4-flash-free'];
      for (const om of openCodeCandidates) {
        try {
          const text = await this.callOpenCode(om, systemPrompt, messages, openCodeKey);
          if (text) {
            return {
              text,
              tierUsed: 'TIER2_OPENCODE',
              provider: om
            };
          }
        } catch (e) {
          // try next model
        }
      }
    }

    // 3. Fallback: Contextual assistance
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    return {
      text: `Regarding "${lastUserMsg}": Would you like to explore the core concepts, official exam dates, or practice questions on this?`,
      tierUsed: 'TIER3_SAFE_FALLBACK',
      provider: 'safe-fallback'
    };
  }

  /**
   * Helper for single prompt execution
   */
  async execute(
    preferredModel: string,
    systemPrompt: string,
    userMessage: string
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    return this.executeChat([{ role: 'user', content: userMessage }], systemPrompt, preferredModel);
  }

  private async callGeminiDirect(
    modelName: string,
    systemPrompt: string,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<string | null> {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    
    for (const m of messages) {
      const gRole = m.role === 'assistant' ? 'model' : 'user';
      if (!m.content || !m.content.trim()) continue;

      if (contents.length > 0 && contents[contents.length - 1].role === gRole) {
        contents[contents.length - 1].parts[0].text += `\n\n${m.content}`;
      } else {
        contents.push({ role: gRole, parts: [{ text: m.content }] });
      }
    }

    // Gemini API strict rule: First turn must be 'user'
    while (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    if (contents.length === 0) {
      const lastMsg = messages[messages.length - 1]?.content || 'Hello';
      contents.push({ role: 'user', parts: [{ text: lastMsg }] });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1500
          }
        })
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  private async callOpenCode(
    modelName: string,
    systemPrompt: string,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<string | null> {
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        model: modelName,
        messages: formattedMessages,
        temperature: 0.4,
        max_tokens: 1500
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || null;

    if (content) {
      content = content.replace(/^Here's a thinking process:[\s\S]*?(?=\n\n|\n[A-Z#*])/i, '').trim();
    }
    return content;
  }
}
