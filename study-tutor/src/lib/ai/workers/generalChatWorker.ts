import { AgentContext, AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class GeneralChatWorker implements DomainAgentPlugin {
  public readonly key = 'general_chat_worker';
  public readonly name = 'Conversational Assistant & Greeter';
  public readonly description = 'Handles greetings, chit-chat, assistant capabilities, and conversational questions without searching textbooks.';
  public readonly domainCategory = 'GENERAL' as const;

  evaluateSuitability(query: string, context: AgentContext): number {
    const q = query.trim().toLowerCase();

    // Pure greetings & pleasantries
    if (/^(hi|hello|hey|heya|hiya|howdy|good\s*(morning|afternoon|evening|day)|greetings|namaste|hola)\b[!?.]*$/i.test(q)) {
      return 100;
    }

    if (/^(thanks|thank\s*you|thx|ok|okay|bye|goodbye|see\s*you|who\s*are\s*you|what\s*can\s*you\s*do|help|help\s*me)\b[!?.]*$/i.test(q)) {
      return 100;
    }

    if (q.length <= 3 && !/\d/.test(q)) {
      return 90;
    }

    return 0;
  }

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction } = params;
    const q = instruction.trim().toLowerCase();

    let reply = `👋 **Hello! I am Abhyas AI**, your intelligent tutor for Indian competitive examinations.

Here is how I can help you:
- 📅 **Exam Updates & Schedules:** Ask about upcoming dates, notifications, and admit cards for **IBPS PO, SBI PO, SSC CGL, RRB NTPC**, and more.
- 📚 **Concept Learning & Formulas:** Ask me to explain concepts, formulas, shortcuts, and grammar rules across Quantitative Aptitude, Reasoning, English, and General Awareness.
- 📝 **Practice & Quizzes:** Ask me *"Quiz me on Simple Interest"* or *"Give me 3 practice questions on Syllogism"*.
- 🔍 **Real-Time Web Search:** Ask about recent circulars or current affairs.

What topic or exam would you like to prepare for today? 🎯`;

    if (/^(thanks|thank\s*you|thx)/i.test(q)) {
      reply = `You're welcome! 😊 Let me know if you need help with any concepts, formulas, or practice questions. Happy studying! 📚🎯`;
    } else if (/^(bye|goodbye|see\s*you)/i.test(q)) {
      reply = `Goodbye and best of luck with your preparation! Remember, consistency is key to cracking competitive exams. Feel free to come back whenever you have doubts! 🚀`;
    }

    return {
      success: true,
      workerId: this.key,
      data: {
        isGreeting: true,
        reply
      },
      sources: [] // ZERO textbook sources cited for casual chat!
    };
  }
}
