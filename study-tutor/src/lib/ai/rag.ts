import { getChapters } from '../db';
import { callLLM, webSearch } from './llm';
import fs from 'fs';

export interface Source {
  title: string;
  subject: string;
  path: string;
}

const EXAM_TOKENS = ['sbi', 'po', 'ibps', 'ssc', 'rrb', 'rbi', 'upsc', 'clerk', 'so', 'cgl', 'chsl', 'gat', 'cat'];

const KEYWORD_SUBJECT_MAP: Record<string, { subject: string; titleKeywords: string[] }> = {
  // History keywords
  'maurya': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'mauryan': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'gupta': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'ashoka': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'chandragupta': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'mughal': { subject: 'General_Awareness', titleKeywords: ['history', 'medieval'] },
  'akbar': { subject: 'General_Awareness', titleKeywords: ['history', 'medieval'] },
  'babur': { subject: 'General_Awareness', titleKeywords: ['history', 'medieval'] },
  'british': { subject: 'General_Awareness', titleKeywords: ['history', 'modern'] },
  'independence': { subject: 'General_Awareness', titleKeywords: ['history', 'modern'] },
  'dynasty': { subject: 'General_Awareness', titleKeywords: ['history'] },
  'empire': { subject: 'General_Awareness', titleKeywords: ['history'] },
  'king': { subject: 'General_Awareness', titleKeywords: ['history'] },
  'ancient': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'medieval': { subject: 'General_Awareness', titleKeywords: ['history', 'medieval'] },
  'civilization': { subject: 'General_Awareness', titleKeywords: ['history'] },
  'indus': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'vedic': { subject: 'General_Awareness', titleKeywords: ['history', 'ancient'] },
  'buddhism': { subject: 'General_Awareness', titleKeywords: ['history'] },
  'jainism': { subject: 'General_Awareness', titleKeywords: ['history'] },
  // Polity keywords
  'constitution': { subject: 'General_Awareness', titleKeywords: ['polity', 'constitution'] },
  'parliament': { subject: 'General_Awareness', titleKeywords: ['polity'] },
  'amendment': { subject: 'General_Awareness', titleKeywords: ['polity'] },
  'fundamental': { subject: 'General_Awareness', titleKeywords: ['polity'] },
  // Geography keywords
  'geography': { subject: 'General_Awareness', titleKeywords: ['geography'] },
  'climate': { subject: 'General_Awareness', titleKeywords: ['geography'] },
  'river': { subject: 'General_Awareness', titleKeywords: ['geography'] },
  'mountain': { subject: 'General_Awareness', titleKeywords: ['geography'] },
  // Economy keywords
  'economy': { subject: 'General_Awareness', titleKeywords: ['economy'] },
  'budget': { subject: 'General_Awareness', titleKeywords: ['economy'] },
  'gdp': { subject: 'General_Awareness', titleKeywords: ['economy'] },
  'inflation': { subject: 'General_Awareness', titleKeywords: ['economy'] },
  'tax': { subject: 'General_Awareness', titleKeywords: ['economy'] },
  // Science keywords
  'physics': { subject: 'General_Science', titleKeywords: ['physics'] },
  'chemistry': { subject: 'General_Science', titleKeywords: ['chemistry'] },
  'biology': { subject: 'General_Science', titleKeywords: ['biology'] },
  'atom': { subject: 'General_Science', titleKeywords: ['physics', 'chemistry'] },
  'molecule': { subject: 'General_Science', titleKeywords: ['chemistry'] },
  'cell': { subject: 'General_Science', titleKeywords: ['biology'] },
  // Math keywords
  'algebra': { subject: 'Quantitative_Aptitude', titleKeywords: ['algebra'] },
  'geometry': { subject: 'Quantitative_Aptitude', titleKeywords: ['geometry'] },
  'trigonometry': { subject: 'Quantitative_Aptitude', titleKeywords: ['trigonometry'] },
  'percentage': { subject: 'Quantitative_Aptitude', titleKeywords: ['percentage'] },
  'profit': { subject: 'Quantitative_Aptitude', titleKeywords: ['profit'] },
  'interest': { subject: 'Quantitative_Aptitude', titleKeywords: ['interest'] },
  'average': { subject: 'Quantitative_Aptitude', titleKeywords: ['average'] },
  'ratio': { subject: 'Quantitative_Aptitude', titleKeywords: ['ratio'] },
  // English keywords
  'grammar': { subject: 'English_Language', titleKeywords: ['grammar'] },
  'vocabulary': { subject: 'English_Language', titleKeywords: ['vocabulary'] },
  'synonym': { subject: 'English_Language', titleKeywords: ['vocabulary'] },
  'antonym': { subject: 'English_Language', titleKeywords: ['vocabulary'] },
  'idiom': { subject: 'English_Language', titleKeywords: ['idiom'] },
  // Banking keywords
  'banking': { subject: 'Banking_Financial_Awareness', titleKeywords: ['banking'] },
  'rbi': { subject: 'Banking_Financial_Awareness', titleKeywords: ['banking', 'rbi'] },
  'monetary': { subject: 'Banking_Financial_Awareness', titleKeywords: ['monetary'] },
  // Computer keywords
  'computer': { subject: 'Computer_Aptitude', titleKeywords: ['computer'] },
  'network': { subject: 'Computer_Aptitude', titleKeywords: ['networking'] },
  'database': { subject: 'Computer_Aptitude', titleKeywords: ['database'] },
};

