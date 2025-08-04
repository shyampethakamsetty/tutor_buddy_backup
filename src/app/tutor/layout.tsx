"use client"

import { ReactNode } from 'react';
import CollapsibleSidebar from '@/components/collapsible-sidebar';

export default function TutorLayout({ children }: { children: ReactNode }) {
  return (
    <CollapsibleSidebar>
      {children}
    </CollapsibleSidebar>
  );
} 