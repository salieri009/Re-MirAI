import React from 'react';

type CardVariant = 'default' | 'elevated' | 'glass' | 'interactive';
type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
}

const baseClass = 'rounded-2xl border transition';

const variantClasses: Record<CardVariant, string> = {
  default: 'border-slate-500/20 bg-white/70 shadow-sm',
  elevated: 'border-slate-500/20 bg-white/85 shadow-[0_14px_28px_-16px_rgba(51,65,85,0.35)]',
  glass: 'border-slate-500/20 bg-white/60 backdrop-blur-md',
  interactive:
    'border-slate-500/20 bg-white/70 shadow-sm hover:-translate-y-0.5 hover:border-fuchsia-500/35 hover:shadow-[0_14px_28px_-16px_rgba(217,70,239,0.55)]',
};

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-7',
};

export function Card({ variant = 'default', padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div className={`${baseClass} ${variantClasses[variant]} ${paddingClasses[padding]} ${className ?? ''}`.trim()} {...props}>
      {children}
    </div>
  );
}
