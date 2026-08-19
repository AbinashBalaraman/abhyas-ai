import { searchKnowledgeBase } from '../knowledgeBase';
import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class KnowledgeRAGWorker implements DomainAgentPlugin {
  public readonly key = 'knowledge_rag';
  public readonly name = 'Curriculum & Concept Tutor Specialist';
  public readonly description = 'Retrieves subject theory, math formulas, derivations, reasoning patterns, and English grammar rules from 87 curated syllabus chapters.';
  public readonly domainCategory = 'KNOWLEDGE_RAG';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const docs = await searchKnowledgeBase(instruction, 3);

    const formattedDocs = docs.map(d => ({
      title: d.title,
      subject: d.subject,
      path: d.path,
      content: d.content.substring(0, 1500)
    }));

    return {
      success: true,
      workerId: this.key,
      data: {
        query: instruction,
        documents: formattedDocs
      },
      sources: formattedDocs.map(d => ({
        title: d.title,
        subject: d.subject,
        path: d.path
      }))
    };
  }
}
