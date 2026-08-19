import { getChapters } from '../db';
import { callLLM, webSearch } from './llm';
import fs from 'fs';
import path from 'path';

export interface Source {
  title: string;
  subject: string;
  path: string;
}

// Short exam/service acronyms that are too small for the normal >3 char keyword
// filter but are strong discriminators (e.g. "SBI PO", "IBPS PO", "SSC CGL").
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

function extractRelevantSnippet(content: string, keywords: string[], maxLen: number = 12000): string {
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
      'next', 'date', 'dates', 'notification', 'when', 'latest', 'schedule'
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

    const topCandidates = candidates.slice(0, 10);
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
    const topChapters = scoredChapters.slice(0, 3);

    if (topChapters.length > 0) {
      const sources: Source[] = [];
      const contextParts: string[] = [];

      for (const { chapter, score, content } of topChapters) {
        const snippet = extractRelevantSnippet(content, keywords, 8000);
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

export async function getAnswer(question: string, model: string = 'deepseek-free') {
  const { context, sources } = await findContext(question);

  // Live web search using Gemini's native Google Search grounding
  let webContext = '';
  let webText = '';
  let webSources: Source[] = [];
  try {
    const web = await webSearch(question);
    if (web.text) {
      webText = web.text;
      webContext = `=== LIVE REAL-TIME GOOGLE SEARCH RESULTS (FETCHED NOW) ===\n${web.text}\n======================================================`;
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

  // If live search has the exact answer for real-time questions, return it directly to avoid double-LLM latency timeouts
  if (isLiveQuery && webText && webText.length > 50) {
    return {
      response: webText,
      sources: [...webSources, ...sources]
    };
  }

  const systemPrompt = `You are a highly helpful and precise AI Study Tutor for Indian Competitive Exams (SSC, RRB, Banking/IBPS/SBI, UPSC, Defence, State PSCs).

${webContext ? `${webContext}\n\nIMPORTANT: You have active live internet search data provided above. Use these live search results to state exact current exam dates, notifications, and application schedules with total confidence. Do NOT say you lack internet or live access.` : ''}

=== MANDATORY RULES ===
1. If LIVE REAL-TIME GOOGLE SEARCH RESULTS are provided above, PRIORITISE them for all exam notifications, application dates, prelims/mains dates, eligibility, and current affairs.
2. If textbook study material is provided below, use it for formulas, concepts, syllabus topics, and exam preparation strategies.
3. Format all timelines, exam patterns, marks distributions, and subjects into beautiful, readable Markdown tables.
4. Keep your answer structured, clear, and encouraging. Use LaTeX math notation ($x$ or $$x$$) for formulas if applicable.

=== STUDY MATERIAL CONTEXT (Book Chapters) ===
${context || 'No specific textbook chapter context needed for this query.'}
`;

  try {
    const response = await callLLM(model, systemPrompt, question);
    return {
      response,
      sources: [...webSources, ...sources]
    };
  } catch (error: any) {
    console.error('Error generating answer in rag:', error);
    return {
      response: webText || `Failed to generate answer: ${error.message}`,
      sources: webSources
    };
  }
}