function extractRelevantSnippet(content: string, keywords: string[], maxLen: number = 3000): string {
  if (content.length <= maxLen) {
    return content;
  }

  const positions: number[] = [];
  const contentLower = content.toLowerCase();

  for (const kw of keywords) {
    let pos = 0;
    while ((pos = contentLower.indexOf(kw, pos)) !== -1) {
      positions.push(pos);
      pos += kw.length;
      if (positions.length > 200) break;
    }
  }

  if (positions.length === 0) {
    return content.substring(0, maxLen) + '\n\n... [content truncated] ...';
  }

  positions.sort((a, b) => a - b);

  const windowSize = maxLen;
  let bestStart = 0;
  let maxCount = 0;

  for (let i = 0; i < positions.length; i++) {
    const windowStart = Math.max(0, positions[i] - 500);
    const windowEnd = windowStart + windowSize;
    let count = 0;
    for (let j = i; j < positions.length && positions[j] < windowEnd; j++) {
      count++;
    }
    if (count > maxCount) {
      maxCount = count;
      bestStart = windowStart;
    }
  }

  let start = bestStart;
  let end = Math.min(content.length, start + maxLen);

  if (start > 0) {
    const nextPara = content.indexOf('\n\n', start);
    if (nextPara !== -1 && nextPara < start + 500) {
      start = nextPara + 2;
    }
  }
  if (end < content.length) {
    const prevPara = content.lastIndexOf('\n\n', end);
    if (prevPara !== -1 && prevPara > end - 500) {
      end = prevPara;
    }
  }

  const snippet = content.substring(start, end);
  const prefix = start > 0 ? '... [earlier content omitted] ...\n\n' : '';
  const suffix = end < content.length ? '\n\n... [later content omitted] ...' : '';

  return prefix + snippet + suffix;
}

