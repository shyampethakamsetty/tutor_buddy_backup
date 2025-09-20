"use client"

import { ReactNode } from 'react';
import CollapsibleSidebar from '@/components/collapsible-sidebar';
import { LearningToolsProvider, ToolsLauncher, AITutorChat, SnapSolve } from '@/components/learning-tools';

export default function TutorLayout({ children }: { children: ReactNode }) {
  return (
    <LearningToolsProvider questionRef="tutor-layout" initialText="">
      <CollapsibleSidebar>
        {children}
      </CollapsibleSidebar>
      <ToolsLauncher />
      <AITutorChat />
      <SnapSolve />
    </LearningToolsProvider>
  );
} 