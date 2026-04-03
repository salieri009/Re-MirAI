'use client';

import React, { useEffect, useState } from 'react';
import { subscribeToToasts, removeToast, type Toast } from '@/lib/toast';

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

function getToastClass(type: string): string {
  if (type === 'success') return 'bg-emerald-500 text-white';
  if (type === 'error') return 'bg-red-500 text-white';
  if (type === 'warning') return 'bg-amber-500 text-white';
  if (type === 'info') return 'bg-blue-500 text-white';
  return 'bg-slate-700 text-white';
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts(setToasts);
    return unsubscribe;
  }, []);

  return (
      <div className="toast-stack pointer-events-none fixed bottom-8 right-8 z-[9999] flex w-full max-w-[400px] flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex cursor-pointer items-center gap-3 rounded-lg px-5 py-4 text-[0.95rem] font-medium shadow-lg transition-all duration-200 ${getToastClass(t.type)}`}
            onClick={() => removeToast(t.id)}
            title="Click to dismiss"
          >
            <span className="min-w-5 text-xl font-bold">{icons[t.type as keyof typeof icons]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
  );
}

export default ToastContainer;
