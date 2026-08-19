import { ModelCircuitBreaker } from './circuit-breaker';

export type ModelTier = 'TIER1_GEMINI' | 'TIER2_OPENCODE' | 'TIER3_SAFE_MODE';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class MultiTierModelGateway {
  private static instance: MultiTierModelGateway;
  private breakers = new Map<string, ModelCircuitBreaker>();

  private constructor() {
    this.breakers.set('gemini-direct', new ModelCircuitBreaker('Gemini-Direct'));
    this.breakers.set('opencode-models', new ModelCircuitBreaker('OpenCode-Models'));
  }

  public static getInstance(): MultiTierModelGateway {
    if (!MultiTierModelGateway.instance) {
      MultiTierModelGateway.instance = new MultiTierModelGateway();
    }
    return MultiTierModelGateway.instance;
  }

  /**
   * Execute multi-turn conversation across cascading AI tiers
   */
  async executeChat(
    messages: ChatMessage[],
    systemPrompt: string,
    preferredModel: string = 'gemini-3.6-flash'
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

    // 1. Primary: Gemini 3.6 Flash / 2.5 Flash
    if (geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        const geminiModels = ['gemini-3.6-flash', 'gemini-2.5-flash'];
        for (const gm of geminiModels) {
          try {
            const res = await this.callGeminiDirect(gm, systemPrompt, messages, geminiKey);
            if (res) {
              geminiBreaker.recordSuccess();
              return { text: res, tierUsed: 'TIER1_GEMINI', provider: gm };
            }
          } catch (e) {
            // try next model
          }
        }
        geminiBreaker.recordFailure();
      }
    }

    // 2. Tier 2: OpenCode Models (Nemotron 3.5 -> DeepSeek v4 -> Mimo 2.5)
    if (openCodeKey) {
      const openCodeBreaker = this.breakers.get('opencode-models')!;
      if (openCodeBreaker.isAvailable()) {
        const modelsToTry = ['nemotron-3.5-lightning-free', 'deepseek-v4-flash-free', 'mimo-v2.5-free'];
        for (const m of modelsToTry) {
          try {
            const openCodeRes = await this.callOpenCode(m, systemPrompt, messages, openCodeKey);
            if (openCodeRes) {
              openCodeBreaker.recordSuccess();
              return { text: openCodeRes, tierUsed: 'TIER2_OPENCODE', provider: m };
            }
          } catch (err) {
            // try next
          }
        }
        openCodeBreaker.recordFailure();
      }
    }

    // 3. Tier 3: Context-aware fallback response
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    return {
      text: `Regarding "${lastUserMsg}": Would you like me to walk through the core concepts, official exam dates, or practice questions on this?`,
      tierUsed: 'TIER3_SAFE_MODE',
      provider: 'fallback'
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
      signal: AbortSignal.timeout(6500),
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
      // Clean thinking process logs if model outputs them
      content = content.replace(/^Here's a thinking process:[\s\S]*?(?=\n\n|\n[A-Z#*])/i, '').trim();
    }

    return content;
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(6500),
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2000
          }
        })
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }
}
