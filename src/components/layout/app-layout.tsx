'use client';

import dynamic from 'next/dynamic';
import { ReactNode, Suspense } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';

// Dynamically import the SidebarInset to avoid SSR for this component
const SidebarInset = dynamic(
  () =>
    import('@/components/ui/sidebar').then((mod) => ({
      default: mod.SidebarInset,
    })),
  { ssr: false }
);

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}