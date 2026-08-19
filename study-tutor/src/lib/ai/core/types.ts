import { z } from 'zod';

export interface Source {
  title: string;
  subject: string;
  path: string;
}

export interface NormalizedSearchResult {
  title: string;
  url: string;
  snippet: string;
  content?: string;
  score?: number;
  publishedDate?: string;
  provider: string;
}

export interface AgentContext {
  sessionId: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  userProfile?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface WorkerResult<T = any> {
  success: boolean;
  workerId: string;
  data: T;
  sources: Source[];
  error?: string;
}

export interface AgentExecutionParams<TInput = Record<string, unknown>> {
  sessionId: string;
  instruction: string;
  inputData: TInput;
  context: AgentContext;
  signal?: AbortSignal;
}

export interface DomainAgentPlugin<TInput = any, TOutput = any> {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly domainCategory: 'EXAM_INTEL' | 'KNOWLEDGE_RAG' | 'QUIZ_EXAMINER' | 'WEB_RESEARCH' | 'GENERAL';
  
  // Dynamic Suitability Evaluator (Scores query from 0 to 100)
  evaluateSuitability: (query: string, context: AgentContext) => number;
  
  // Isolated execution
  execute: (params: AgentExecutionParams<TInput>) => Promise<WorkerResult<TOutput>>;
}

export interface AgentTask {
  id: string;
  agentKey: string;
  instruction: string;
  inputData: Record<string, any>;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  result?: any;
  error?: string;
  retryCount: number;
}

export interface OrchestratorState {
  sessionId: string;
  userPrompt: string;
  plan: {
    strategy: string;
    tasks: AgentTask[];
  };
  currentStep: 'PLANNING' | 'DISPATCHING' | 'EVALUATING' | 'SYNTHESIZING' | 'COMPLETE' | 'ERROR';
  executionHistory: Array<{
    step: string;
    timestamp: number;
    payload: any;
  }>;
  finalSynthesis?: string;
  sources: Source[];
  error?: string;
}
