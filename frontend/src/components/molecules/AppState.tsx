'use client';

import React from 'react';
import { Button } from '@/components/atoms/Button';

type StateType = 'loading' | 'error' | 'empty' | 'success';

interface AppStateProps {
  type: StateType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const titleTone: Record<StateType, string> = {
  loading: 'text-slate-700',
  error: 'text-rose-700',
  empty: 'text-slate-700',
  success: 'text-emerald-700',
};

const shellTone: Record<StateType, string> = {
  loading: 'border-slate-500/20 bg-white/60',
  error: 'border-rose-500/30 bg-rose-50/75',
  empty: 'border-slate-500/20 bg-white/55',
  success: 'border-emerald-500/30 bg-emerald-50/75',
};

export function AppState({ type, title, description, actionLabel, onAction, className }: AppStateProps) {
  const content = (
    <>
      <p className={`text-sm font-semibold ${titleTone[type]}`}>{title}</p>
      {description ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p> : null}
      {actionLabel && onAction ? (
        <div className="mt-4 flex justify-center">
          <Button variant={type === 'error' ? 'secondary' : 'accent'} size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </>
  );

  if (type === 'error') {
    return (
      <div role="alert" className={`rounded-xl border px-4 py-4 text-center sm:px-5 sm:py-5 ${shellTone[type]} ${className ?? ''}`.trim()}>
        {content}
      </div>
    );
  }

  return (
    <div role="status" className={`rounded-xl border px-4 py-4 text-center sm:px-5 sm:py-5 ${shellTone[type]} ${className ?? ''}`.trim()}>
      {content}
    </div>
  );
}
