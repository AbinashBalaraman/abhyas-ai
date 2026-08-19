import { DomainAgentPlugin } from './types';

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
   * Generates a natural-language description manifest of all registered sub-agents for the Master LLM
   */
  public getAgentManifest(): string {
    return Array.from(this.agents.values())
      .map(a => `- **'${a.key}'**: ${a.name} — ${a.description}`)
      .join('\n');
  }
}
