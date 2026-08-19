import { searchKnowledgeBase } from '../knowledgeBase';
import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class QuizGeneratorWorker implements DomainAgentPlugin {
  public readonly key = 'quiz_generator';
  public readonly name = 'Interactive Practice & Quiz Examiner';
  public readonly description = 'Generates competitive exam MCQs with 4 options, timed practice sets, and detailed step-by-step answer keys.';
  public readonly domainCategory = 'QUIZ_EXAMINER';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const docs = await searchKnowledgeBase(instruction, 2);

    return {
      success: true,
      workerId: this.key,
      data: {
        topic: instruction,
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
