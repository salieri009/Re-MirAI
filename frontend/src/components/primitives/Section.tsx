import React from 'react';

type SectionAs = 'section' | 'div' | 'main' | 'aside';
type SectionWidth = 'narrow' | 'default' | 'wide' | 'full';
type SectionSpacing = 'sm' | 'md' | 'lg';
type SectionSurface = 'none' | 'card';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: SectionAs;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  surface?: SectionSurface;
  children: React.ReactNode;
}

const widthClasses: Record<SectionWidth, string> = {
  narrow: 'mx-auto max-w-3xl',
  default: 'mx-auto max-w-5xl',
  wide: 'mx-auto max-w-7xl',
  full: 'w-full',
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'px-4 py-4 sm:px-5 sm:py-5',
  md: 'px-5 py-5 sm:px-6 sm:py-6',
  lg: 'px-6 py-6 sm:px-8 sm:py-8',
};

const surfaceClasses: Record<SectionSurface, string> = {
  none: '',
  card: 'atmospheric-surface',
};

export function Section({
  as = 'section',
  width = 'default',
  spacing = 'md',
  surface = 'none',
  className,
  children,
  ...props
}: SectionProps) {
  const Component = as;

  return (
    <Component
      className={`${widthClasses[width]} ${spacingClasses[spacing]} ${surfaceClasses[surface]} ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
