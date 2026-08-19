import { AgentRegistry } from './registry';
import { SessionMemoryManager } from './memory';
import { MultiTierModelGateway, ChatMessage } from './gateway';
import { AgentContext, Source, WorkerResult } from './types';
import { ExamIntelWorker } from '../workers/examIntelWorker';
import { KnowledgeRAGWorker } from '../workers/knowledgeRAGWorker';
import { QuizGeneratorWorker } from '../workers/quizGeneratorWorker';
import { WebResearchWorker } from '../workers/webResearchWorker';

export class MasterSupervisorOrchestrator {
  private static instance: MasterSupervisorOrchestrator;
  private registry: AgentRegistry;
  private memory: SessionMemoryManager;
  private gateway: MultiTierModelGateway;
  private isInitialized = false;

  private constructor() {
    this.registry = AgentRegistry.getInstance();
    this.memory = SessionMemoryManager.getInstance();
    this.gateway = MultiTierModelGateway.getInstance();
    this.initializeRegistry();
  }

  public static getInstance(): MasterSupervisorOrchestrator {
    if (!MasterSupervisorOrchestrator.instance) {
      MasterSupervisorOrchestrator.instance = new MasterSupervisorOrchestrator();
    }
    return MasterSupervisorOrchestrator.instance;
  }

  private initializeRegistry(): void {
    if (this.isInitialized) return;
    this.registry.register(new ExamIntelWorker());
    this.registry.register(new KnowledgeRAGWorker());
    this.registry.register(new QuizGeneratorWorker());
    this.registry.register(new WebResearchWorker());
    this.isInitialized = true;
  }

  /**
   * Main Conversational Master Agent Pipeline:
   * 1. Load multi-turn conversation memory
   * 2. Dynamically execute factual tools when specific data is requested
   * 3. Let Master LLM speak naturally like a human tutor
   * 4. Save turn to memory
   */
  async process(
    userPrompt: string,
    sessionId: string = 'default',
    preferredModel: string = 'deepseek-v4-flash-free'
  ): Promise<{ response: string; sources: Source[] }> {
    const cleanPrompt = userPrompt.trim();

    // 1. Load multi-turn conversation history
    const context = await this.memory.getContext(sessionId, 8);
    const history = context.history || [];

    // 2. Identify if factual tools should be queried
    const { workerResults, sources } = await this.executeToolsIfNeeded(cleanPrompt, context);

    // 3. Build Natural Conversational Messages
    const systemPrompt = this.buildMasterSystemPrompt(workerResults);
    
    const messages: ChatMessage[] = [
      ...history.map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })),
      { role: 'user', content: cleanPrompt }
    ];

    // 4. Generate Master LLM Conversational Response
    const modelResult = await this.gateway.executeChat(messages, systemPrompt, preferredModel);
    let finalResponse = modelResult.text;

    if (!finalResponse) {
      finalResponse = `I received your question about "${cleanPrompt}". What specific details would you like to explore (e.g. key concepts, official dates, formulas, or practice questions)?`;
    }

    // 5. Append Turn to Session Memory
    await this.memory.appendTurn(sessionId, 'user', cleanPrompt);
    await this.memory.appendTurn(sessionId, 'assistant', finalResponse, sources);

    return {
      response: finalResponse,
      sources
    };
  }

  /**
   * Intelligently queries factual tools when specific knowledge or data is needed
   */
  private async executeToolsIfNeeded(
    query: string,
    context: AgentContext
  ): Promise<{ workerResults: WorkerResult[]; sources: Source[] }> {
    const q = query.toLowerCase();
    const workerPromises: Promise<WorkerResult>[] = [];
    const aggregatedSources: Source[] = [];

    // Check if query is asking for exam dates/notifications
    if (/\b(exam|notification|admit card|dates|schedule|when is|cutoff|vacancy|vacancies|eligibility|apply|calendar|sbi|ibps|ssc|rrb|upsc|cgl|chsl|ntpc|po|clerk)\b/i.test(q)) {
      const examWorker = this.registry.getAgent('exam_intel');
      if (examWorker) {
        workerPromises.push(examWorker.execute({
          sessionId: context.sessionId,
          instruction: query,
          inputData: { query },
          context
        }));
      }
    }

    // Check if query is asking for subject concepts, formulas, or derivations
    if (/\b(formula|explain|concept|rule|rules|derive|derivation|theorem|definition|how to solve|difference between|interest|percentage|ratio|algebra|geometry|syllogism|puzzle|blood relation|grammar|idiom|speed|distance|work)\b/i.test(q)) {
      const ragWorker = this.registry.getAgent('knowledge_rag');
      if (ragWorker) {
        workerPromises.push(ragWorker.execute({
          sessionId: context.sessionId,
          instruction: query,
          inputData: { query },
          context
        }));
      }
    }

    // Check if query asks for practice questions / quiz
    if (/\b(quiz|practice|mcq|mcqs|test me|questions|mock)\b/i.test(q)) {
      const quizWorker = this.registry.getAgent('quiz_generator');
      if (quizWorker) {
        workerPromises.push(quizWorker.execute({
          sessionId: context.sessionId,
          instruction: query,
          inputData: { query },
          context
        }));
      }
    }

    // If tools were matched, execute in parallel
    if (workerPromises.length > 0) {
      const settled = await Promise.allSettled(workerPromises);
      const results: WorkerResult[] = [];
      settled.forEach(r => {
        if (r.status === 'fulfilled' && r.value.success) {
          results.push(r.value);
          if (r.value.sources) aggregatedSources.push(...r.value.sources);
        }
      });

      // Deduplicate sources
      const seen = new Set<string>();
      const dedupedSources = aggregatedSources.filter(s => {
        if (seen.has(s.path)) return false;
        seen.add(s.path);
        return true;
      });

      return { workerResults: results, sources: dedupedSources };
    }

    return { workerResults: [], sources: [] };
  }

  /**
   * System Prompt instructing the Master Agent to be a natural, human-like mentor
   */
  private buildMasterSystemPrompt(workerResults: WorkerResult[]): string {
    const verifiedDataBlock = workerResults.length > 0
      ? `\n=== VERIFIED TOOL DATA (Use this for factual accuracy) ===\n${workerResults.map(r => `[Tool: ${r.workerId}]\n${JSON.stringify(r.data, null, 2)}`).join('\n\n')}\n`
      : '';

    return `You are Abhyas AI, an intelligent, empathetic, and knowledgeable study and competitive exam tutor.
CURRENT REAL-WORLD DATE: August 2026

=== YOUR CONVERSATIONAL PHILOSOPHY ===
1. Speak naturally, warmly, and like a real human mentor. Avoid robotic greetings or repeating generic menus over and over.
2. When a student simply mentions a single topic, exam name, or broad subject (e.g. "SBI PO", "Photosynthesis", "Trigonometry", "Syllogism", "SSC CGL"):
   - Give a concise, interesting 2-3 sentence overview of what that topic/exam is.
   - Then warmly ask how they would like to proceed (e.g. Exam dates & notification, Key concepts & formulas, Practice questions, or Study strategy).
3. When a student asks a specific study question:
   - Provide a clear, step-by-step explanation.
   - Use LaTeX for mathematical formulas: \\(...\\) for inline and \\[...\\] for display equations.
   - Use clean Markdown tables when presenting exam dates or comparison charts.
4. For casual conversation, greetings, thanks, or motivation:
   - Reply conversationally and supportively.
5. If verified tool data is provided below, incorporate those exact facts, dates, and links naturally into your reply.${verifiedDataBlock}`;
  }
}
