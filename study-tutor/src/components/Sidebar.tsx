"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/chat', icon: '💬', label: 'Chat Tutor' },
  { href: '/chapters', icon: '📚', label: 'Chapter Browser' },
  { href: '/study-plan', icon: '📅', label: 'Study Plan' },
  { href: '/flashcards', icon: '🎴', label: 'Flashcards' },
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
];

export default function Sidebar() {
  const [model, setModel] = useState('deepseek-free');
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('preferred_model');
    if (saved) {
      setModel(saved);
    }
  }, []);

  const handleModelChange = (val: string) => {
    setModel(val);
    localStorage.setItem('preferred_model', val);
    window.dispatchEvent(new Event('modelChanged'));
  };

  return (
    <div className="w-64 bg-slate-900/90 border-r border-slate-800/80 p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
            🎓
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
            Abhyas AI Tutor
          </h1>
        </div>
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-indigo-600/15 text-white shadow-inner border border-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:shadow-inner border border-transparent'
                }`}
              >
                <span className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
                  {item.icon}
                </span> 
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Global Model Selection in Sidebar */}
      <div className="space-y-4">
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 space-y-1.5 shadow-inner">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Preferred AI Model
          </label>
          <select
            value={model}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-indigo-400 font-medium focus:outline-none cursor-pointer"
          >
            <option value="deepseek-free" className="bg-slate-950 text-slate-100">OpenCode Flash (DeepSeek)</option>
            <option value="gemini" className="bg-slate-950 text-slate-100">Google Gemini 2.5 Flash</option>
            <option value="mimo-free" className="bg-slate-950 text-slate-100">Mimo v2.5 Free</option>
            <option value="ollama" className="bg-slate-950 text-slate-100">Local Ollama (Qwen 2.5)</option>
            <option value="mistral" className="bg-slate-950 text-slate-100">Mistral Large (Fallback)</option>
          </select>
        </div>

        <div className="border-t border-slate-800/60 pt-3 text-[10px] text-slate-600 px-2 space-y-0.5">
          <p>Multi-LLM RAG Engine: Active</p>
          <p>Next.js 16 + React 19 v2.0.0</p>
        </div>
      </div>
    </div>
  );
}
