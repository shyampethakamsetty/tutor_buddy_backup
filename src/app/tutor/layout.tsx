"use client"

import { ReactNode } from 'react';
import { LearningToolsProvider, ToolsLauncher, AITutorChat, SnapSolve } from '@/components/learning-tools';

export default function TutorLayout({ children }: { children: ReactNode }) {
  return (
    <LearningToolsProvider questionRef="tutor-layout" initialText="">
      {children}
      <ToolsLauncher />
      <AITutorChat />
      <SnapSolve />
    </LearningToolsProvider>
  );
} 