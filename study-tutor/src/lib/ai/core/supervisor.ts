import { AgentRegistry } from './registry';
import { SessionMemoryManager } from './memory';
import { MultiTierModelGateway } from './gateway';
import { AgentContext, MasterPlan, OrchestratorState, Source, WorkerResult } from './types';
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
   * Pure Master LLM Supervisor Pipeline:
   * 1. Load Session Context
   * 2. Pure LLM Planning (The Thinker) -> generates MasterPlan JSON dynamically
   * 3. Sub-Agent Execution (The Executor) -> parallel dispatch
   * 4. Multi-Agent Response Synthesis
   * 5. State Checkpoint & Memory Update
   */
  async process(
    userPrompt: string,
    sessionId: string = 'default',
    preferredModel: string = 'deepseek-v4-flash-free'
  ): Promise<{ response: string; sources: Source[] }> {
    const cleanPrompt = userPrompt.trim();

    // 1. Load context from Memory Manager
    const context = await this.memory.getContext(sessionId, 6);

    // 2. Pure LLM Planning Call (The Thinker)
    const plan = await this.generateMasterPlan(cleanPrompt, context, preferredModel);

    let state: OrchestratorState = {
      sessionId,
      userPrompt: cleanPrompt,
      plan,
      currentStep: 'DISPATCHING',
      executionHistory: [{ step: 'PLANNING', timestamp: Date.now(), payload: plan }],
      sources: []
    };

    // 3. Sub-Agent Execution (The Executor)
    const workerOutputs: WorkerResult[] = [];
    const aggregatedSources: Source[] = [];

    if (plan.action !== 'direct_chat' && plan.tasks && plan.tasks.length > 0) {
      const taskPromises = plan.tasks.map(async (task): Promise<WorkerResult> => {
        const worker = this.registry.getAgent(task.subagent);
        if (!worker) {
          return { success: false, workerId: task.subagent, data: null, sources: [], error: 'Sub-agent not found' };
        }
        return worker.execute({
          sessionId,
          instruction: task.instruction || cleanPrompt,
          inputData: { instruction: task.instruction },
          context
        });
      });

      const settled = await Promise.allSettled(taskPromises);
      settled.forEach(r => {
        if (r.status === 'fulfilled' && r.value.success) {
          workerOutputs.push(r.value);
          if (r.value.sources) {
            aggregatedSources.push(...r.value.sources);
          }
        }
      });
    }

    // Deduplicate sources by path
    const seenPaths = new Set<string>();
    const dedupedSources = aggregatedSources.filter(s => {
      if (seenPaths.has(s.path)) return false;
      seenPaths.add(s.path);
      return true;
    });

    state.sources = dedupedSources;
    state.currentStep = 'SYNTHESIZING';

    // 4. Response Synthesis Call (The Synthesizer)
    const systemPrompt = this.buildSynthesisSystemPrompt(context, plan);
    const userPayload = this.buildSynthesisUserPayload(cleanPrompt, plan, workerOutputs);

    const modelResult = await this.gateway.execute(preferredModel, systemPrompt, userPayload);

    let finalResponse = modelResult.text;

    // Fallback if model was unreachable or safe-mode
    if (!finalResponse || modelResult.tierUsed === 'TIER3_SAFE_MODE') {
      finalResponse = this.generateSafeModeSynthesis(cleanPrompt, plan, workerOutputs);
    }

    state.finalSynthesis = finalResponse;
    state.currentStep = 'COMPLETE';

    // 5. Save Checkpoint & Update Session Memory
    this.memory.saveCheckpoint(sessionId, state);
    await this.memory.appendTurn(sessionId, 'user', cleanPrompt);
    await this.memory.appendTurn(sessionId, 'assistant', finalResponse, dedupedSources);

    return {
      response: finalResponse,
      sources: dedupedSources
    };
  }

  /**
   * Step 1: The Thinker (Pure LLM Intent Reasoning & Planning)
   */
  private async generateMasterPlan(
    query: string,
    context: AgentContext,
    preferredModel: string
  ): Promise<MasterPlan> {
    const manifest = this.registry.getAgentManifest();

    const plannerSystemPrompt = `You are the Master Orchestrator for Abhyas AI, an intelligent study & competitive examination platform.
CURRENT REAL-WORLD DATE: August 2026

=== AVAILABLE WORKER SUB-AGENTS ===
${manifest}
- **'direct_chat'**: PURE pleasantries, greetings, thanks, goodbyes, or motivation ONLY.

=== ROUTING RULES ===
1. If the student names or asks about an exam (e.g. "sbi po", "ibps po", "ssc cgl", "rrb ntpc", "bank exam"), choose action: "call_subagent", subagent: "exam_intel" to give them an official schedule & recruitment overview.
2. If the student names or asks about a subject topic or formula (e.g. "simple interest", "syllogism", "noun rules", "percentage"), choose action: "call_subagent", subagent: "knowledge_rag" to retrieve theory & formulas.
3. If the student asks for a quiz, mock test, or practice questions, choose action: "call_subagent", subagent: "quiz_generator".
4. If the student asks a hybrid query (e.g. "explain SI and quiz me"), choose action: "parallel_call" with both sub-agents.
5. ONLY choose action: "direct_chat" if the student is purely greeting ("hi", "hello"), saying thanks ("thank you"), or saying goodbye.

=== JSON OUTPUT SCHEMA ===
{
  "thought": "Brief reasoning explaining student intent",
  "action": "direct_chat" | "call_subagent" | "parallel_call",
  "tasks": [
    {
      "subagent": "exam_intel" | "knowledge_rag" | "quiz_generator" | "web_research",
      "instruction": "Specific target exam or search topic"
    }
  ]
}

Output STRICT JSON only.`;

    const historySnippet = (context.history || []).slice(-4).map(m => `${m.role}: ${m.content}`).join('\n');
    const plannerUserMessage = `${historySnippet ? `[Recent Chat History]:\n${historySnippet}\n\n` : ''}STUDENT CURRENT MESSAGE: "${query}"`;

    try {
      const planResult = await this.gateway.execute(preferredModel, plannerSystemPrompt, plannerUserMessage);
      const cleaned = (planResult.text || '').replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleaned) as MasterPlan;

      if (parsed.action && Array.isArray(parsed.tasks)) {
        return parsed;
      }
    } catch (e: any) {
      console.warn('[MasterSupervisor] LLM planning parser error:', e.message);
    }

    // Default intelligent fallback if network parsing failed
    const qLower = query.toLowerCase();
    if (/\b(sbi|ibps|ssc|rrb|upsc|cgl|po|clerk|ntpc|exam|admit|date|notification)\b/i.test(qLower)) {
      return {
        thought: 'Exam query fallback routing',
        action: 'call_subagent',
        tasks: [{ subagent: 'exam_intel', instruction: query }]
      };
    }

    if (/^(hi|hello|hey|greetings|thanks|thank you|bye)\b/i.test(qLower)) {
      return {
        thought: 'Greeting fallback routing',
        action: 'direct_chat',
        tasks: []
      };
    }

    return {
      thought: 'Concept study fallback routing',
      action: 'call_subagent',
      tasks: [{ subagent: 'knowledge_rag', instruction: query }]
    };
  }

  private buildSynthesisSystemPrompt(context: AgentContext, plan: MasterPlan): string {
    return `You are Abhyas AI, the Master Study & Exam Tutor.
CURRENT REAL-WORLD DATE: August 2026

=== YOUR MISSION & INSTRUCTIONS ===
1. Synthesize a clean, student-centric response based on the Master Plan: "${plan.thought}".
2. If the user is greeting, respond warmly as an encouraging, expert tutor.
3. If the user mentions a specific exam (like SBI PO or SSC CGL), provide the official dates, notification status, vacancies, and exam pattern clearly.
4. For Math / Formulas: Use LaTeX delimiters \\(...\\) for inline and \\[...\\] for display equations.
5. For Exam Schedules: Use clean Markdown tables with exact dates and official portal links.
6. For Practice Questions: Provide 4 options, the correct answer, and an elegant step-by-step solution.
7. Keep responses concise, high-yield, and under 400 words.`;
  }

  private buildSynthesisUserPayload(query: string, plan: MasterPlan, results: WorkerResult[]): string {
    if (plan.action === 'direct_chat' || results.length === 0) {
      return `STUDENT QUERY: "${query}"\n(Plan: Direct conversational assistance)`;
    }

    return `STUDENT QUERY: "${query}"
PLAN: ${plan.thought}

=== RETRIEVED SUB-AGENT DATA ===
${results.map(r => `[Sub-Agent: ${r.workerId}]\n${JSON.stringify(r.data, null, 2)}`).join('\n\n')}

Synthesize the final tutor response for the student based strictly on the verified data above.`;
  }

  private generateSafeModeSynthesis(query: string, plan: MasterPlan, results: WorkerResult[]): string {
    if (plan.action === 'direct_chat') {
      return `👋 **Hello! I am Abhyas AI**, your personal study & exam tutor.\n\nHow can I help your preparation today?\n- 📅 **Upcoming Exam Dates & Notices**\n- 📚 **Concept Learning & Formulas**\n- 📝 **Practice MCQs & Quizzes**\n\nLet me know what topic you would like to work on! 🎯`;
    }

    const examWorker = results.find(r => r.workerId === 'exam_intel');
    if (examWorker?.data?.examTitle) {
      const d = examWorker.data;
      return `# 🏦 ${d.examTitle} Schedule\n\n| Event | Date / Details |\n|---|---|\n| Notification | ${d.notification || 'Released'} |\n| Admit Card | ${d.admitCard || 'Released'} |\n| Prelims Exam | **${d.prelimsDates || 'Scheduled'}** |\n| Mains Exam | ${d.mainsDate || 'Upcoming'} |\n| Official Portal | [${d.portal}](${d.portal}) |`;
    }

    const ragWorker = results.find(r => r.workerId === 'knowledge_rag');
    if (ragWorker?.data?.documents?.[0]) {
      const doc = ragWorker.data.documents[0];
      return `### 📚 ${doc.title} (${doc.subject})\n\n${doc.content.substring(0, 1000)}...`;
    }

    return `Here is the verified information for **${query}**.\nPlease refer to the sources below.`;
  }
}
