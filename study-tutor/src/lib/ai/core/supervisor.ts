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
- **'direct_chat'**: Conversational responses, greetings, pleasantries, motivation, study tips, or clarifying questions without querying databases.

=== YOUR OBJECTIVE ===
Inspect the student's message and conversation history. Reason through the true intent, and output a STRICT JSON planning object.

=== JSON OUTPUT SCHEMA ===
{
  "thought": "Brief 1-sentence reasoning explaining what the user wants",
  "action": "direct_chat" | "call_subagent" | "parallel_call",
  "tasks": [
    {
      "subagent": "exam_intel" | "knowledge_rag" | "quiz_generator" | "web_research",
      "instruction": "Specific search query or task instruction for the worker"
    }
  ]
}

=== EXAMPLES OF TRUE REASONING ===
- Student: "hi" or "hello" or "good morning"
  {"thought": "Student is greeting me. No database lookup needed.", "action": "direct_chat", "tasks": []}

- Student: "when is ibps po exam next"
  {"thought": "Student wants upcoming dates and admit card info for IBPS PO.", "action": "call_subagent", "tasks": [{"subagent": "exam_intel", "instruction": "ibps po 2026 exam dates and admit card"}]}

- Student: "explain compound interest formula and derive it"
  {"thought": "Student wants conceptual explanation and formula derivation for Compound Interest.", "action": "call_subagent", "tasks": [{"subagent": "knowledge_rag", "instruction": "Compound interest formula and derivation"}]}

- Student: "explain percentages and give me 3 practice MCQs"
  {"thought": "Student has a hybrid request: concept explanation and practice MCQs.", "action": "parallel_call", "tasks": [{"subagent": "knowledge_rag", "instruction": "Percentage concept and formulas"}, {"subagent": "quiz_generator", "instruction": "3 percentage practice MCQs"}]}

- Student: "thank you so much!"
  {"thought": "Student is expressing gratitude.", "action": "direct_chat", "tasks": []}

Output ONLY valid JSON. No conversational text in this step.`;

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
      console.warn('[MasterSupervisor] LLM planning parser fallback:', e.message);
    }

    // Default intelligent fallback if JSON parsing failed
    return {
      thought: 'Autonomous fallback routing',
      action: query.length < 15 ? 'direct_chat' : 'call_subagent',
      tasks: query.length < 15 ? [] : [{ subagent: 'knowledge_rag', instruction: query }]
    };
  }

  private buildSynthesisSystemPrompt(context: AgentContext, plan: MasterPlan): string {
    return `You are Abhyas AI, the Master Study & Exam Tutor.
CURRENT REAL-WORLD DATE: August 2026

=== YOUR MISSION & INSTRUCTIONS ===
1. Synthesize a clean, student-centric response based on the Master Plan: "${plan.thought}".
2. If the user is greeting or having casual chat, respond warmly as an encouraging, expert tutor.
3. For Math / Formulas: Use LaTeX delimiters \\(...\\) for inline and \\[...\\] for display equations.
4. For Exam Schedules: Use clean Markdown tables with exact dates and official portal links.
5. For Practice Questions: Provide 4 options, the correct answer, and an elegant step-by-step solution.
6. NEVER contradict the verified data provided by sub-agents.
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
      return `# 🏦 ${d.examTitle} Schedule\n\n| Event | Date / Details |\n|---|---|\n| Prelims Exam | **${d.prelimsDates || 'Scheduled'}** |\n| Admit Card | ${d.admitCard || 'Released'} |\n| Mains Exam | ${d.mainsDate || 'Upcoming'} |\n| Official Portal | [${d.portal}](${d.portal}) |`;
    }

    const ragWorker = results.find(r => r.workerId === 'knowledge_rag');
    if (ragWorker?.data?.documents?.[0]) {
      const doc = ragWorker.data.documents[0];
      return `### 📚 ${doc.title} (${doc.subject})\n\n${doc.content.substring(0, 1000)}...`;
    }

    return `Here is the verified information for **${query}**.\nPlease refer to the sources below.`;
  }
}
