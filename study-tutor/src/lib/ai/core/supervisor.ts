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
   * 2. Dynamically execute factual tools when specific data or exam details are requested
   * 3. Let Master LLM speak naturally like an expert human tutor with continuous context
   * 4. Save turn to memory
   */
  async process(
    userPrompt: string,
    sessionId: string = 'default',
    preferredModel: string = 'gemini-flash-lite-latest'
  ): Promise<{ response: string; sources: Source[] }> {
    const cleanPrompt = userPrompt.trim();

    // 1. Load multi-turn conversation history (last 12 turns for continuous context)
    const context = await this.memory.getContext(sessionId, 12);
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
      finalResponse = `Regarding "${cleanPrompt}": Would you like me to walk through the mark allocation, syllabus breakdown, core concepts, or practice questions?`;
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
   * Intelligently queries factual tools when specific knowledge or exam details are needed
   */
  private async executeToolsIfNeeded(
    query: string,
    context: AgentContext
  ): Promise<{ workerResults: WorkerResult[]; sources: Source[] }> {
    const historyText = (context.history || []).map(h => h.content).join(' ').toLowerCase();
    const q = (query + ' ' + historyText).toLowerCase();
    const workerPromises: Promise<WorkerResult>[] = [];
    const aggregatedSources: Source[] = [];

    const isSolvingPrecedingProblem = /\b(this problem|solve this|the above|this question|the answer|solve it|show solution|shortcut formula)\b/i.test(query);

    // 1. Check if query is asking for exam details, mark allocation, dates, pattern, negative marking, eligibility, attempts, optional
    const isExamQuery = /\b(exam|notification|admit card|dates|schedule|when is|cutoff|vacancy|vacancies|eligibility|apply|calendar|sbi|ibps|ssc|rrb|upsc|cgl|chsl|ntpc|po|clerk|ias|marks|mark allocation|marking scheme|negative marking|tier|prelims|mains|sectional|weightage|duration|pattern|syllabus|age limit|attempts|optional|interview|paper)\b/i.test(q);
    
    if (isExamQuery && !isSolvingPrecedingProblem) {
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

    // 2. Check if query is asking for subject concepts, formulas, or derivations (unless referring to solving a preceding problem)
    if (!isSolvingPrecedingProblem && /\b(formula|explain|concept|rule|rules|derive|derivation|theorem|definition|how to solve|difference between|interest|percentage|ratio|algebra|geometry|trigonometry|set theory|venn diagram|syllogism|puzzle|blood relation|grammar|idiom|speed|distance|work|profit|loss|physics|chemistry|biology)\b/i.test(query.toLowerCase())) {
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

    // 3. Check if query asks for practice questions / quiz (unless referring to solving a preceding problem)
    if (!isSolvingPrecedingProblem && /\b(quiz|practice|mcq|mcqs|test me|questions|mock|generate problem|give me a problem)\b/i.test(query.toLowerCase())) {
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
      ? `\n=== VERIFIED FACTUAL EXAM & KNOWLEDGE DATA ===\n${workerResults.map(r => `[Tool: ${r.workerId}]\n${JSON.stringify(r.data, null, 2)}`).join('\n\n')}\n`
      : '';

    return `You are Abhyas AI, an intelligent, empathetic, and highly knowledgeable personal study and competitive exam tutor.
CURRENT REAL-WORLD DATE: August 2026

=== STRICT CONVERSATIONAL GUIDELINES ===
1. Speak naturally, warmly, and like an expert human mentor. Maintain seamless conversational continuity across long multi-turn chats.
2. CONTINUOUS CONTEXT RETENTION:
   - When a student asks a follow-up question (e.g. "What about optional papers?", "How is the interview evaluated?", "What is the age limit and attempts?", "What is the negative marking?"), DO NOT ask "Which exam are you targeting?".
   - If verified factual data for an exam is present in the VERIFIED FACTUAL EXAM & KNOWLEDGE DATA block below, you MUST use that data directly and answer the user's question for that exam immediately.
   - If the student explicitly switches topics (e.g. "Now let's switch to SSC CGL"), immediately switch and answer for the new topic.
3. STEP-BY-STEP PROBLEM SOLVER:
   - When a student asks "Solve this problem step by step", "Show me the shortcut", or "What is the answer?", look at the practice question or math problem stated in the immediately preceding message in the conversation history. Provide the complete step-by-step mathematical derivation and the speed shortcut using LaTeX formatting \\(...\\) and \\[...\\].
4. MARK ALLOCATION & EXAM PATTERNS:
   - Provide structured markdown tables for mark allocation (Questions, Marks, Time, Negative Marking, Qualifying vs Merit status).
5. EXPLORATORY TOPICS:
   - When a student mentions a single topic or broad exam name (e.g. "SBI PO", "Trigonometry", "Photosynthesis"), give a concise 2-3 sentence overview and warmly invite them to choose how they'd like to proceed.
6. Use LaTeX for math: \\(...\\) for inline and \\[...\\] for display formulas.
7. Incorporate verified tool data below whenever provided.${verifiedDataBlock}`;
  }
}
