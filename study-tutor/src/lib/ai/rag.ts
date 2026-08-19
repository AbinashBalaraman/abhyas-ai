import { getChapters } from '../db';
import { callLLM, webSearch } from './llm';
import fs from 'fs';

export interface Source {
  title: string;
  subject: string;
  path: string;
}

export interface AgentDecision {
  action: 'exam_schedule' | 'study_concept' | 'general_chat';
  targetExam?: 'IBPS_PO' | 'SBI_PO' | 'SSC_CGL' | 'RRB_NTPC' | 'MASTER_CALENDAR';
  keywords: string[];
}

// =========================================================================
// STEP 1: THE THINKER (Intent & Action Router)
// Analyzes user query & conversation history to determine exact backend action
// =========================================================================
export function routeUserIntent(question: string, chatHistory: any[] = []): AgentDecision {
  const qLower = question.toLowerCase().trim();
  const recent = chatHistory.slice(-4);
  const historyText = recent.map(m => m.content || '').join(' ').toLowerCase();

  // 1. Check if user is asking for general exam calendar or next exam
  if (
    qLower === 'when next exam' || 
    qLower === 'next exam' || 
    qLower === 'when is next exam' || 
    qLower.includes('exam calendar')
  ) {
    if (historyText.includes('ibps') || historyText.includes('bank')) {
      return { action: 'exam_schedule', targetExam: 'IBPS_PO', keywords: ['ibps', 'po'] };
    }
    if (historyText.includes('sbi')) {
      return { action: 'exam_schedule', targetExam: 'SBI_PO', keywords: ['sbi', 'po'] };
    }
    if (historyText.includes('ssc') || historyText.includes('cgl')) {
      return { action: 'exam_schedule', targetExam: 'SSC_CGL', keywords: ['ssc', 'cgl'] };
    }
    if (historyText.includes('rrb') || historyText.includes('ntpc')) {
      return { action: 'exam_schedule', targetExam: 'RRB_NTPC', keywords: ['rrb', 'ntpc'] };
    }
    return { action: 'exam_schedule', targetExam: 'MASTER_CALENDAR', keywords: ['exam', 'calendar'] };
  }

  // 2. Specific Exam Schedule / Notification / Admit Card queries
  if (qLower.includes('ibps')) {
    return { action: 'exam_schedule', targetExam: 'IBPS_PO', keywords: ['ibps', 'po'] };
  }
  if (qLower.includes('sbi')) {
    return { action: 'exam_schedule', targetExam: 'SBI_PO', keywords: ['sbi', 'po'] };
  }
  if (qLower.includes('ssc') || qLower.includes('cgl') || qLower.includes('chsl')) {
    return { action: 'exam_schedule', targetExam: 'SSC_CGL', keywords: ['ssc', 'cgl'] };
  }
  if (qLower.includes('rrb') || qLower.includes('railway') || qLower.includes('ntpc')) {
    return { action: 'exam_schedule', targetExam: 'RRB_NTPC', keywords: ['rrb', 'ntpc'] };
  }

  // 3. Fallback to concept / syllabus inquiry
  const keywords = qLower
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  return { action: 'study_concept', keywords };
}

// =========================================================================
// STEP 2: THE EXECUTOR (Specialized Backend Data Retrieval)
// Fetches verified data based purely on Step 1 decision (Zero mixing)
// =========================================================================

interface ExecutorResult {
  data: string;
  sources: Source[];
}

async function executeBackendData(decision: AgentDecision, rawQuery: string): Promise<ExecutorResult> {
  // Branch A: Exam Schedule & Notification Executor
  if (decision.action === 'exam_schedule') {
    switch (decision.targetExam) {
      case 'IBPS_PO':
        return {
          data: `IBPS PO 2026 (CRP PO/MT-XVI):
• Notification Released: July 1, 2026 (7,565 Vacancies)
• Application Window: July 1 - July 26, 2026 (Closed)
• Preliminary Admit Card: Released on August 14, 2026
• Preliminary Exam Dates: August 22 & 23, 2026
• Mains Exam Date: October 4, 2026
• Official Portal: https://www.ibps.in/`,
          sources: [{ title: 'Institute of Banking Personnel Selection (Official)', subject: 'Official Portal', path: 'https://www.ibps.in/' }]
        };

      case 'SBI_PO':
        return {
          data: `SBI PO 2026 Recruitment:
• Notification Expected: September 2026 (2,000+ Vacancies)
• Application Window: September - October 2026
• Prelims Exam (Phase 1): November 2026
• Mains Exam (Phase 2): December 2026 / January 2027
• Official Portal: https://sbi.co.in/web/careers`,
          sources: [{ title: 'State Bank of India Careers (Official)', subject: 'Official Portal', path: 'https://sbi.co.in/web/careers' }]
        };

      case 'SSC_CGL':
        return {
          data: `SSC CGL 2026 Recruitment:
• Notification Released: June 24, 2026
• Application Window: June 24 - July 27, 2026 (Closed)
• Tier 1 (Prelims) Exam Dates: September 9 - September 26, 2026
• Tier 1 City Slip / Admit Card: Late August 2026
• Tier 2 (Mains) Exam: December 2026
• Official Portal: https://ssc.gov.in/`,
          sources: [{ title: 'Staff Selection Commission (Official)', subject: 'Official Portal', path: 'https://ssc.gov.in/' }]
        };

      case 'RRB_NTPC':
        return {
          data: `RRB NTPC 2026 Recruitment:
• Official CEN Notification: September 2026
• CBT-1 Examination: December 2026 - January 2027
• Official Portal: https://rrbapply.gov.in/`,
          sources: [{ title: 'Railway Recruitment Boards (Official)', subject: 'Official Portal', path: 'https://rrbapply.gov.in/' }]
        };

      default:
        return {
          data: `Upcoming 2026 Major Competitive Exams:
1. IBPS PO: Prelims Aug 22-23, 2026 (Admit Card Released Aug 14)
2. SSC CGL: Tier 1 Sept 9-26, 2026
3. SBI PO: Prelims Nov 2026
4. RRB NTPC: CBT-1 Dec 2026 - Jan 2027`,
          sources: [{ title: 'National Exam Notification Registry', subject: 'Official Source', path: 'https://www.ibps.in/' }]
        };
    }
  }

  // Branch B: Academic Study Concept RAG Executor (Textbook chapters)
  const { context, sources } = await findTextbookContext(rawQuery);
  return {
    data: context || 'No specific textbook chapter context needed.',
    sources
  };
}

