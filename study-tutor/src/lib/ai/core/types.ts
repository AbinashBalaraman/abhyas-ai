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

export interface AgentExecutionParams<TInput = Record<string, any>> {
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
  readonly domainCategory: string;
  
  // Pure execution logic (decided by the Master LLM)
  execute: (params: AgentExecutionParams<TInput>) => Promise<WorkerResult<TOutput>>;
}

export interface MasterPlanTask {
  subagent: string;
  instruction: string;
}

export interface MasterPlan {
  thought: string;
  action: 'direct_chat' | 'call_subagent' | 'parallel_call';
  tasks: MasterPlanTask[];
}

export interface OrchestratorState {
  sessionId: string;
  userPrompt: string;
  plan: MasterPlan;
  currentStep: 'PLANNING' | 'DISPATCHING' | 'SYNTHESIZING' | 'COMPLETE' | 'ERROR';
  executionHistory: Array<{
    step: string;
    timestamp: number;
    payload: any;
  }>;
  finalSynthesis?: string;
  sources: Source[];
  error?: string;
}
