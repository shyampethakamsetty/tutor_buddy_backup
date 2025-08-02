"use client"

import { ReactNode } from 'react';

export default function TutorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
        {children}
    </div>
  );
} 