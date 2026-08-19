import { searchKnowledgeBase } from '../knowledgeBase';
import { AgentContext, AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class QuizGeneratorWorker implements DomainAgentPlugin {
  public readonly key = 'quiz_generator_worker';
  public readonly name = 'Interactive Practice & Quiz Examiner';
  public readonly description = 'Generates competitive exam MCQs, timed practice sets, and detailed step-by-step answer keys.';
  public readonly domainCategory = 'QUIZ_EXAMINER' as const;

  evaluateSuitability(query: string, context: AgentContext): number {
    const q = query.toLowerCase();

    if (/\b(quiz|mock|mcq|practice question|practice questions|test me|sample questions|solve question|test my knowledge)\b/i.test(q)) {
      return 100;
    }

    return 0;
  }

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const docs = await searchKnowledgeBase(instruction, 2);

    return {
      success: true,
      workerId: this.key,
      data: {
        mode: 'PRACTICE_QUIZ',
        referenceTheory: docs.map(d => d.content.substring(0, 1000)).join('\n\n')
      },
      sources: docs.map(d => ({
        title: d.title,
        subject: d.subject,
        path: d.path
      }))
    };
  }
}
