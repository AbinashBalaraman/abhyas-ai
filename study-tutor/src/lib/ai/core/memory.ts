import { getChatHistory, saveChatMessage } from '../../db';
import { AgentContext, OrchestratorState, Source } from './types';

export interface MemoryTurn {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

export class SessionMemoryManager {
  private static instance: SessionMemoryManager;
  
  // In-memory fast store for multi-turn serverless & local continuity
  private sessionTurns = new Map<string, MemoryTurn[]>();

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
  async getContext(
    sessionId: string,
    windowSize: number = 12,
    clientProvidedHistory: Array<{ role: string; content: string }> = []
  ): Promise<AgentContext> {
    try {
      let turns: MemoryTurn[] = this.sessionTurns.get(sessionId) || [];

      // If in-memory is empty, attempt to seed from client payload or persistent database
      if (turns.length === 0) {
        if (clientProvidedHistory && clientProvidedHistory.length > 0) {
          turns = clientProvidedHistory.map(m => ({
            role: m.role === 'ai' || m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content || ''
          }));
          this.sessionTurns.set(sessionId, turns);
        } else {
          const dbHistory = await getChatHistory(sessionId);
          if (dbHistory && dbHistory.length > 0) {
            turns = dbHistory.map(m => ({
              role: m.role === 'ai' || m.role === 'assistant' ? 'assistant' : 'user',
              content: m.content || ''
            }));
            this.sessionTurns.set(sessionId, turns);
          }
        }
      } else if (clientProvidedHistory && clientProvidedHistory.length > turns.length) {
        // Client has more recent turns (e.g. from local storage)
        turns = clientProvidedHistory.map(m => ({
          role: m.role === 'ai' || m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content || ''
        }));
        this.sessionTurns.set(sessionId, turns);
      }

      const recentHistory = turns.slice(-windowSize);
      const cached = this.memoryCache.get(sessionId);

      return {
        sessionId,
        history: recentHistory,
        userProfile: cached?.preferences || {},
        metadata: {
          totalTurns: turns.length,
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

  // 2. Append Turn to In-Memory Store and Persistent Database
  async appendTurn(
    sessionId: string,
    role: 'user' | 'ai' | 'assistant',
    content: string,
    sources: Source[] = []
  ): Promise<void> {
    const normRole: 'user' | 'assistant' = role === 'user' ? 'user' : 'assistant';
    
    // 1. Instant in-memory append (guarantees fast context retention)
    const existing = this.sessionTurns.get(sessionId) || [];
    existing.push({ role: normRole, content, sources });
    if (existing.length > 30) existing.shift(); // Keep latest 30 turns
    this.sessionTurns.set(sessionId, existing);

    // 2. Async persistent database write
    try {
      await saveChatMessage(normRole === 'assistant' ? 'ai' : 'user', content, sources, sessionId);
    } catch (e: any) {
      // Database optional
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
