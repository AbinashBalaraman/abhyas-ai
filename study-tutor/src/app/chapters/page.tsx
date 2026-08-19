import { getChapters } from '@/lib/db';
import ChapterViewer from './ChapterViewer';

export default async function ChapterBrowser() {
  const allChapters = await getChapters();
  const subjects = Array.from(new Set(allChapters.map(ch => ch.subject)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="pb-4 border-b border-slate-800 mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Chapter Browser
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse all {allChapters.length} chapters across {subjects.length} subjects. Click any chapter to read its full content.
          </p>
        </div>
        
        <ChapterViewer chapters={allChapters} subjects={subjects} />
      </div>
    </div>
  );
}