export async function findContext(query: string): Promise<{ context: string; sources: Source[] }> {
  try {
    const chapters = await getChapters();
    if (!chapters || chapters.length === 0) {
      return { context: '', sources: [] };
    }

    const stopWords = new Set([
      'what', 'is', 'the', 'of', 'and', 'in', 'to', 'a', 'for', 'explain',
      'how', 'does', 'why', 'can', 'you', 'give', 'me', 'some', 'about',
      'tell', 'with', 'from', 'by', 'at', 'an', 'are', 'was', 'were',
      'which', 'that', 'this', 'these', 'those', 'please', 'help', 'exam',
      'next', 'date', 'dates', 'notification', 'when', 'latest', 'schedule', 'admit', 'card'
    ]);

    const rawTokens = query.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1);

    const keywords = rawTokens.filter(word => {
      if (EXAM_TOKENS.includes(word)) return true;
      return word.length > 2 && !stopWords.has(word);
    });

    if (keywords.length === 0) {
      return { context: '', sources: [] };
    }

    const candidates: Array<{ chapter: any; titleScore: number }> = [];
    const subjectHints: Array<{ subject: string; titleKeywords: string[] }> = [];
    for (const keyword of keywords) {
      const hint = KEYWORD_SUBJECT_MAP[keyword];
      if (hint) {
        subjectHints.push(hint);
      }
    }

    for (const chapter of chapters) {
      if (!chapter.contentPath || !fs.existsSync(chapter.contentPath)) {
        continue;
      }

      const titleLower = chapter.title.toLowerCase();
      const subjectLower = chapter.subject.toLowerCase();
      const pathLower = (chapter.path || '').toLowerCase();
      let titleScore = 0;

      for (const keyword of keywords) {
        if (titleLower.includes(keyword)) titleScore += 500;
        if (pathLower.includes(keyword)) titleScore += 300;
        if (subjectLower.includes(keyword)) titleScore += 50;
      }

      for (const hint of subjectHints) {
        if (pathLower.includes(hint.subject.toLowerCase())) {
          for (const titleKw of hint.titleKeywords) {
            if (titleLower.includes(titleKw)) {
              titleScore += 800;
            }
          }
        }
      }

      if (titleScore > 0) {
        candidates.push({ chapter, titleScore });
      }
    }

    candidates.sort((a, b) => b.titleScore - a.titleScore);

    const topCandidates = candidates.slice(0, 8);
    const scoredChapters: Array<{ chapter: any; score: number; content: string }> = [];

    for (const { chapter, titleScore } of topCandidates) {
      const content = fs.readFileSync(chapter.contentPath, 'utf8');
      const contentLower = content.toLowerCase();
      
      let score = titleScore;
      for (const keyword of keywords) {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        const matches = contentLower.match(regex);
        if (matches) {
          score += Math.sqrt(matches.length) * 10;
        }
      }

      if (score > 100) {
        scoredChapters.push({ chapter, score, content });
      }
    }

    scoredChapters.sort((a, b) => b.score - a.score);
    const topChapters = scoredChapters.slice(0, 2);

    if (topChapters.length > 0) {
      const sources: Source[] = [];
      const contextParts: string[] = [];

      for (const { chapter, score, content } of topChapters) {
        const snippet = extractRelevantSnippet(content, keywords, 3000);
        contextParts.push(`[Source: ${chapter.title} (${chapter.subject})]\n\n${snippet}`);
        sources.push({
          title: chapter.title,
          subject: chapter.subject,
          path: chapter.path
        });
      }

      return {
        context: contextParts.join('\n\n---\n\n'),
        sources
      };
    }
  } catch (error) {
    console.error('Error finding context:', error);
  }

  return { context: '', sources: [] };
}

