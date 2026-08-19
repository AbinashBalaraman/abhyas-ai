import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Chapter {
  id: string;
  title: string;
  subject: string;
  path: string;
  contentPath: string;
}

const SUBJECT_MAPPING: Record<string, string> = {
  'Quantitative_Aptitude': 'Quantitative Aptitude',
  'Reasoning_Ability': 'Reasoning Ability',
  'English_Language': 'English Language',
  'General_Science': 'General Science',
  'General_Awareness': 'General Awareness',
  'Banking_Financial_Awareness': 'Banking & Financial Awareness',
  'Computer_Aptitude': 'Computer Aptitude'
};

export function getBooksPath(): string {
  const candidatePaths = [
    path.join(process.cwd(), '../books'),
    path.join(process.cwd(), 'books'),
    path.join(__dirname, '../../../../books'),
    path.join(__dirname, '../../../books'),
    path.join(__dirname, '../../books'),
    path.resolve('../books'),
    path.resolve('./books'),
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return path.join(process.cwd(), '../books');
}

export async function getChapters(): Promise<Chapter[]> {
  const booksPath = getBooksPath();
  const chapters: Chapter[] = [];

  try {
    if (!fs.existsSync(booksPath)) {
      console.warn(`Books directory not found at ${booksPath}, returning empty list.`);
      return [];
    }

    const dirs = fs.readdirSync(booksPath);
    for (const dir of dirs) {
      if (dir.startsWith('_') || !SUBJECT_MAPPING[dir]) {
        continue;
      }

      const dirPath = path.join(booksPath, dir);
      if (!fs.statSync(dirPath).isDirectory()) {
        continue;
      }

      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        if (!file.endsWith('.md')) {
          continue;
        }

        const filePath = path.join(dirPath, file);
        let title = file.replace('.md', '').replace(/_/g, ' ');
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const firstLine = content.split('\n')[0];
          if (firstLine.startsWith('#')) {
            title = firstLine.replace('#', '').trim();
          }
        } catch (e) {
          // ignore read error
        }

        const id = `${dir}/${file.replace('.md', '')}`;
        chapters.push({
          id,
          title,
          subject: SUBJECT_MAPPING[dir],
          path: `${dir}/${file}`,
          contentPath: filePath
        });
      }
    }
  } catch (error) {
    console.error('Error reading chapters from disk:', error);
  }

  // Fallback to static if empty
  if (chapters.length === 0) {
    return [
      { id: 'Quantitative_Aptitude/01_Number_System', title: 'Chapter 1: Number System & Simplification', subject: 'Quantitative Aptitude', path: 'Quantitative_Aptitude/01_Number_System.md', contentPath: '' },
      { id: 'Reasoning_Ability/01_Analogy', title: 'Chapter 1: Analogy & Classification', subject: 'Reasoning Ability', path: 'Reasoning_Ability/01_Analogy.md', contentPath: '' },
      { id: 'English_Language/01_Noun', title: 'Chapter 1: Noun & Pronoun Rules', subject: 'English Language', path: 'English_Language/01_Noun.md', contentPath: '' },
      { id: 'General_Science/01_Physics_Mechanics', title: 'Chapter 1: General Physics & Mechanics', subject: 'General Science', path: 'General_Science/01_Physics_Mechanics.md', contentPath: '' },
      { id: 'General_Awareness/01_Indian_History', title: 'Chapter 1: Indian History', subject: 'General Awareness', path: 'General_Awareness/01_Indian_History.md', contentPath: '' }
    ];
  }

  return chapters;
}

export async function searchChapters(query: string): Promise<Chapter[]> {
  const allChapters = await getChapters();
  return allChapters.filter(chapter =>
    chapter.title.toLowerCase().includes(query.toLowerCase()) ||
    chapter.subject.toLowerCase().includes(query.toLowerCase())
  );
}

// Database Helpers for Chat History
export async function getChatHistory() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        'SELECT sender, text, sources, timestamp FROM chat_history ORDER BY timestamp ASC'
      );
      return res.rows.map(row => ({
        role: row.sender === 'user' ? 'user' : 'ai',
        content: row.text,
        sources: (() => {
          if (!row.sources) return [];
          try {
            return typeof row.sources === 'string' ? JSON.parse(row.sources) : row.sources;
          } catch {
            return [];
          }
        })()
      }));
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Failed to retrieve chat history:', error);
    return [];
  }
}

export async function saveChatMessage(sender: 'user' | 'ai', text: string, sources: any[] = []) {
  try {
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO chat_history (sender, text, sources, timestamp) VALUES ($1, $2, $3, NOW())',
        [sender, text, JSON.stringify(sources)]
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Failed to save chat message:', error);
  }
}

// Database Helpers for User Progress
export async function getUserProgress(key: string, defaultValue: string = ''): Promise<string> {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT value FROM user_progress WHERE key = $1', [key]);
      if (res.rows.length > 0) {
        return res.rows[0].value;
      }
      return defaultValue;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(`Failed to get user progress for key ${key}:`, error);
    return defaultValue;
  }
}

export async function saveUserProgress(key: string, value: string) {
  try {
    const client = await pool.connect();
    try {
      // Upsert query for postgres
      await client.query(
        `INSERT INTO user_progress (key, value) 
         VALUES ($1, $2) 
         ON CONFLICT (key) 
         DO UPDATE SET value = EXCLUDED.value`,
        [key, value]
      );
    } catch (innerError) {
      // If table doesn't have constraint, fall back to check and insert/update
      const res = await client.query('SELECT 1 FROM user_progress WHERE key = $1', [key]);
      if (res.rows.length > 0) {
        await client.query('UPDATE user_progress SET value = $2 WHERE key = $1', [key, value]);
      } else {
        await client.query('INSERT INTO user_progress (key, value) VALUES ($1, $2)', [key, value]);
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(`Failed to save user progress for key ${key}:`, error);
  }
}