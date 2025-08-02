import React, { useState } from 'react';
import { useLearningTools } from './LearningToolsProvider';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tools = [
  { id: 'doubtBattle', label: 'Doubt Battles', icon: '🥊', href: '/doubt-battle' },
  { id: 'snapSolve', label: 'Snap & Solve', icon: '📷', href: '/snap-solve' },
  { id: 'magicExplain', label: 'Magic Explain', icon: '✨', href: '/magic-explain' },
  { id: 'whatsappDoubt', label: 'Ask in WhatsApp', icon: '💬', href: '/whatsapp-doubt' },
  { id: 'homeworkHelper', label: 'Homework Helper', icon: '📝', href: '/homework-helper' },
  { id: 'microQuiz', label: 'Micro-Quiz', icon: '❓', href: '/micro-quiz' },
];

export const ToolsLauncher = () => {
  // const { openTool } = useLearningTools(); // Not needed for page navigation
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="fixed right-4 top-1/3 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open Learning Tools"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)' }}
      >
        <Sparkles className="h-7 w-7" />
      </button>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close Learning Tools Drawer"
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 dark:text-white shadow-xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: '-2px 0 24px 0 rgba(0,0,0,0.10)' }}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mt-16 flex flex-col gap-4 px-6">
          {tools.map(tool => (
            <button
              key={tool.id}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left text-base"
              onClick={() => {
                setDrawerOpen(false);
                router.push(tool.href);
              }}
              aria-label={tool.label}
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="font-semibold">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}; 