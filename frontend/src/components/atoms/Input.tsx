'use client';

import React, { forwardRef, useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, onFocus, onBlur, ...props },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <input
        ref={ref}
        className={`${
          'w-full rounded-md border bg-surface px-4 py-4 font-sans text-base text-text-primary outline-none transition-all duration-200'
        } ${
          isFocused
            ? 'border-accent shadow-[0_0_0_3px_rgba(0,201,167,0.2)]'
            : 'border-slate-700/25'
        } ${error ? 'border-red-500' : ''} ${className ?? ''}`.trim()}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});
