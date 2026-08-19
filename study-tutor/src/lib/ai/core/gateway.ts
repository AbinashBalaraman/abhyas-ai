import { ModelCircuitBreaker } from './circuit-breaker';

export type ModelTier = 'TIER1_OPENCODE' | 'TIER2_GEMINI' | 'TIER3_SAFE_MODE';

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
   * Execute prompt across resilient cascading tiers with circuit-breaking protection
   */
  async execute(
    preferredModel: string,
    systemPrompt: string,
    userMessage: string
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

    const modelKey = (preferredModel || 'deepseek-v4-flash-free').toLowerCase();

    // 1. If explicit Gemini requested
    if (modelKey.includes('gemini') && geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        try {
          const res = await this.callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
          if (res) {
            geminiBreaker.recordSuccess();
            return { text: res, tierUsed: 'TIER2_GEMINI', provider: 'gemini-2.5-flash' };
          }
        } catch (e) {
          geminiBreaker.recordFailure();
        }
      }
    }

    // 2. Tier 1: OpenCode Models (DeepSeek v4 Flash -> Mimo 2.5 -> Nemotron)
    const tier1Breaker = this.breakers.get('opencode-deepseek')!;
    if (tier1Breaker.isAvailable()) {
      const initialModel = modelKey.includes('mimo') ? 'mimo-v2.5-free' : 'deepseek-v4-flash-free';
      const modelsToTry = [initialModel, 'mimo-v2.5-free', 'deepseek-v4-flash-free', 'nemotron-3.5-lightning-free'];

      for (const m of modelsToTry) {
        try {
          const openCodeRes = await this.callOpenCode(m, systemPrompt, userMessage, openCodeKey);
          if (openCodeRes) {
            tier1Breaker.recordSuccess();
            return { text: openCodeRes, tierUsed: 'TIER1_OPENCODE', provider: m };
          }
        } catch (err) {
          // continue fallback
        }
      }
      tier1Breaker.recordFailure();
    }

    // 3. Tier 2: Escalate to Google Gemini API
    if (geminiKey) {
      const geminiBreaker = this.breakers.get('gemini-direct')!;
      if (geminiBreaker.isAvailable()) {
        try {
          const res = await this.callGeminiDirect('gemini-2.5-flash', systemPrompt, userMessage, geminiKey);
          if (res) {
            geminiBreaker.recordSuccess();
            return { text: res, tierUsed: 'TIER2_GEMINI', provider: 'gemini-2.5-flash-escalated' };
          }
        } catch (e) {
          geminiBreaker.recordFailure();
        }
      }
    }

    // 4. Tier 3: Safe-Mode Output (Zero Network Failure)
    return {
      text: `⚠️ All remote AI channels are currently experiencing peak traffic. Safe-mode offline synthesizer engaged.`,
      tierUsed: 'TIER3_SAFE_MODE',
      provider: 'safe-mode-circuit-breaker'
    };
  }

  private async callOpenCode(
    modelName: string,
    systemPrompt: string,
    userMessage: string,
    apiKey: string
  ): Promise<string | null> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

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

    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  }

  private async callGeminiDirect(
    modelName: string,
    systemPrompt: string,
    userMessage: string,
    apiKey: string
  ): Promise<string | null> {
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

    if (!response.ok) return null;
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }
}
