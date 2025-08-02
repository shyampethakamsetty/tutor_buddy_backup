"use client"

import { ReactNode } from 'react';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
        {children}
    </div>
  );
} 