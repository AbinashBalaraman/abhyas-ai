import { ModelCircuitBreaker } from './circuit-breaker';

export type ModelTier = 'TIER1_PARALLEL_LLM' | 'TIER2_FALLBACK';

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
   * Execute multi-turn conversation with high-performance LLM racing across OpenCode and Gemini
   */
  async executeChat(
    messages: ChatMessage[],
    systemPrompt: string,
    preferredModel: string = 'nemotron-3.5-lightning-free'
  ): Promise<{ text: string; tierUsed: ModelTier; provider: string }> {
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const openCodeKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENAI_API_KEY || '';

    const candidatePromises: Promise<{ text: string; provider: string }>[] = [];

    // 1. Parallel candidate: OpenCode Nemotron 3.5 Lightning (Ultra-fast)
    if (openCodeKey) {
      candidatePromises.push(
        this.callOpenCode('nemotron-3.5-lightning-free', systemPrompt, messages, openCodeKey)
          .then(text => ({ text, provider: 'nemotron-3.5-lightning-free' }))
      );
      candidatePromises.push(
        this.callOpenCode('deepseek-v4-flash-free', systemPrompt, messages, openCodeKey)
          .then(text => ({ text, provider: 'deepseek-v4-flash-free' }))
      );
    }

    // 2. Parallel candidate: Gemini 3.6 Flash
    if (geminiKey) {
      candidatePromises.push(
        this.callGeminiDirect('gemini-3.6-flash', systemPrompt, messages, geminiKey)
          .then(text => ({ text, provider: 'gemini-3.6-flash' }))
      );
    }

    if (candidatePromises.length > 0) {
      try {
        const winner = await Promise.any(candidatePromises);
        if (winner && winner.text) {
          return {
            text: winner.text,
            tierUsed: 'TIER1_PARALLEL_LLM',
            provider: winner.provider
          };
        }
      } catch (err) {
        console.warn('All parallel LLM providers failed or timed out:', err);
      }
    }

    // Fallback if all APIs were down or rate limited
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    return {
      text: `Regarding "${lastUserMsg}": Would you like to explore the fundamental concepts, key formulas, official exam dates, or practice questions?`,
      tierUsed: 'TIER2_FALLBACK',
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

  private async callOpenCode(
    modelName: string,
    systemPrompt: string,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<string> {
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

    if (!response.ok) {
      throw new Error(`OpenCode ${modelName} returned status ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error(`OpenCode ${modelName} returned empty text`);

    // Strip thinking process tags if emitted
    content = content.replace(/^Here's a thinking process:[\s\S]*?(?=\n\n|\n[A-Z#*])/i, '').trim();
    return content;
  }

  private async callGeminiDirect(
    modelName: string,
    systemPrompt: string,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<string> {
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
        signal: AbortSignal.timeout(12000),
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

    if (!response.ok) {
      throw new Error(`Gemini ${modelName} returned status ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error(`Gemini ${modelName} returned empty text`);
    return content;
  }
}
