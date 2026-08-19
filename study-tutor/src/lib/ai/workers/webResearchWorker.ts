import { UnifiedSearchAdapter } from '../search/unifiedSearch';
import { AgentContext, AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class WebResearchWorker implements DomainAgentPlugin {
  public readonly key = 'web_research_worker';
  public readonly name = 'Real-Time Web Grounding & Fact Checker';
  public readonly description = 'Searches the live web across Google, Brave, and Keyless sources to verify fresh facts and recent circulars.';
  public readonly domainCategory = 'WEB_RESEARCH' as const;

  evaluateSuitability(query: string, context: AgentContext): number {
    const q = query.toLowerCase();

    if (/\b(current affairs|latest news|today|recent|2026 update|press release|circular|official notice)\b/i.test(q)) {
      return 95;
    }

    return 30; // fallback if other workers aren't confident
  }

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const searchAdapter = UnifiedSearchAdapter.getInstance();
    const searchRes = await searchAdapter.search(instruction, { maxResults: 4 });

    return {
      success: true,
      workerId: this.key,
      data: {
        provider: searchRes.provider,
        summary: searchRes.text,
        searchResults: searchRes.results
      },
      sources: searchRes.results.map(r => ({
        title: r.title,
        subject: `Live Web (${searchRes.provider})`,
        path: r.url
      }))
    };
  }
}
