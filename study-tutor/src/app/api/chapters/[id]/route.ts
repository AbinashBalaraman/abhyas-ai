import { NextRequest, NextResponse } from 'next/server';
import { getChapters } from '@/lib/db';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = decodeURIComponent(rawId);
    const allChapters = await getChapters();
    const chapter = allChapters.find(ch => ch.id === id);

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Try to read the chapter file from the books directory
    // chapter.id format: "Subject_Dir/Chapter_Name" (e.g. "General_Awareness/09_Ancient_Indian_History")
    const booksDir = path.join(process.cwd(), '..', 'books');
    const idParts = chapter.id.split('/');
    const subjectDir = idParts[0]; // Use actual directory name, not display name
    const fileName = idParts.length > 1 ? `${idParts[1]}.md` : `${chapter.id}.md`;
    const filePath = path.join(booksDir, subjectDir, fileName);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json({ content, title: chapter.title, subject: chapter.subject });
    } catch {
      return NextResponse.json({ content: 'Content not available.', title: chapter.title, subject: chapter.subject });
    }
  } catch (error) {
    console.error('Error reading chapter:', error);
    return NextResponse.json({ error: 'Failed to load chapter' }, { status: 500 });
  }
}
