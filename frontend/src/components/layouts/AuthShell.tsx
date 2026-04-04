import React from 'react';

interface AuthShellProps {
  visual: React.ReactNode;
  form: React.ReactNode;
}

export function AuthShell({ visual, form }: AuthShellProps) {
  return (
    <main className="relative min-h-screen bg-background-dark text-text-primary">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative hidden overflow-hidden border-r border-slate-700/20 lg:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-200/20 to-transparent" />
          <div className="relative z-10 flex h-full flex-col p-10 xl:p-14">{visual}</div>
        </section>

        <section className="relative flex items-center px-5 py-10 sm:px-8 lg:px-10 xl:px-14">
          <div className="auth-shell-overlay absolute inset-0" />
          <div className="relative z-10 w-full">{form}</div>
        </section>
      </div>
    </main>
  );
}
