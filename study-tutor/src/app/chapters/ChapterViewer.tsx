"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Chapter {
  id: string;
  title: string;
  subject: string;
  path: string;
  contentPath: string;
}

interface ChapterViewerProps {
  chapters: Chapter[];
  subjects: string[];
}

export default function ChapterViewer({ chapters, subjects }: ChapterViewerProps) {
  const [activeSubject, setActiveSubject] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [content, setContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = chapters.filter(ch => {
    const matchesSubject = activeSubject === 'All' || ch.subject === activeSubject;
    const matchesSearch = !searchQuery || 
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleChapterClick = async (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setIsLoadingContent(true);
    setContent('');
    
    try {
      const res = await fetch(`/api/chapters/${encodeURIComponent(chapter.id)}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || 'No content available.');
      } else {
        setContent('Failed to load chapter content.');
      }
    } catch {
      setContent('Error loading chapter content.');
    } finally {
      setIsLoadingContent(false);
    }
  };

  return (
    <>
      {/* Subject Filter + Search */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubject('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              activeSubject === 'All'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeSubject === subject
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Chapter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChapters.map(chapter => (
          <div
            key={chapter.id}
            onClick={() => handleChapterClick(chapter)}
            className={`bg-slate-900/60 border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:border-indigo-500/30 ${
              selectedChapter?.id === chapter.id
                ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'border-slate-800'
            }`}
          >
            <h3 className="font-semibold text-sm text-slate-100 mb-1 line-clamp-2">{chapter.title}</h3>
            <p className="text-xs text-slate-500">{chapter.subject}</p>
          </div>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <span className="text-4xl block mb-3">🔍</span>
          <p>No chapters found matching your search.</p>
        </div>
      )}

      {/* Chapter Content Modal */}
      {selectedChapter && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedChapter(null)}
        >
          <div
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-100">{selectedChapter.title}</h2>
                <p className="text-xs text-indigo-400 mt-0.5">{selectedChapter.subject}</p>
              </div>
              <button
                onClick={() => setSelectedChapter(null)}
                className="text-slate-500 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 flex-1">
              {isLoadingContent ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
