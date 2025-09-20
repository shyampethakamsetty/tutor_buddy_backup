"use client"

import { ReactNode } from 'react';
import CollapsibleSidebar from '@/components/collapsible-sidebar';
import { LearningToolsProvider, ToolsLauncher, AITutorChat, SnapSolve } from '@/components/learning-tools';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <LearningToolsProvider questionRef="student-layout" initialText="">
      <CollapsibleSidebar>
        {children}
      </CollapsibleSidebar>
      <ToolsLauncher />
      <AITutorChat />
      <SnapSolve />
    </LearningToolsProvider>
  );
} 