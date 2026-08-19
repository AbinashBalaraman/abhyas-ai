"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function StudyPlanGenerator() {
  const [examType, setExamType] = useState('');
  const [weakAreas, setWeakAreas] = useState('');
  const [model, setModel] = useState('gemini');
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!examType) return;
    
    setIsLoading(true);
    setPlan('');
    try {
      const response = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examType, weakAreas, model }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setPlan(data.plan);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (error: any) {
      setPlan(`❌ Failed to generate study plan: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Personalized Study Planner
          </h1>
          <p className="text-sm text-slate-400 mt-1">Generate a highly structured 4-week learning roadmap customized to your weak areas</p>
        </div>
        
        {/* Input Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Exam Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Exam Target</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="">Select Exam</option>
                <option value="SSC CGL">SSC CGL</option>
                <option value="RRB NTPC">RRB NTPC</option>
                <option value="IBPS PO">IBPS PO</option>
                <option value="SBI PO">SBI PO</option>
                <option value="UPSC CSE">UPSC Prelims</option>
                <option value="LIC AAO">Insurance (LIC AAO)</option>
              </select>
            </div>

            {/* Model Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Generator Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="gemini">Google Gemini 2.5 Flash</option>
                <option value="deepseek-free">DeepSeek v4 Flash Free</option>
                <option value="mimo-free">Mimo v2.5 Free</option>
                <option value="ollama">Local Ollama (Qwen 2.5)</option>
                <option value="mistral">Mistral Large (Fallback)</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !examType}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-semibold text-sm h-[42px] rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Generating Plan...</span>
                  </>
                ) : (
                  <>
                    <span>Create Roadmap</span>
                    <span>📅</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Weak Areas Input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Focus / Weak Topics (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Algebra, Syllogism, Reading Comprehension, Indian Polity, RBI Circulars"
              value={weakAreas}
              onChange={(e) => setWeakAreas(e.target.value)}
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        
        {/* Output Roadmap Panel */}
        {plan && (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
              <h2 className="font-bold text-lg text-slate-200 flex items-center gap-1.5">
                <span>📋</span> Your 4-Week Custom Roadmap
              </h2>
              <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">
                Generated with {model.toUpperCase()}
              </span>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none text-slate-350 leading-relaxed space-y-4">
              <ReactMarkdown>{plan}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}