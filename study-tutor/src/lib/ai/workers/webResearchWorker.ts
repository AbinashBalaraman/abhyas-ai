import { UnifiedSearchAdapter } from '../search/unifiedSearch';
import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class WebResearchWorker implements DomainAgentPlugin {
  public readonly key = 'web_research';
  public readonly name = 'Real-Time Web Grounding & Fact Checker';
  public readonly description = 'Searches the live web across Google, Brave, and Keyless sources for real-time news, fresh circulars, or current affairs.';
  public readonly domainCategory = 'WEB_RESEARCH';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const searchAdapter = UnifiedSearchAdapter.getInstance();
    const searchRes = await searchAdapter.search(instruction, { maxResults: 4 });

    return {
      success: true,
      workerId: this.key,
      data: {
        query: instruction,
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
