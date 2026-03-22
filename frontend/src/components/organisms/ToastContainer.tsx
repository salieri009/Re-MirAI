'use client';

import React, { useEffect, useState, CSSProperties } from 'react';
import { subscribeToToasts, removeToast, type Toast } from '@/lib/toast';

const containerStyle: CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  zIndex: 9999,
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  pointerEvents: 'none',
};

const toastStyle = (type: string): CSSProperties => {
  const baseStyle: CSSProperties = {
    padding: '1rem 1.25rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    animation: 'slideIn 0.3s ease-out',
    pointerEvents: 'auto',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const typeStyles = {
    success: {
      ...baseStyle,
      backgroundColor: '#10b981',
      color: 'white',
    },
    error: {
      ...baseStyle,
      backgroundColor: '#ef4444',
      color: 'white',
    },
    warning: {
      ...baseStyle,
      backgroundColor: '#f59e0b',
      color: 'white',
    },
    info: {
      ...baseStyle,
      backgroundColor: '#3b82f6',
      color: 'white',
    },
  };

  return typeStyles[type as keyof typeof typeStyles] || baseStyle;
};

const iconStyle: CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  minWidth: '1.25rem',
};

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const keyframesStyle = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts(setToasts);
    return unsubscribe;
  }, []);

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyle}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={toastStyle(t.type)}
            onClick={() => removeToast(t.id)}
            title="Click to dismiss"
          >
            <span style={iconStyle}>{icons[t.type as keyof typeof icons]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ToastContainer;
