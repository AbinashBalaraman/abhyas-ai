"use client";

import { useState, useEffect } from 'react';

interface WeeklyScore {
  week: string;
  score: number;
}

interface UserProgress {
  chaptersRead: number;
  quizzesTaken: number;
  weakAreas: string[];
  completionPercentage: number;
  weeklyProgress: WeeklyScore[];
}

export default function Dashboard() {
  const [progress, setProgress] = useState<UserProgress>({
    chaptersRead: 0,
    quizzesTaken: 0,
    weakAreas: [],
    completionPercentage: 0,
    weeklyProgress: []
  });
  const [newWeakArea, setNewWeakArea] = useState('');
  const [masteredCount, setMasteredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress and flashcard metrics on mount
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/progress');
        if (response.ok) {
          const data = await response.json();
          setProgress(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Load flashcard mastered count from localStorage
    const savedMastered = localStorage.getItem('mastered_flashcards');
    if (savedMastered) {
      try {
        const ids = JSON.parse(savedMastered);
        setMasteredCount(ids.length || 0);
      } catch (e) {
        console.error(e);
      }
    }

    loadDashboardData();
  }, []);

  const handleAddWeakArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeakArea.trim() || progress.weakAreas.includes(newWeakArea.trim())) return;
    
    const updatedAreas = [...progress.weakAreas, newWeakArea.trim()];
    setProgress(prev => ({
      ...prev,
      weakAreas: updatedAreas
    }));
    setNewWeakArea('');

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'weak_areas', value: updatedAreas })
      });
    } catch (error) {
      console.error('Failed to save weak area:', error);
    }
  };

  const handleRemoveWeakArea = async (areaToRemove: string) => {
    const updatedAreas = progress.weakAreas.filter(a => a !== areaToRemove);
    setProgress(prev => ({
      ...prev,
      weakAreas: updatedAreas
    }));

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'weak_areas', value: updatedAreas })
      });
    } catch (error) {
      console.error('Failed to remove weak area:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate SVG dimensions for the weekly progress chart
  const chartHeight = 140;
  const chartWidth = 360;
  const padding = 30;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Your Learning Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time study metrics, syllabus tracking, and active concept gaps</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Chapters Read */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chapters Read</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-blue-400">{progress.chaptersRead}</span>
              <span className="text-xs text-slate-500">out of 87</span>
            </div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (progress.chaptersRead / 87) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Quizzes Taken */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Sets Taken</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-indigo-400">{progress.quizzesTaken}</span>
              <span className="text-xs text-slate-500">sets completed</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-3 flex items-center gap-1">
              <span>🎯 Keep it up to build accuracy</span>
            </div>
          </div>

          {/* Flashcards Mastered */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cards Mastered</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-purple-400">{masteredCount}</span>
              <span className="text-xs text-slate-500">key formulas</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-3 flex items-center gap-1">
              <span>🎴 Master active-recall metrics</span>
            </div>
          </div>

          {/* Completion Percentage */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syllabus Completion</div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-emerald-400">{progress.completionPercentage}%</span>
              <span className="text-xs text-slate-500">overall</span>
            </div>
            <div className="w-full bg-slate-850 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progress.completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lower Dashboard panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress Chart */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="font-bold text-lg text-slate-200 flex items-center gap-2">
              <span>📈</span> Weekly Accuracy Scores
            </h2>
            
            <div className="flex items-center justify-center p-2 bg-slate-950/40 rounded-xl border border-slate-800/50">
              {progress.weeklyProgress.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
                  No weekly activity recorded.
                </div>
              ) : (
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#334155" strokeWidth="1" />
                  <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#1e293b" strokeDasharray="3,3" strokeWidth="1" />
                  
                  {/* Chart Line Path */}
                  {(() => {
                    const points = progress.weeklyProgress.map((p, i) => {
                      const x = padding + (i * (chartWidth - 2 * padding)) / (progress.weeklyProgress.length - 1);
                      // scale score (0-100) to fit height
                      const y = chartHeight - padding - (p.score / 100) * (chartHeight - 2 * padding);
                      return { x, y };
                    });

                    const dPath = points.reduce((acc, p, i) => {
                      return acc + `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                    }, '');

                    return (
                      <>
                        {/* Area fill */}
                        <path
                          d={`${dPath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
                          fill="url(#chartGradient)"
                          opacity="0.15"
                        />
                        {/* Main line */}
                        <path d={dPath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Data dots & Labels */}
                        {points.map((p, i) => (
                          <g key={i}>
                            <circle cx={p.x} cy={p.y} r="5" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
                            <text x={p.x} y={p.y - 10} fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                              {progress.weeklyProgress[i].score}%
                            </text>
                            <text x={p.x} y={chartHeight - 10} fill="#64748b" fontSize="9" fontWeight="medium" textAnchor="middle">
                              {progress.weeklyProgress[i].week}
                            </text>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
            <p className="text-[10px] text-slate-500 text-center">Chart displays average mock test percentages aggregated weekly</p>
          </div>

          {/* Weak Areas Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between space-y-4">
            <div>
              <h2 className="font-bold text-lg text-slate-200 flex items-center gap-2 mb-1">
                <span>⚠️</span> Active Gaps & Weak Areas
              </h2>
              <p className="text-xs text-slate-500">Add topics you struggle with. These will automatically prioritize chapters and adjust study plans.</p>
            </div>

            {/* List */}
            <div className="flex-1 min-h-24 max-h-40 overflow-y-auto space-y-1.5 pr-1 py-1">
              {progress.weakAreas.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-6">
                  No active concept gaps defined! Everything is green.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {progress.weakAreas.map((area, index) => (
                    <span 
                      key={index} 
                      className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{area}</span>
                      <button 
                        onClick={() => handleRemoveWeakArea(area)}
                        className="text-rose-500 hover:text-rose-300 transition-colors font-bold select-none cursor-pointer"
                        title="Remove gap"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Add box */}
            <form onSubmit={handleAddWeakArea} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Percentage Shortcuts, Modern History"
                value={newWeakArea}
                onChange={(e) => setNewWeakArea(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!newWeakArea.trim()}
                className="bg-indigo-650 hover:bg-indigo-600 disabled:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Add Gap
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}