import { searchKnowledgeBase } from '../knowledgeBase';
import { AgentContext, AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class KnowledgeRAGWorker implements DomainAgentPlugin {
  public readonly key = 'knowledge_rag_worker';
  public readonly name = 'Curriculum & Concept Tutor Specialist';
  public readonly description = 'Retrieves subject theory, math formulas, reasoning patterns, and English grammar rules from 87 curated syllabus chapters.';
  public readonly domainCategory = 'KNOWLEDGE_RAG' as const;

  evaluateSuitability(query: string, context: AgentContext): number {
    const q = query.trim().toLowerCase();

    // Ignore greetings & pleasantries
    if (/^(hi|hello|hey|greetings|namaste|thanks|thank\s*you|ok|okay|bye)\b/i.test(q)) {
      return 0;
    }

    if (q.length <= 3 && !/\d/.test(q)) {
      return 0;
    }

    // High suitability for academic / concept queries
    if (/\b(formula|explain|concept|rule|rules|syllabus|trick|tricks|derive|derivation|theorem|definition|meaning|difference between|how to solve|what is|why|how)\b/i.test(q)) {
      return 95;
    }

    if (/\b(interest|ratio|percentage|algebra|geometry|syllogism|puzzle|blood relation|grammar|idiom|synonym|antonym|profit|loss|speed|distance|pipe|cistern|work|fraction|simplification|series|coding|decoding|history|geography|polity|economy|physics|chemistry|biology)\b/i.test(q)) {
      return 90;
    }

    return 20; // low fallback for longer study queries
  }

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
        matchesFound: formattedDocs.length,
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