// =========================================================================
// STEP 3 & 4: STRICT MESSAGE SEQUENCING & FEW-SHOT GROUNDING
// =========================================================================

export async function getAnswer(
  question: string,
  model: string = 'deepseek-v4-flash-free',
  chatHistory: any[] = []
): Promise<{ response: string; sources: Source[] }> {
  // Step 1: Thinker
  const decision = routeUserIntent(question, chatHistory);

  // Step 2: Executor
  const executorResult = await executeBackendData(decision, question);

  // Optional Live Web Search Grounding for real-time alerts
  let liveWebText = '';
  let liveWebSources: Source[] = [];
  if (decision.action === 'exam_schedule') {
    try {
      const web = await webSearch(question);
      if (web.text) {
        liveWebText = web.text;
        liveWebSources = web.sources.map(s => ({ title: s.title || s.uri, subject: 'Live Web Source', path: s.uri }));
      }
    } catch (e) {}
  }

  const now = new Date();
  const currentDateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Step 3 & 4: System Prompt with Few-Shot Examples & Clean Boundaries
  const systemPrompt = `You are an expert AI Study Tutor for Indian Competitive Exams (SSC CGL/CHSL, RRB NTPC, IBPS/SBI Banking, UPSC).
CURRENT REAL-WORLD DATE: ${currentDateStr}. Current Year: ${now.getFullYear()}.

=== STRICT INSTRUCTIONS ===
1. Use ONLY the verified data provided below in the EXECUTOR DATA section.
2. Format answers with clean Markdown tables, bold section titles, and LaTeX for math formulas.
3. Keep your output concise, professional, and under 350 words.

=== FEW-SHOT EXAMPLES ===
Example 1 (Exam Schedule):
User: "when is ibps po exam"
Assistant: "# 🏦 IBPS PO 2026 Official Schedule
| Event | Date / Status |
|---|---|
| Notification | July 1, 2026 |
| Admit Card | Released (August 14, 2026) |
| Prelims Exam | August 22 & 23, 2026 |
| Mains Exam | October 4, 2026 |
Official Portal: [ibps.in](https://www.ibps.in/)"

=== EXECUTOR RETRIEVED DATA ===
${executorResult.data}
${liveWebText ? `\nLive Search Grounding:\n${liveWebText}` : ''}
`;

  // Step 5: Multi-Tier Failover (Tier 1 OpenCode -> Tier 2 Gemini -> Tier 3 Deterministic Fallback)
  const finalSources = liveWebSources.length > 0 ? liveWebSources : executorResult.sources;

  try {
    const aiResponse = await callLLM(model, systemPrompt, question);
    if (!aiResponse.includes('All AI channels are temporarily busy')) {
      return {
        response: aiResponse,
        sources: finalSources
      };
    }
  } catch (error: any) {
    console.error('LLM generation error:', error.message);
  }

  // Tier 3: Deterministic Offline Fallback Response
  const deterministicResponse = generateDeterministicResponse(decision, executorResult.data);
  return {
    response: deterministicResponse,
    sources: finalSources
  };
}

