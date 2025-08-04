"use client"

import { ReactNode } from 'react';
import CollapsibleSidebar from '@/components/collapsible-sidebar';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <CollapsibleSidebar>
      {children}
    </CollapsibleSidebar>
  );
} 