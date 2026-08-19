"use client";

import { useState, useEffect, useRef } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function ChatPage() {
  const [question, setQuestion] = useState('');
  const [model, setModel] = useState('deepseek-free');
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
    sources?: Array<{title: string; subject: string; path: string}>;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync preferred model from localStorage
  useEffect(() => {
    const savedModel = localStorage.getItem('preferred_model');
    if (savedModel) {
      setModel(savedModel);
    }
  }, []);

  // Initialize unique browser session ID and load session chat history
  useEffect(() => {
    let sid = '';
    try {
      sid = localStorage.getItem('abhyas_session_id') || '';
      if (!sid) {
        sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem('abhyas_session_id', sid);
      }
    } catch (e) {
      sid = 'sess_' + Date.now();
    }
    setSessionId(sid);

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/chat?sessionId=${encodeURIComponent(sid)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.history && data.history.length > 0) {
            setMessages(data.history);
          }
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };
    fetchHistory();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    const userQuestion = question;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
    setQuestion('');
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, model, sessionId, history: messages }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: data.response,
          sources: data.sources
        }]);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `❌ Sorry, I encountered an error: ${error.message}. Please try again.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      const newSid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('abhyas_session_id', newSid);
      setSessionId(newSid);
    } catch (e) {}
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Study Tutor
          </h1>
          <p className="text-sm text-slate-400 mt-1">Source-verified exam prep powered by your study guide database</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-xs font-semibold text-slate-400">Model:</span>
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                localStorage.setItem('preferred_model', e.target.value);
              }}
              className="bg-transparent border-none text-sm text-indigo-400 font-medium focus:outline-none cursor-pointer"
            >
              <option value="deepseek-v4-flash-free" className="bg-slate-950 text-slate-100">Tier 1: DeepSeek v4 Flash (OpenCode)</option>
              <option value="mimo-v2.5-free" className="bg-slate-950 text-slate-100">Tier 1: Mimo v2.5 Free (OpenCode)</option>
              <option value="gemini-2.5-flash" className="bg-slate-950 text-slate-100">Tier 2: Google Gemini 2.5 Flash API</option>
            </select>
          </div>
          
          <button
            onClick={handleClearHistory}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors border border-slate-800 rounded-lg px-2.5 py-1.5"
            title="Clear UI display logs"
          >
            Clear View
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto py-20">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl mb-4 shadow-lg animate-pulse">
              💬
            </div>
            <h3 className="text-lg font-bold text-slate-300">Ready to Assist</h3>
            <p className="text-sm text-slate-500 mt-2">
              Ask me specific questions, requesting formulas, proofs, historical dates, or competitive exam shortcuts. I will look up answers from your uploaded study materials.
            </p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] rounded-2xl p-4 shadow-md transition-all ${
              msg.role === 'user'
                ? 'bg-blue-600/10 border border-blue-500/20 ml-auto'
                : 'bg-slate-900/60 border border-slate-800 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800/40 text-xs">
              <span className={`font-bold ${msg.role === 'user' ? 'text-blue-400' : 'text-indigo-400'}`}>
                {msg.role === 'user' ? 'You' : 'AI Tutor'}
              </span>
              <span className="text-slate-600">
                {msg.role === 'user' ? 'User Question' : 'Source Verified'}
              </span>
            </div>
            
            <div className="w-full text-slate-200 leading-relaxed">
              <MarkdownRenderer content={msg.content} />
            </div>
            
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-3 pt-2 border-t border-slate-800/30 text-xs">
                <div className="font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  📚 Cited Sources:
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {msg.sources.map((source, i) => (
                    <span
                      key={i}
                      className="bg-slate-805/80 border border-slate-700/50 text-indigo-300 px-2 py-0.5 rounded text-[10px] shadow-sm font-medium"
                      title={source.path}
                    >
                      {source.title.replace('Chapter ', 'Ch.')} ({source.subject})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex flex-col max-w-[85%] rounded-2xl p-4 bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-bold text-indigo-400">AI Tutor</span>
              <span className="text-slate-600 animate-pulse">Running RAG Query...</span>
            </div>
            <div className="flex items-center gap-1.5 py-2">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <div className="flex items-center bg-slate-900 border border-slate-800 focus-within:border-indigo-500/50 rounded-xl p-2 shadow-2xl transition-all">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about syllabus, formulas, or concepts..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Ask Tutor</span>
            <span>⚡</span>
          </button>
        </div>
      </form>
    </div>
  );
}