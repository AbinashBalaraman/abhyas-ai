"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Normalizes common LLM markdown formatting glitches (e.g. smashed table rows, LaTeX delimiters)
 */
function normalizeMarkdown(text: string): string {
  if (!text) return '';

  let clean = text;

  // 1. Fix crushed/smashed table lines (e.g. "| col1 | col2 | | col3 | col4 |" or "|| col1 |")
  clean = clean.replace(/\|\s*\|\s*([^\n|]+)/g, '|\n| $1');

  // 2. Fix table header separator if glued to rows
  clean = clean.replace(/(\|[^\n]+\|)\s*(\|[-:\s|]+\|)/g, '$1\n$2');
  clean = clean.replace(/(\|[-:\s|]+\|)\s*(\|[^\n]+\|)/g, '$1\n$2');

  // 3. Normalize LaTeX display math \[ ... \] to $$ ... $$ and \( ... \) to $ ... $
  clean = clean.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, '$$\n$1\n$$');
  clean = clean.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, '$$$1$$');

  // 4. Ensure headings have a preceding blank line
  clean = clean.replace(/([^\n])\n(#{1,6}\s+[^\n]+)/g, '$1\n\n$2');

  return clean;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const normalized = normalizeMarkdown(content);

  return (
    <div className={`prose-container ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-slate-800 shadow-lg bg-slate-900/40">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800/90 text-indigo-300 font-semibold text-xs uppercase tracking-wider">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-bold text-slate-200 border-b border-slate-700/80">
              {children}
            </th>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/20">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-800/40 transition-colors">
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-slate-300 text-sm whitespace-normal leading-relaxed">
              {children}
            </td>
          ),

          // Headings
          h1: ({ children }) => (
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-5 mb-3 pb-2 border-b border-slate-800">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg md:text-xl font-bold text-indigo-300 mt-4 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-semibold text-slate-200 mt-3 mb-1.5 flex items-center gap-1.5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm md:text-base font-semibold text-slate-300 mt-2 mb-1">
              {children}
            </h4>
          ),

          // Paragraphs & Text
          p: ({ children }) => (
            <p className="my-2.5 leading-relaxed text-slate-200 text-sm">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-indigo-200 italic">
              {children}
            </em>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-3 pl-5 space-y-1.5 list-disc text-slate-300 text-sm">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 pl-5 space-y-1.5 list-decimal text-slate-300 text-sm font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-slate-200">
              {children}
            </li>
          ),

          // Code
          code: ({ className, children, ...props }: any) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="bg-slate-800/80 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
                <code className="text-xs font-mono text-slate-200 block overflow-x-auto" {...props}>
                  {children}
                </code>
              </div>
            );
          },

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/20 pl-4 py-2 my-3 rounded-r-xl text-slate-300 text-sm italic">
              {children}
            </blockquote>
          ),

          // Horizontal rule
          hr: () => (
            <hr className="my-4 border-slate-800" />
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