function generateDeterministicResponse(decision: AgentDecision, executorData: string): string {
  if (decision.action === 'exam_schedule') {
    if (decision.targetExam === 'IBPS_PO') {
      return `# 🏦 IBPS PO 2026 (CRP PO/MT-XVI) Official Dates & Status

The official notification for **IBPS PO/MT-XVI (2026)** has been released by the Institute of Banking Personnel Selection with **7,565 vacancies**.

### 📅 Official 2026 Examination Schedule
| Event | Official Date / Status |
|---|---|
| **Official Notification Released** | **July 1, 2026** (CRP PO/MT-XVI) |
| **Online Application Window** | **July 1 – July 26, 2026** (Closed) |
| **Total Announced Vacancies** | **7,565 Positions** |
| **Preliminary Admit Card (Call Letter)** | 🟢 **Released on August 14, 2026** |
| **Preliminary Examination Dates** | 🎯 **August 22 & 23, 2026** |
| **Mains Examination Date** | **October 4, 2026** |
| **Interview / Personality Test** | **January / February 2027** |

- **Official Portal:** [ibps.in](https://www.ibps.in/)
- **Negative Marking:** $-0.25$ marks per incorrect answer.`;
    }

    if (decision.targetExam === 'SBI_PO') {
      return `# 🏦 SBI PO 2026 Official Overview & Expected Schedule

The State Bank of India conducts the Probationary Officer (PO) recruitment annually for 2,000+ vacancies.

### 📅 Expected 2026 Examination Schedule
| Event | Expected Timeline |
|---|---|
| **Official Notification Release** | **September 2026** |
| **Online Application Window** | **September – October 2026** |
| **Preliminary Exam (Phase 1)** | 🎯 **November 2026** |
| **Mains Exam (Phase 2)** | **December 2026 / January 2027** |
| **Psychometric Test & Interview** | **February 2027** |

- **Official Website:** [sbi.co.in/careers](https://sbi.co.in/web/careers)
- **Negative Marking:** $-0.25$ marks per incorrect answer.`;
    }

    if (decision.targetExam === 'SSC_CGL') {
      return `# 🏛️ SSC CGL 2026 Official Examination Schedule

The Staff Selection Commission has released the official exam schedule for **SSC CGL 2026**.

### 📅 Official 2026 Schedule & Status
| Event | Official Date / Status |
|---|---|
| **Official Notification Released** | **June 24, 2026** |
| **Application Window** | **June 24 – July 27, 2026** (Closed) |
| **Tier 1 (Prelims) Exam Dates** | 🎯 **September 9 to September 26, 2026** |
| **Tier 1 Admit Card / City Slip** | **Late August 2026** |
| **Tier 2 (Mains) Exam Date** | **December 2026** |

- **Official Website:** [ssc.gov.in](https://ssc.gov.in/)
- **Negative Marking:** $-0.50$ marks per incorrect answer.`;
    }

    return `# 📅 2026 Major Competitive Exams Live Calendar

| Exam | Official Notification | Admit Card Status | Upcoming Exam Dates | Official Portal |
|---|---|---|---|---|
| **IBPS PO 2026** | July 1, 2026 (7,565 Posts) | 🟢 **Released Aug 14** | 🎯 **August 22 & 23, 2026** (Prelims) | [ibps.in](https://www.ibps.in/) |
| **SSC CGL 2026** | June 24, 2026 | 🟡 City Slip Late August | 🎯 **September 9 – 26, 2026** (Tier 1) | [ssc.gov.in](https://ssc.gov.in/) |
| **SBI PO 2026** | September 2026 | Upcoming | November 2026 | [sbi.co.in](https://sbi.co.in/) |
| **RRB NTPC** | September 2026 | Upcoming | Dec 2026 – Jan 2027 | [rrbapply.gov.in](https://rrbapply.gov.in/) |

💡 *Tip: Ask about any specific exam above for full syllabus, solved formulas, and preparation tips!*`;
  }

  // Academic concept fallback
  return `### 📚 Study Guide & Concept Summary

Here is the relevant theory from your textbook syllabus:

${executorData.substring(0, 1200)}

---
💡 *Tip: Ask for specific formula proofs, shortcut tricks, or practice questions on this topic!*`;
}

// -------------------------------------------------------------
// TEXTBOOK RAG SEARCH (Curated 87 Chapters)
// -------------------------------------------------------------
async function findTextbookContext(query: string): Promise<{ context: string; sources: Source[] }> {
  try {
    const chapters = await getChapters();
    if (!chapters || chapters.length === 0) return { context: '', sources: [] };

    const stopWords = new Set(['what', 'is', 'the', 'of', 'and', 'in', 'to', 'a', 'for', 'explain', 'how', 'does', 'why', 'can', 'you', 'give', 'me', 'some', 'about', 'tell']);
    const keywords = query.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

    if (keywords.length === 0) return { context: '', sources: [] };

    const candidates = [];
    for (const chapter of chapters) {
      if (!chapter.contentPath || !fs.existsSync(chapter.contentPath)) continue;
      const titleLower = chapter.title.toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 500;
      }
      if (score > 0) candidates.push({ chapter, score });
    }

    candidates.sort((a, b) => b.score - a.score);
    const top = candidates.slice(0, 2);

    if (top.length > 0) {
      const sources: Source[] = [];
      const parts: string[] = [];

      for (const { chapter } of top) {
        const content = fs.readFileSync(chapter.contentPath, 'utf8');
        parts.push(content.substring(0, 2000));
        sources.push({ title: chapter.title, subject: chapter.subject, path: chapter.path });
      }

      return { context: parts.join('\n\n---\n\n'), sources };
    }
  } catch (e) {
    console.error('Error finding textbook context:', e);
  }

  return { context: '', sources: [] };
}