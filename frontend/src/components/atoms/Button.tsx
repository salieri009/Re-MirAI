'use client';

import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const baseClass = 'relative inline-flex items-center justify-center gap-1 rounded-md border-0 font-display font-semibold transition-all duration-200';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md',
  secondary: 'bg-highlight text-white hover:-translate-y-0.5 hover:bg-text-secondary hover:shadow-md',
  accent: 'border border-slate-700/25 bg-accent text-highlight hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-glow-accent',
  ghost: 'border border-highlight bg-transparent text-highlight hover:bg-accent/30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-6 py-4 text-base',
  lg: 'px-8 py-6 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    disabled,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed opacity-50 hover:translate-y-0 hover:shadow-none' : ''} ${className ?? ''}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