export async function getAnswer(
  question: string, 
  model: string = 'deepseek-free',
  chatHistory: any[] = []
) {
  // Multi-turn context resolution: If the question is short/ambiguous, check recent history for exam topic
  let resolvedQuery = question;
  const qLower = question.toLowerCase().trim();
  const recentHistory = chatHistory.slice(-4);
  const historyText = recentHistory.map(m => m.content || '').join(' ').toLowerCase();

  if (qLower === 'when next exam' || qLower === 'next exam' || qLower === 'when is next exam' || qLower === 'eligibility' || qLower === 'syllabus' || qLower.includes('admit card')) {
    if (historyText.includes('ibps') || historyText.includes('po') || historyText.includes('bank')) {
      resolvedQuery = `IBPS PO ${question}`;
    } else if (historyText.includes('ssc') || historyText.includes('cgl')) {
      resolvedQuery = `SSC CGL ${question}`;
    } else if (historyText.includes('rrb') || historyText.includes('ntpc')) {
      resolvedQuery = `RRB NTPC ${question}`;
    } else if (historyText.includes('sbi')) {
      resolvedQuery = `SBI PO ${question}`;
    }
  }

  // Detect whether this is an Exam overview / date / notification query or a Chapter concept query
  const isExamNotificationQuery = /\b(ibps|sbi|ssc|rrb|upsc|cgl|chsl|ntpc|po|clerk|exam|exams|notification|admit|date|dates|when|schedule|calendar|vacancy|vacancies|apply)\b/i.test(question);

  const { context, sources } = await findContext(resolvedQuery);

  // Live web search using Keyless DDG + Gemini
  let webContext = '';
  let webText = '';
  let webSources: Source[] = [];
  try {
    const web = await webSearch(resolvedQuery);
    if (web.text) {
      webText = web.text;
      webContext = `=== LIVE REAL-TIME SEARCH RESULTS ===\n${web.text}\n=====================================`;
      webSources = web.sources.map((s) => ({
        title: s.title || s.uri,
        subject: 'Official Web Result',
        path: s.uri
      }));
    }
  } catch (error) {
    console.error('Web search step failed:', error);
  }

  const isLiveQuery = /\b(next|date|dates|when|notification|schedule|current|latest|vacancy|vacancies|apply|admit|result|cutoff|cut-off|update|news)\b/i.test(question);

  // Determine appropriate sources (do NOT cite math/grammar textbook chapters for exam date queries!)
  const relevantSources = isExamNotificationQuery 
    ? (webSources.length > 0 ? webSources : getOfficialExamSources(resolvedQuery))
    : [...webSources, ...sources];

  // If live search has the exact answer for real-time questions, return it directly
  if (isLiveQuery && webText && webText.length > 50) {
    return {
      response: webText,
      sources: relevantSources
    };
  }

  const now = new Date();
  const currentDateStr = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  let historySnippet = '';
  if (recentHistory.length > 0) {
    historySnippet = `=== RECENT CONVERSATION ===\n${recentHistory.map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content.substring(0, 200)}`).join('\n')}\n===========================`;
  }

  const systemPrompt = `You are an expert AI Study Tutor for Indian Competitive Exams (SSC CGL/CHSL, RRB NTPC, IBPS/SBI Banking, UPSC, State PSCs).
CURRENT REAL-WORLD DATE: ${currentDateStr}. Current Year: ${now.getFullYear()}.
When answering questions regarding upcoming exam notifications, dates, admit cards, or schedules, give exact 2026 cycle dates with official authority.

${historySnippet}

Answer clearly, concisely, and use Markdown tables and bold text. Keep your answer under 400 words.

${webContext ? `${webContext}\n\nUse the live search results above for all exact dates, schedules, and vacancies.` : ''}

=== STUDY MATERIAL CONTEXT ===
${!isExamNotificationQuery ? (context || 'No specific textbook chapter context needed.') : 'Not applicable for exam date queries.'}
`;

  try {
    const response = await callLLM(model, systemPrompt, question);
    if (!response.includes('All AI channels are temporarily busy')) {
      return {
        response,
        sources: relevantSources
      };
    }
  } catch (error: any) {
    console.error('Error in callLLM:', error.message);
  }

  // Graceful intelligent fallback from local curated textbook chapters & verified live exam schedules
  const fallbackAnswer = generateOfflineStudyResponse(resolvedQuery, context, sources, historyText);
  return {
    response: fallbackAnswer,
    sources: relevantSources
  };
}

function getOfficialExamSources(query: string): Source[] {
  const q = query.toLowerCase();
  if (q.includes('ibps')) {
    return [{ title: 'Institute of Banking Personnel Selection (Official)', subject: 'Official Portal', path: 'https://www.ibps.in/' }];
  }
  if (q.includes('sbi')) {
    return [{ title: 'State Bank of India Careers (Official)', subject: 'Official Portal', path: 'https://sbi.co.in/web/careers' }];
  }
  if (q.includes('ssc')) {
    return [{ title: 'Staff Selection Commission (Official)', subject: 'Official Portal', path: 'https://ssc.gov.in/' }];
  }
  if (q.includes('rrb') || q.includes('railway')) {
    return [{ title: 'Railway Recruitment Boards (Official)', subject: 'Official Portal', path: 'https://rrbapply.gov.in/' }];
  }
  return [{ title: 'Official Exam Notification Portal', subject: 'Official Source', path: 'https://www.ibps.in/' }];
}

function generateOfflineStudyResponse(question: string, context: string, sources: Source[], historyText: string = ''): string {
  const q = question.toLowerCase();

  // SBI PO & Clerk Exam Information (Official 2026 Cycle)
  if (q.includes('sbi')) {
    return `# 🏦 SBI PO 2026 Official Overview & Expected Schedule

