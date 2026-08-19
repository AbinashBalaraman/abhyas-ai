import { AgentRegistry } from './registry';
import { SessionMemoryManager } from './memory';
import { MultiTierModelGateway } from './gateway';
import { AgentContext, AgentTask, OrchestratorState, Source, WorkerResult } from './types';
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
   * Main Supervisor Pipeline:
   * 1. Load Session Context
   * 2. Planning & Worker Selection
   * 3. Parallel Worker Dispatch (Fan-out / Fan-in)
   * 4. Multi-Agent Synthesis with Cascading Model Gateway
   * 5. State Checkpoint & Memory Append
   */
  async process(
    userPrompt: string,
    sessionId: string = 'default',
    preferredModel: string = 'deepseek-v4-flash-free'
  ): Promise<{ response: string; sources: Source[] }> {
    // 1. Load context from Memory Manager
    const context = await this.memory.getContext(sessionId, 6);

    // 2. Planning: Find best matched worker plugins
    const candidates = this.registry.findBestCandidates(userPrompt, context);

    // Multi-Agent Task Planning
    const selectedWorkers = candidates.slice(0, 2); // Can execute up to 2 workers in parallel
    if (selectedWorkers.length === 0) {
      // Default to KnowledgeRAGWorker
      const defaultWorker = this.registry.getAgent('knowledge_rag_worker');
      if (defaultWorker) selectedWorkers.push({ agent: defaultWorker, score: 50 });
    }

    const tasks: AgentTask[] = selectedWorkers.map(w => ({
      id: crypto.randomUUID(),
      agentKey: w.agent.key,
      instruction: userPrompt,
      inputData: { query: userPrompt },
      status: 'PENDING',
      retryCount: 0
    }));

    let state: OrchestratorState = {
      sessionId,
      userPrompt,
      plan: {
        strategy: `Parallel Multi-Agent Dispatch: [${selectedWorkers.map(s => s.agent.name).join(', ')}]`,
        tasks
      },
      currentStep: 'DISPATCHING',
      executionHistory: [{ step: 'PLANNING', timestamp: Date.now(), payload: tasks }],
      sources: []
    };

    // 3. Parallel Worker Dispatch (Fan-out / Fan-in)
    const workerPromises = tasks.map(async (task): Promise<WorkerResult> => {
      const worker = this.registry.getAgent(task.agentKey);
      if (!worker) {
        return { success: false, workerId: task.agentKey, data: null, sources: [], error: 'Worker not found' };
      }
      return worker.execute({
        sessionId,
        instruction: task.instruction,
        inputData: task.inputData,
        context
      });
    });

    const settledResults = await Promise.allSettled(workerPromises);
    const workerOutputs: WorkerResult[] = [];
    const aggregatedSources: Source[] = [];

    settledResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value.success) {
        workerOutputs.push(r.value);
        if (r.value.sources) {
          aggregatedSources.push(...r.value.sources);
        }
      }
    });

    // Deduplicate sources by path
    const seenPaths = new Set<string>();
    const dedupedSources = aggregatedSources.filter(s => {
      if (seenPaths.has(s.path)) return false;
      seenPaths.add(s.path);
      return true;
    });

    state.sources = dedupedSources;
    state.currentStep = 'SYNTHESIZING';

    // 4. Multi-Agent Final Synthesis
    const systemPrompt = this.buildSynthesisSystemPrompt(context);
    const userPayload = this.buildSynthesisUserPayload(userPrompt, workerOutputs);

    const modelResult = await this.gateway.execute(preferredModel, systemPrompt, userPayload);

    let finalResponse = modelResult.text;

    // Ensure clean Markdown output
    if (!finalResponse || modelResult.tierUsed === 'TIER3_SAFE_MODE') {
      finalResponse = this.generateSafeModeSynthesis(userPrompt, workerOutputs);
    }

    state.finalSynthesis = finalResponse;
    state.currentStep = 'COMPLETE';

    // 5. Save Checkpoint & Update Session Memory
    this.memory.saveCheckpoint(sessionId, state);
    await this.memory.appendTurn(sessionId, 'user', userPrompt);
    await this.memory.appendTurn(sessionId, 'assistant', finalResponse, dedupedSources);

    return {
      response: finalResponse,
      sources: dedupedSources
    };
  }

  private buildSynthesisSystemPrompt(context: AgentContext): string {
    return `You are Abhyas AI, the Master Study & Exam Tutor powered by a Multi-Agent Orchestrator.

CURRENT REAL-WORLD DATE ANCHOR: August 2026

=== YOUR MISSION & INSTRUCTIONS ===
1. You receive verified structured payloads generated by specialized domain sub-agents (Exam Intel, Knowledge RAG, Quiz Examiner, Web Research).
2. Synthesize a clean, professional, student-centric response using structured GitHub Markdown.
3. For Math / Formulas: Use LaTeX delimiters \\(...\\) for inline and \\[...\\] for display equations.
4. For Exam Schedules: Use clean Markdown tables with exact dates and official portal links.
5. For Practice Questions: Provide 4 options, the correct answer, and an elegant step-by-step proof/solution.
6. NEVER contradict the verified data provided in the SUB-AGENT PAYLOAD.
7. Keep responses concise, high-yield, and strictly under 400 words.

=== FEW-SHOT EXEMPLAR ===
User: "when is ibps po exam next"
Sub-Agent Data: IBPS PO Prelims Aug 22 & 23, 2026. Admit card released Aug 14, 2026.
Assistant:
# 🏦 IBPS PO 2026 – Next Upcoming Events

| Event | Date / Details |
|---|---|
| **Prelims Exam** | **August 22 & 23, 2026** (this weekend) |
| Prelims Admit Card | Already Released (August 14, 2026) |
| **Mains Exam** | **October 4, 2026** |
| Official Portal | [ibps.in](https://www.ibps.in/) |

**Preparation Tip:** Speed & accuracy in Quantitative Aptitude and Reasoning will determine your qualifying rank. Good luck! 🎯`;
  }

  private buildSynthesisUserPayload(query: string, results: WorkerResult[]): string {
    return `STUDENT QUERY: "${query}"

=== VERIFIED SUB-AGENT RETRIEVED DATA ===
${results.map(r => `[Worker: ${r.workerId}]\n${JSON.stringify(r.data, null, 2)}`).join('\n\n')}

Please synthesize the final tutor response for the student based strictly on the verified data above.`;
  }

  private generateSafeModeSynthesis(query: string, results: WorkerResult[]): string {
    const examWorker = results.find(r => r.workerId === 'exam_intel_worker');
    if (examWorker?.data?.examTitle) {
      const d = examWorker.data;
      return `# 🏦 ${d.examTitle} Official Schedule

| Event | Official Date / Status |
|---|---|
| Notification | ${d.notification || 'Released'} |
| Admit Card | ${d.admitCard || 'Released'} |
| Prelims Exam | **${d.prelimsDates || 'Scheduled'}** |
| Mains Exam | ${d.mainsDate || 'Upcoming'} |
| Official Portal | [${d.portal}](${d.portal}) |

All candidates should download their call letter directly from the official portal.`;
    }

    const ragWorker = results.find(r => r.workerId === 'knowledge_rag_worker');
    if (ragWorker?.data?.documents?.[0]) {
      const doc = ragWorker.data.documents[0];
      return `### 📚 ${doc.title} (${doc.subject})\n\n${doc.content.substring(0, 1000)}...`;
    }

    return `Here is the verified information for **${query}**.\nPlease check the cited sources below for complete details.`;
  }
}
