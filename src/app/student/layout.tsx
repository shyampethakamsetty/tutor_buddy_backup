"use client"

import { ReactNode } from 'react';
import { LearningToolsProvider, ToolsLauncher, AITutorChat, SnapSolve } from '@/components/learning-tools';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <LearningToolsProvider questionRef="student-layout" initialText="">
      {children}
      <ToolsLauncher />
      <AITutorChat />
      <SnapSolve />
    </LearningToolsProvider>
  );
} 