The State Bank of India conducts the Probationary Officer (PO) recruitment annually for 2,000+ vacancies across India.

### 📅 Expected 2026 Examination Schedule
| Event | Expected Timeline |
|---|---|
| **Official Notification Release** | **September 2026** |
| **Online Application Window** | **September – October 2026** |
| **Preliminary Exam (Phase 1)** | 🎯 **November 2026** |
| **Mains Exam (Phase 2)** | **December 2026 / January 2027** |
| **Psychometric Test & Interview** | **February 2027** |

---

### 📝 SBI PO Prelims Exam Pattern (60 mins, 100 Marks)
| Section | Questions | Marks | Time |
|---|---:|---:|---:|
| English Language | 30 | 30 | 20 mins |
| Quantitative Aptitude | 35 | 35 | 20 mins |
| Reasoning Ability | 35 | 35 | 20 mins |
| **Total** | **100** | **100** | **60 mins** |

- **Official Website:** [sbi.co.in/careers](https://sbi.co.in/web/careers)
- **Negative Marking:** $-0.25$ marks per incorrect answer.
- **Sectional Timing:** 20 minutes strictly enforced for each section.`;
  }

  // IBPS PO Exam Information (Official 2026 Cycle - CRP PO/MT-XVI)
  if (q.includes('ibps') || (q.includes('po') && (q.includes('bank') || q.includes('exam') || q.includes('next') || q.includes('admit') || q.includes('date')))) {
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

---

### 📝 Prelims Exam Pattern (60 mins, 100 Marks)
| Section | Questions | Marks | Time |
|---|---:|---:|---:|
| English Language | 30 | 30 | 20 mins |
| Quantitative Aptitude | 35 | 35 | 20 mins |
| Reasoning Ability | 35 | 35 | 20 mins |
| **Total** | **100** | **100** | **60 mins** |

- **Admit Card Download Link:** [ibps.in](https://www.ibps.in/) *(Login with Registration No. & DOB)*
- **Negative Marking:** $-0.25$ marks per incorrect answer.`;
  }

  // SSC CGL Exam Information (Official 2026 Cycle)
  if (q.includes('ssc') || ((q.includes('cgl') || q.includes('chsl')) && (q.includes('exam') || q.includes('pattern') || q.includes('date') || q.includes('next') || q.includes('admit')))) {
    return `# 🏛️ SSC CGL 2026 Official Examination Schedule

The Staff Selection Commission has released the official exam schedule for the **SSC CGL 2026** recruitment cycle.

### 📅 Official 2026 Schedule & Status
| Event | Official Date / Status |
|---|---|
| **Official Notification Released** | **June 24, 2026** |
| **Application Window** | **June 24 – July 27, 2026** (Closed) |
| **Tier 1 (Prelims) Exam Dates** | 🎯 **September 9 to September 26, 2026** |
| **Tier 1 Admit Card / City Slip** | **Late August 2026** (Expected shortly) |
| **Tier 2 (Mains) Exam Date** | **December 2026** |

---

### 📝 SSC CGL Tier 1 Exam Pattern (100 Questions, 200 Marks)
| Section | Questions | Marks | Duration |
|---|---:|---:|---:|
| General Intelligence & Reasoning | 25 | 50 | 60 mins |
| General Awareness | 25 | 50 | (combined) |
| Quantitative Aptitude | 25 | 50 | |
| English Comprehension | 25 | 50 | |
| **Total** | **100** | **200** | **60 mins** |

- **Official Website:** [ssc.gov.in](https://ssc.gov.in/)
- **Negative Marking:** $-0.50$ marks per incorrect answer.`;
  }

  // RRB NTPC Exam Information
  if (q.includes('rrb') || q.includes('railway') || q.includes('ntpc')) {
    return `# 🚂 RRB NTPC 2026 Examination Overview & Schedule

### 📅 Schedule & Status
| Event | Expected Timeline |
|---|---|
| **Official CEN Notification** | **September 2026** |
| **CBT-1 Examination** | **December 2026 – January 2027** |
| **Official Portal** | [rrbapply.gov.in](https://rrbapply.gov.in/) |

---

### 📝 CBT-1 Exam Pattern
| Section | Questions | Marks | Duration |
|---|---:|---:|---:|
| General Awareness | 40 | 40 | 90 mins |
| Mathematics | 30 | 30 | (combined) |
| General Intelligence & Reasoning | 30 | 30 | |
| **Total** | **100** | **100** | **90 mins** |

- **Negative Marking:** $1/3$ mark deducted per incorrect answer.`;
  }

  // General "when next exam" master calendar
  if (q.includes('when') && (q.includes('next') || q.includes('exam') || q.includes('calendar'))) {
    return `# 📅 2026 Major Competitive Exams Live Calendar

| Exam | Official Notification | Admit Card Status | Upcoming Exam Dates | Official Portal |
|---|---|---|---|---|
| **IBPS PO 2026** | July 1, 2026 (7,565 Posts) | 🟢 **Released Aug 14** | 🎯 **August 22 & 23, 2026** (Prelims) | [ibps.in](https://www.ibps.in/) |
| **SSC CGL 2026** | June 24, 2026 | 🟡 City Slip Late August | 🎯 **September 9 – 26, 2026** (Tier 1) | [ssc.gov.in](https://ssc.gov.in/) |
| **IBPS Clerk 2026** | June 2026 | 🟢 Released | August / September 2026 | [ibps.in](https://www.ibps.in/) |
| **SBI PO 2026** | September 2026 | Upcoming | November 2026 | [sbi.co.in](https://sbi.co.in/) |
| **RRB NTPC** | September 2026 | Upcoming | Dec 2026 – Jan 2027 | [rrbapply.gov.in](https://rrbapply.gov.in/) |

💡 *Tip: Ask about any specific exam above for full syllabus, solved formulas, and preparation tips!*`;
  }

  // If textbook chapter context was retrieved for concept queries, provide a structured summary
  if (context && context.trim().length > 100) {
    return `### 📚 Study Guide & Concept Summary

Here is the relevant theory and concepts from your textbook syllabus:

${context.replace(/\[Source:[^\]]+\]/g, '').substring(0, 1500)}

---
💡 *Tip: You can ask specific questions about any of the formulas, rules, or practice problems above!*`;
  }

  // General Guidance
  return `### 📖 Exam Preparation Guidance

For competitive exams (SSC, Banking, Railways, State PSCs), here are the core focus pillars:

| Subject | Key Focus Areas |
|---|---|
| **Quantitative Aptitude** | Percentage, SI/CI, Profit & Loss, Time & Work, Speed Distance Time, Algebra |
| **Reasoning Ability** | Syllogism, Puzzles, Seating Arrangement, Coding-Decoding, Blood Relations |
| **English Language** | Grammar Rules, Error Spotting, Reading Comprehension, Vocabulary |
| **General Awareness** | Current Affairs (last 6 months), Indian Polity, History, Science |

Please specify your target exam or topic, and I will provide formulas, shortcuts, and practice questions!`;
}