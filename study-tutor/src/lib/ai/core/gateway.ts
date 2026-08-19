import { ModelCircuitBreaker } from './circuit-breaker';

export type ModelTier = 'TIER1_OPENCODE' | 'TIER2_GEMINI' | 'TIER3_SAFE_MODE';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class MultiTierModelGateway {
  private static instance: MultiTierModelGateway;
  private breakers = new Map<string, ModelCircuitBreaker>();

  private constructor() {
    this.breakers.set('opencode-deepseek', new ModelCircuitBreaker('OpenCode-DeepSeek'));
    this.breakers.set('opencode-mimo', new ModelCircuitBreaker('OpenCode-Mimo'));
    this.breakers.set('gemini-direct', new ModelCircuitBreaker('Gemini-Direct'));
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
    preferredModel: string = 'deepseek-v4-flash-free'
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';
    const modelKey = preferredModel.toLowerCase();

    // 1. If explicit Gemini requested or OpenCode unavailable, use Gemini
    if ((modelKey.includes('gemini') || !openCodeKey) && geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        try {
          const res = await this.callGeminiDirect('gemini-2.5-flash', systemPrompt, messages, geminiKey);
          if (res) {
            geminiBreaker.recordSuccess();
            return { text: res, tierUsed: 'TIER2_GEMINI', provider: 'gemini-2.5-flash' };
          }
        } catch (e) {
          geminiBreaker.recordFailure();
        }
      }
    }

    // 2. Tier 1: OpenCode Models (DeepSeek v4 Flash -> Mimo 2.5)
    const tier1Breaker = this.breakers.get('opencode-deepseek')!;
    if (tier1Breaker.isAvailable() && openCodeKey) {
      const initialModel = modelKey.includes('mimo') ? 'mimo-v2.5-free' : 'deepseek-v4-flash-free';
      const modelsToTry = [initialModel, 'mimo-v2.5-free', 'deepseek-v4-flash-free'];

      for (const m of modelsToTry) {
        try {
          const openCodeRes = await this.callOpenCode(m, systemPrompt, messages, openCodeKey);
          if (openCodeRes) {
            tier1Breaker.recordSuccess();
            return { text: openCodeRes, tierUsed: 'TIER1_OPENCODE', provider: m };
          }
        } catch (err) {
          // try next model
        }
      }
      tier1Breaker.recordFailure();
    }

    // 3. Tier 2: Escalate to Gemini
    if (geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        try {
          const res = await this.callGeminiDirect('gemini-2.5-flash', systemPrompt, messages, geminiKey);
          if (res) {
            geminiBreaker.recordSuccess();
            return { text: res, tierUsed: 'TIER2_GEMINI', provider: 'gemini-2.5-flash-escalated' };
          }
        } catch (e) {
          geminiBreaker.recordFailure();
        }
      }
    }

    // 4. Tier 3: Context-aware fallback response
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    return {
      text: `I received your message regarding "${lastUserMsg}". What specific aspect would you like to explore (e.g. concepts, official dates, formulas, or practice questions)?`,
      tierUsed: 'TIER3_SAFE_MODE',
      provider: 'fallback'
    };
  }

  /**
   * Helper for single prompt execution (backwards compatibility)
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
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        model: modelName,
        messages: formattedMessages,
        temperature: 0.4,
        max_tokens: 1500
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  }

  private async callGeminiDirect(
    modelName: string,
    systemPrompt: string,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<string | null> {
    // Format contents for Gemini multi-turn
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(6000),
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
}
