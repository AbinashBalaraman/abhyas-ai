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
    this.breakers.set('gemini-direct', new ModelCircuitBreaker('Gemini-Direct'));
    this.breakers.set('opencode-deepseek', new ModelCircuitBreaker('OpenCode-DeepSeek'));
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

    // 1. Primary: Gemini 3.6 Flash
    if (geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        try {
          const res = await this.callGeminiDirect('gemini-3.6-flash', systemPrompt, messages, geminiKey);
          if (res) {
            geminiBreaker.recordSuccess();
            return { text: res, tierUsed: 'TIER2_GEMINI', provider: 'gemini-3.6-flash' };
          }
        } catch (e) {
          geminiBreaker.recordFailure();
        }
      }
    }

    // 2. Tier 2: OpenCode Models (DeepSeek v4 Flash -> Mimo 2.5)
    const tier1Breaker = this.breakers.get('opencode-deepseek')!;
    if (tier1Breaker.isAvailable() && openCodeKey) {
      const modelsToTry = ['deepseek-v4-flash-free', 'mimo-v2.5-free'];
      for (const m of modelsToTry) {
        try {
          const openCodeRes = await this.callOpenCode(m, systemPrompt, messages, openCodeKey);
          if (openCodeRes) {
            tier1Breaker.recordSuccess();
            return { text: openCodeRes, tierUsed: 'TIER1_OPENCODE', provider: m };
          }
        } catch (err) {
          // try next
        }
      }
      tier1Breaker.recordFailure();
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
      signal: AbortSignal.timeout(4500),
      body: JSON.stringify({
        model: modelName,
        messages: formattedMessages,
        temperature: 0.4,
        max_tokens: 1200
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
    // Ensure alternating user/model contents for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    
    for (const m of messages) {
      const gRole = m.role === 'assistant' ? 'model' : 'user';
      if (!m.content || !m.content.trim()) continue;

      if (contents.length > 0 && contents[contents.length - 1].role === gRole) {
        // Merge consecutive messages from same role to prevent Gemini 400 alternating error
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
        signal: AbortSignal.timeout(5500),
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1200
          }
        })
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }
}
