import fs from 'fs';
import path from 'path';
import { getChapters, getBooksPath } from '../db';

export interface RetrievedDocument {
  title: string;
  subject: string;
  path: string;
  content: string;
}

export async function searchKnowledgeBase(query: string, topK: number = 3): Promise<RetrievedDocument[]> {
  try {
    const chapters = await getChapters();
    const q = query.toLowerCase();
    const queryTokens = q.split(/\s+/).filter(t => t.length > 2);

    const scoredChapters = chapters.map(chapter => {
      let score = 0;
      const titleLower = chapter.title.toLowerCase();
      const subjectLower = chapter.subject.toLowerCase();
      const pathLower = chapter.path.toLowerCase();

      // Exact title match
      if (titleLower.includes(q)) score += 50;
      if (subjectLower.includes(q)) score += 20;

      // Token matches
      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 15;
        if (pathLower.includes(token)) score += 10;
        if (subjectLower.includes(token)) score += 5;
      }

      return { chapter, score };
    });

    // Sort by relevance score
    scoredChapters.sort((a, b) => b.score - a.score);

    const selected = scoredChapters.slice(0, topK).filter(s => s.score > 0);
    const resultsToUse = selected.length > 0 ? selected : scoredChapters.slice(0, 1);

    const booksPath = getBooksPath();
    const results: RetrievedDocument[] = [];

    for (const item of resultsToUse) {
      let content = '';
      try {
        const fullPath = item.chapter.contentPath || path.join(booksPath, item.chapter.path);
        if (fs.existsSync(fullPath)) {
          content = fs.readFileSync(fullPath, 'utf-8');
        }
      } catch (e) {}

      results.push({
        title: item.chapter.title,
        subject: item.chapter.subject,
        path: item.chapter.path,
        content: content || `Chapter summary for ${item.chapter.title}`
      });
    }

    return results;
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
}
