"use client";

import { useState, useEffect } from 'react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const SUBJECTS = [
  'All',
  'Quantitative Aptitude',
  'Reasoning Ability',
  'General Science',
  'English Language',
  'Banking & Financial Awareness',
  'Computer Aptitude'
];

export default function FlashcardsPage() {
  const [subject, setSubject] = useState('All');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mastered card IDs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mastered_flashcards');
    if (saved) {
      try {
        setMasteredIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch flashcards from API
  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      setIsFlipped(false);
      setCurrentIndex(0);
      try {
        const url = `/api/flashcards?subject=${encodeURIComponent(subject)}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setFlashcards(data.flashcards || []);
        }
      } catch (error) {
        console.error('Failed to load flashcards:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, [subject]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (flashcards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    if (flashcards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleToggleMastered = () => {
    if (flashcards.length === 0) return;
    const currentCard = flashcards[currentIndex];
    let updated: string[];
    
    if (masteredIds.includes(currentCard.id)) {
      updated = masteredIds.filter(id => id !== currentCard.id);
    } else {
      updated = [...masteredIds, currentCard.id];
    }
    
    setMasteredIds(updated);
    localStorage.setItem('mastered_flashcards', JSON.stringify(updated));
    
    // Save to DB progress for dashboard metrics
    saveProgressToDB(updated.length);
  };

  const saveProgressToDB = async (count: number) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'flashcards_mastered',
          value: count
        })
      });
    } catch (e) {
      console.warn('Progress save failed:', e);
    }
  };

  const activeCard = flashcards[currentIndex];
  const isMastered = activeCard ? masteredIds.includes(activeCard.id) : false;
  const masteredCountForSubject = flashcards.filter(c => masteredIds.includes(c.id)).length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* 3D card style overrides */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="max-w-3xl mx-auto w-full space-y-6 flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Concept Flashcards
          </h1>
          <p className="text-sm text-slate-400 mt-1">Review active-recall cards, formulas, and concepts to build exam speed</p>
        </div>

        {/* Subjects list */}
        <div className="flex flex-wrap gap-2 py-1 justify-center">
          {SUBJECTS.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubject(sub)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                (sub === 'All' && subject === 'All') || (subject === sub)
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-550/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {sub === 'All' ? 'All Subjects' : sub.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Loading / Empty State */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        ) : flashcards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-slate-900/20 border border-slate-800 rounded-2xl p-6">
            <span className="text-4xl mb-4">🎴</span>
            <h3 className="text-lg font-bold">No cards available</h3>
            <p className="text-sm text-slate-500 mt-1">No flashcards found for this subject filter.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-6 space-y-8">
            {/* Progress indicator */}
            <div className="text-xs text-slate-400 flex items-center gap-4 bg-slate-900/50 border border-slate-800 px-4 py-1.5 rounded-full shadow-sm">
              <span>Card {currentIndex + 1} of {flashcards.length}</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400 font-semibold">{masteredCountForSubject} / {flashcards.length} Mastered</span>
            </div>

            {/* Flashcard container */}
            <div 
              onClick={handleFlip}
              className="w-full max-w-md h-72 perspective-1000 cursor-pointer group"
            >
              <div 
                className={`w-full h-full relative transform-style-3d transition-transform duration-500 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xl backface-hidden group-hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{activeCard.subject}</span>
                    <span className={`px-2 py-0.5 rounded ${
                      activeCard.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      activeCard.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {activeCard.difficulty}
                    </span>
                  </div>

                  <div className="text-center font-semibold text-lg text-slate-100 px-4 flex-1 flex items-center justify-center leading-relaxed">
                    {activeCard.front}
                  </div>

                  <div className="text-center text-xs text-slate-500 select-none animate-pulse">
                    Click card to reveal answer
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xl backface-hidden rotate-y-180 group-hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-center justify-between text-xs text-indigo-400 font-medium">
                    <span>Answer & Explanation</span>
                    {isMastered && (
                      <span className="bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                        ✓ Mastered
                      </span>
                    )}
                  </div>

                  <div className="text-center text-slate-200 text-sm md:text-base leading-relaxed px-2 flex-1 flex items-center justify-center">
                    {activeCard.back}
                  </div>

                  <div className="text-center text-xs text-slate-500 select-none">
                    Click card to view question
                  </div>
                </div>
              </div>
            </div>

            {/* Actions panel */}
            <div className="flex items-center justify-center gap-4 w-full max-w-md">
              <button
                onClick={handlePrev}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 w-11 h-11 rounded-xl flex items-center justify-center hover:text-white transition-all shadow-md cursor-pointer"
                title="Previous Card"
              >
                ◀
              </button>

              <button
                onClick={handleToggleMastered}
                className={`flex-1 font-semibold text-xs py-3 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg ${
                  isMastered
                    ? 'bg-indigo-650/10 border-indigo-500/25 text-indigo-400 hover:bg-slate-900/50'
                    : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow-indigo-500/10'
                }`}
              >
                <span>{isMastered ? 'Remove from Mastered' : 'Mark as Mastered'}</span>
                <span>{isMastered ? '✖' : '✓'}</span>
              </button>

              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 w-11 h-11 rounded-xl flex items-center justify-center hover:text-white transition-all shadow-md cursor-pointer"
                title="Next Card"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
