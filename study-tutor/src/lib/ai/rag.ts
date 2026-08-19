import { MasterSupervisorOrchestrator } from './core/supervisor';
import { Source } from './core/types';

export { MasterSupervisorOrchestrator } from './core/supervisor';
export { AgentRegistry } from './core/registry';
export { SessionMemoryManager } from './core/memory';
export { UnifiedSearchAdapter } from './search/unifiedSearch';

/**
 * Top-Level RAG Facade: Delegates seamlessly to the Master Supervisor Multi-Agent Orchestrator
 */
export async function getAnswer(
  question: string,
  model: string = 'deepseek-v4-flash-free',
  chatHistory: Array<{ role: string; content: string }> = [],
  sessionId: string = 'default'
): Promise<{
  response: string;
  sources: Source[];
}> {
  const supervisor = MasterSupervisorOrchestrator.getInstance();
  return supervisor.process(question, sessionId, model);
}