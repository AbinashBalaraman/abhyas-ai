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

// Semantic keyword → subject mapping. When a user asks about "Maurya" or "Gupta",
// we know it's a history topic, so boost chapters in General_Awareness that have
// "History" in the title. This prevents massive non-history chapters (like Static GK
// or Quantitative Aptitude) from outscoring the actual history chapter.
const KEYWORD_SUBJECT_MAP: Record<string, { subject: string; titleKeywords: string[] }> = {
  // History keywords → General Awareness / History chapters
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

/**
 * Extract the most relevant snippet from chapter content based on keyword density.
 * Finds the window of text where keywords appear most frequently, then expands
 * to include surrounding context. Falls back to the beginning of the document.
 */
function extractRelevantSnippet(content: string, keywords: string[], maxLen: number = 12000): string {
  if (content.length <= maxLen) {
    return content;
  }

  // Find all keyword match positions
  const positions: number[] = [];
  const contentLower = content.toLowerCase();
  
  for (const keyword of keywords) {
    let searchFrom = 0;
    while (true) {
      const idx = contentLower.indexOf(keyword, searchFrom);
      if (idx === -1) break;
      positions.push(idx);
      searchFrom = idx + keyword.length;
    }
  }

  if (positions.length === 0) {
    // No keyword matches found, take the beginning
    return content.substring(0, maxLen) + '\n\n[... content truncated ...]';
  }

  // Find the densest window of keyword matches
  // Use a sliding window approach: for each position, count how many other
  // positions fall within maxLen/2 chars after it
  const windowSize = Math.floor(maxLen / 2);
  let bestStart = 0;
  let bestCount = 0;

  for (let i = 0; i < positions.length; i++) {
    let count = 0;
    for (let j = i; j < positions.length; j++) {
      if (positions[j] - positions[i] <= windowSize) {
        count++;
      } else {
        break;
      }
    }
    if (count > bestCount) {
      bestCount = count;
      bestStart = positions[i];
    }
  }

  // Center the snippet around the densest keyword cluster
  // Try to start from the beginning of a line for cleaner extraction
  let snippetStart = Math.max(0, bestStart - Math.floor(maxLen * 0.2));
  
  // Snap to the beginning of the nearest line
  while (snippetStart > 0 && content[snippetStart - 1] !== '\n') {
    snippetStart--;
  }

  let snippetEnd = Math.min(content.length, snippetStart + maxLen);
  
  // Snap to the end of the nearest line
  while (snippetEnd < content.length && content[snippetEnd] !== '\n') {
    snippetEnd++;
  }

  let snippet = content.substring(snippetStart, snippetEnd);
  
  if (snippetStart > 0) {
    snippet = '[... earlier content omitted ...]\n\n' + snippet;
  }
  if (snippetEnd < content.length) {
    snippet += '\n\n[... remaining content truncated ...]';
  }

  return snippet;
}

// Simple local keyword-based search to find context in markdown files
async function findContext(question: string): Promise<{ context: string; sources: Source[] }> {
  try {
    const chapters = await getChapters();
    if (chapters.length === 0) {
      return { context: '', sources: [] };
    }

    // Tokenize question into keywords (lowercase, alphanumeric, length > 3).
    // Also keep known exam acronyms (e.g. "sbi", "po") which are <= 3 chars but
    // are strong signals that the user is asking about a specific exam.
    const words = question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/);
    const keywords = words.filter(word =>
      (word.length > 3 && !['what', 'with', 'from', 'this', 'that', 'about', 'exam', 'study', 'tutor', 'help', 'give', 'show', 'their', 'ruling', 'rulers', 'kings', 'years', 'tell', 'list', 'explain', 'describe'].includes(word)) ||
      EXAM_TOKENS.includes(word)
    );

    if (keywords.length === 0) {
      return { context: '', sources: [] };
    }

    // Phase 1: Pre-filter chapters by title/subject/filename only (no file reads)
    // This is fast and narrows down candidates before expensive file reads
    const candidates: Array<{ chapter: any; titleScore: number }> = [];

    // Build semantic subject hints from keywords (e.g. "maurya" → General_Awareness/History)
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
        if (EXAM_TOKENS.includes(keyword) && titleLower.includes(keyword)) titleScore += 1000;
      }

      // Apply semantic subject hints: if a keyword maps to a subject+titleKeywords,
      // boost chapters in that subject whose title contains the hint's titleKeywords
      for (const hint of subjectHints) {
        // Check if this chapter is in the hinted subject (by path, which contains the dir name)
        if (pathLower.includes(hint.subject.toLowerCase().replace(/_/g, '_'))) {
          for (const titleKw of hint.titleKeywords) {
            if (titleLower.includes(titleKw)) {
              titleScore += 800; // Strong boost: right subject + right topic
            }
          }
        }
      }

      // Always include as candidate if titleScore > 0, or as a fallback
      candidates.push({ chapter, titleScore });
    }

    // Sort candidates: title-matched chapters first, then the rest
    candidates.sort((a, b) => b.titleScore - a.titleScore);

    // Phase 2: Read content only for top candidates (max 15) to find best matches
    // This avoids reading all 103 massive files on every query
    const topCandidates = candidates.slice(0, 15);
    const scoredChapters: Array<{ chapter: any; score: number; content: string }> = [];

    for (const { chapter, titleScore } of topCandidates) {
      const content = fs.readFileSync(chapter.contentPath, 'utf8');
      const contentLower = content.toLowerCase();
      
      let score = titleScore; // Start with title-based score (heavily weighted)
      for (const keyword of keywords) {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        const matches = contentLower.match(regex);
        if (matches) {
          // Use sqrt scaling to prevent massive chapters from dominating
          // purely due to size. sqrt(100) = 10, sqrt(10000) = 100.
          // Title matches (500/keyword) always dominate content matches.
          score += Math.sqrt(matches.length) * 10;
        }
      }

      if (score > 0) {
        scoredChapters.push({ chapter, score, content });
      }
    }

    // Sort by score descending and take top 3
    scoredChapters.sort((a, b) => b.score - a.score);
    const topChapters = scoredChapters.slice(0, 3);

    if (topChapters.length > 0) {
      const sources: Source[] = [];
      const contextParts: string[] = [];

      for (const { chapter, score, content } of topChapters) {
        console.log(`Found context in: ${chapter.title} (Score: ${score})`);
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

export async function getAnswer(question: string, model: string = 'gemini') {
  const { context, sources } = await findContext(question);

  // Live web search for real-time / current information (exam patterns, marking
  // schemes, notifications, cut-offs, current affairs). Best-effort; ignored if it fails.
  let webContext = '';
  let webSources: Source[] = [];
  try {
    const web = await webSearch(question);
    if (web.text) {
      webContext = `\n\n=== LIVE WEB RESULTS (fetched at ${new Date().toISOString()}) ===\n${web.text}`;
      webSources = web.sources.map((s) => ({
        title: s.title || s.uri,
        subject: 'Web',
        path: s.uri
      }));
    }
  } catch (error) {
    console.error('Web search step failed:', error);
  }

  const systemPrompt = `You are a highly helpful and precise AI Study Tutor for Indian Competitive Exams (SSC, RRB, Banking, UPSC, Defence, etc.).
Your goal is to answer the user's question using the provided context.

=== MANDATORY RULES ===
1. If LIVE WEB RESULTS are provided, PRIORITISE them for any current, time-sensitive, or factual-update question (e.g. exam patterns, marking schemes, notifications, vacancies, cut-offs, current affairs, scheme details). They are fetched in real time and are more up to date than the book chapters. Always cite the source URLs when you use web data.
2. Use the STUDY MATERIAL CONTEXT (book chapters) for static theory, formulas, definitions, and practice. If it conflicts with older knowledge, the LIVE WEB RESULTS win for current facts.
3. If neither context contains the answer, answer using your general knowledge, but begin with: "Based on general competitive exam guidelines (not found in current material):"
4. Keep your explanation structured, concise, and professional. Use markdown formatting. Use LaTeX math notation (e.g. $x$ or $$x$$) for formulas if necessary.
5. Maintain a supportive, tutorial-style tone.

=== STUDY MATERIAL CONTEXT (book chapters) ===
${context || 'No specific chapter context found.'}
${webContext}
`;

  try {
    const response = await callLLM(model, systemPrompt, question);
    return {
      response,
      sources: [...sources, ...webSources]
    };
  } catch (error: any) {
    console.error('Error generating answer in rag:', error);
    return {
      response: `Failed to generate answer: ${error.message}`,
      sources: []
    };
  }
}