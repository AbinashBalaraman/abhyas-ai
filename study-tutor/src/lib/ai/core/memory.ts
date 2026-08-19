import { getChatHistory, saveChatMessage } from '../../db';
import { AgentContext, OrchestratorState, Source } from './types';

export class SessionMemoryManager {
  private static instance: SessionMemoryManager;
  private memoryCache = new Map<string, {
    preferences: Record<string, any>;
    lastCheckpoint?: OrchestratorState;
    updatedAt: number;
  }>();

  private constructor() {}

  public static getInstance(): SessionMemoryManager {
    if (!SessionMemoryManager.instance) {
      SessionMemoryManager.instance = new SessionMemoryManager();
    }
    return SessionMemoryManager.instance;
  }

  // 1. Short-Term Conversational Memory (Rolling Context Window)
  async getContext(sessionId: string, windowSize: number = 6): Promise<AgentContext> {
    try {
      const fullHistory = await getChatHistory(sessionId);
      const recentHistory = (fullHistory || []).slice(-windowSize).map(m => ({
        role: m.role === 'ai' || m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || ''
      }));

      const cached = this.memoryCache.get(sessionId);

      return {
        sessionId,
        history: recentHistory as Array<{ role: 'user' | 'assistant'; content: string }>,
        userProfile: cached?.preferences || {},
        metadata: {
          totalTurns: fullHistory?.length || 0,
          updatedAt: Date.now()
        }
      };
    } catch (error) {
      return {
        sessionId,
        history: [],
        userProfile: {},
      };
    }
  }

  // 2. Append Turn to Persistent Database & Session
  async appendTurn(
    sessionId: string,
    role: 'user' | 'ai' | 'assistant',
    content: string,
    sources: Source[] = []
  ): Promise<void> {
    try {
      await saveChatMessage(role === 'assistant' ? 'ai' : role, content, sources, sessionId);
    } catch (e: any) {
      console.error('[SessionMemoryManager] Failed to persist message:', e.message);
    }
  }

  // 3. Long-Term Preferences & Learned Entities Store
  setPreference(sessionId: string, key: string, value: any): void {
    const existing = this.memoryCache.get(sessionId) || { preferences: {}, updatedAt: Date.now() };
    existing.preferences[key] = value;
    existing.updatedAt = Date.now();
    this.memoryCache.set(sessionId, existing);
  }

  getPreference<T = any>(sessionId: string, key: string, defaultValue?: T): T | undefined {
    const existing = this.memoryCache.get(sessionId);
    return (existing?.preferences[key] as T) ?? defaultValue;
  }

  // 4. Working Memory State Checkpoints
  saveCheckpoint(sessionId: string, state: OrchestratorState): void {
    const existing = this.memoryCache.get(sessionId) || { preferences: {}, updatedAt: Date.now() };
    existing.lastCheckpoint = state;
    existing.updatedAt = Date.now();
    this.memoryCache.set(sessionId, existing);
  }

  getCheckpoint(sessionId: string): OrchestratorState | undefined {
    return this.memoryCache.get(sessionId)?.lastCheckpoint;
  }
}
