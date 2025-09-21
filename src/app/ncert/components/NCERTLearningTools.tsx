'use client';

import { LearningToolsProvider, AITutorChat } from '@/components/learning-tools';

// Create a wrapper component that safely renders the learning tools
export function NCERTLearningTools({ 
  chapterTitle, 
  chapterContent, 
  classNumber, 
  subjectCode, 
  chapterNumber 
}: { 
  chapterTitle: string;
  chapterContent: string;
  classNumber: number;
  subjectCode: string;
  chapterNumber: number;
}) {
  return (
    <LearningToolsProvider 
      questionRef={`chapter-${chapterNumber}`} 
      initialText=""
    >
      <AITutorChat />
    </LearningToolsProvider>
  );
}