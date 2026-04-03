import React from 'react';
import { NavigationSidebar } from '@/components/organisms/NavigationSidebar';

interface DashboardScaffoldProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardScaffold({ children, title, subtitle }: DashboardScaffoldProps) {
  return (
    <div className="min-h-screen bg-background-dark text-text-primary">
      <NavigationSidebar />
      <main className="md:pl-64">
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-10 pt-7 sm:px-7 lg:px-10">
          <header className="atmospheric-surface mb-6 overflow-hidden px-6 py-6 sm:px-8 sm:py-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Active Session</p>
            <h1 className="font-display text-4xl leading-[0.92] text-slate-800 sm:text-5xl">{title}</h1>
            {subtitle ? <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p> : null}
          </header>

          {children}
        </div>
      </main>
    </div>
  );
}
