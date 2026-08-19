import { AgentContext, DomainAgentPlugin } from './types';

export class AgentRegistry {
  private static instance: AgentRegistry;
  private agents = new Map<string, DomainAgentPlugin>();

  private constructor() {}

  public static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  public register(plugin: DomainAgentPlugin): void {
    if (this.agents.has(plugin.key)) {
      console.warn(`[AgentRegistry] Overwriting existing plugin: ${plugin.key}`);
    }
    this.agents.set(plugin.key, plugin);
    console.log(`[AgentRegistry] Registered worker plugin: "${plugin.name}" [key: ${plugin.key}]`);
  }

  public getAgent(key: string): DomainAgentPlugin | undefined {
    return this.agents.get(key);
  }

  public listAgents(): DomainAgentPlugin[] {
    return Array.from(this.agents.values());
  }

  /**
   * Evaluates all registered workers against a user query and returns ranked candidates
   */
  public findBestCandidates(query: string, context: AgentContext): Array<{
    agent: DomainAgentPlugin;
    score: number;
  }> {
    const evaluated = Array.from(this.agents.values()).map(agent => ({
      agent,
      score: agent.evaluateSuitability(query, context)
    }));

    return evaluated
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }
}
