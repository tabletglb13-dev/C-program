/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  Code, 
  Lightbulb, 
  Cpu, 
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { chapters, Chapter } from './data/chapters';

const CodeBlock = ({ title, code, language }: { title: string; code: string; language: string }) => {
  return (
    <div className="my-8 overflow-hidden rounded-xl bg-brand-code shadow-2xl border border-white/10 relative">
      <div className="absolute top-0 right-0 p-3 flex gap-2 z-10">
        <div className="w-2 h-2 rounded-full bg-red-500/30" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
        <div className="w-2 h-2 rounded-full bg-green-500/30" />
      </div>
      <div className="flex items-center bg-white/5 px-4 py-2 border-b border-white/5">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
          {title}
        </span>
      </div>
      <pre className="p-8 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
        <code className="block">
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-gray-700 select-none w-4 inline-block">{(i + 1).toString().padStart(2, '0')}</span>
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [readProgress, setReadProgress] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('c-textbook-progress-v2');
    return saved ? JSON.parse(saved) : {};
  });

  const activeChapter = useMemo(() => 
    chapters.find(c => c.id === activeChapterId) || chapters[0]
  , [activeChapterId]);

  const activeIndex = chapters.findIndex(c => c.id === activeChapterId);

  useEffect(() => {
    localStorage.setItem('c-textbook-progress-v2', JSON.stringify(readProgress));
  }, [readProgress]);

  const markAsRead = (id: string) => {
    setReadProgress(prev => ({ ...prev, [id]: true }));
  };

  const progressPercentage = (Object.keys(readProgress).length / chapters.length) * 100;

  return (
    <div className="flex min-h-screen bg-brand-bg text-gray-300 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-brand-sidebar border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
                C
              </div>
              <span className="text-sm font-semibold tracking-widest text-white uppercase">Mastering C</span>
            </div>
            
            <nav className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">Table of Contents</div>
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    setIsSidebarOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-sm transition-all text-left
                    ${activeChapterId === chapter.id 
                      ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-600 font-medium' 
                      : 'text-gray-500 hover:text-gray-300'}
                  `}
                >
                  <span className="truncate">
                    {(index + 1).toString().padStart(2, '0')}. {chapter.title.split(': ')[1]}
                  </span>
                  {readProgress[chapter.id] && (
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-white/5">
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progress</span>
                <span className="text-[11px] font-mono text-blue-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 mt-4">
                <span>STABLE_RELD</span>
                <span className="text-blue-900">●</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-brand-bg">
        {/* Header Bar */}
        <header className="h-16 px-6 lg:px-10 border-b border-white/5 flex items-center justify-between sticky top-0 z-30 bg-brand-bg/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex gap-3 items-center text-[11px] uppercase tracking-widest text-gray-500">
              <span>Chapter {(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span className="opacity-20">/</span>
              <span className="text-gray-300 font-medium truncate max-w-[150px]">
                {activeChapter.title.split(': ')[1]}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex h-8 w-10 sm:w-32 bg-white/5 border border-white/5 rounded-lg px-3 items-center gap-2 group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-3 h-3 border border-gray-600 rounded-full group-hover:border-blue-500 transition-colors" />
              <span className="hidden sm:inline text-[11px] text-gray-500">Search...</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12 lg:py-20 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeChapterId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <header className="mb-12">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
                    Course Module
                  </div>
                  <h1 className="text-5xl font-light text-white mb-6 leading-tight italic font-serif">
                    {activeChapter.title.split(': ')[1]}
                    <br/>
                    <span className="text-blue-500 not-italic font-sans font-black tracking-tighter uppercase text-4xl block mt-2">
                       Foundation Mechanics
                    </span>
                  </h1>
                  <div className="h-1 w-12 bg-blue-600 rounded-full" />
                </header>

                <div className="prose prose-invert max-w-none mb-12">
                  <div className="text-lg leading-relaxed text-gray-400 whitespace-pre-wrap">
                    {activeChapter.content}
                  </div>
                </div>

                {activeChapter.codeSnippets?.map((snippet, idx) => (
                  <CodeBlock key={idx} {...snippet} />
                ))}

                {activeChapter.insights && activeChapter.insights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                    {activeChapter.insights.map((insight, idx) => (
                      <div key={idx} className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-6 relative group hover:bg-blue-600/10 transition-colors">
                        <div className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-3 flex items-center gap-2">
                          <Lightbulb size={12} />
                          Mechanics Insight
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed italic">{insight}</p>
                      </div>
                    ))}
                  </div>
                )}

                <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                  {!readProgress[activeChapterId] ? (
                    <button
                      onClick={() => markAsRead(activeChapterId)}
                      className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-2xl shadow-blue-900/20 transition-all active:scale-95"
                    >
                      <CheckCircle2 size={16} />
                      Commit Progress
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 text-emerald-500 text-[11px] uppercase tracking-widest font-bold">
                      <CheckCircle2 size={18} />
                      Section Completed
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    {activeIndex < chapters.length - 1 && (
                      <button 
                        onClick={() => {
                          setActiveChapterId(chapters[activeIndex + 1].id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest font-bold transition-all group"
                      >
                        Next Section
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-blue-500" />
                      </button>
                    )}
                  </div>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Page Footer Statistics */}
        <footer className="h-12 px-10 bg-brand-footer border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-600 uppercase tracking-tighter shrink-0">
          <div className="flex gap-6">
             <span className="hidden sm:inline">Module {(activeIndex + 1).toString().padStart(2, '0')}</span>
             <span className="text-blue-900">|</span>
             <span>Comp_Level: {activeIndex < 4 ? 'Basic' : activeIndex < 8 ? 'Intermediate' : 'Advanced'}</span>
          </div>
          <div>
            Step <span className="text-gray-400">{activeIndex + 1}</span> of {chapters.length}
          </div>
        </footer>
      </main>
    </div>
  );
}
