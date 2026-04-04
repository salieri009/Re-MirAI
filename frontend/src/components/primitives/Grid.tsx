import React from 'react';

type GridCols = '1' | '2' | '3' | 'dashboard';
type GridGap = 'sm' | 'md' | 'lg';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  gap?: GridGap;
  children: React.ReactNode;
}

const colsClasses: Record<GridCols, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  dashboard: 'grid-cols-1 xl:grid-cols-[1.15fr_0.85fr]',
};

const gapClasses: Record<GridGap, string> = {
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-6',
};

export function Grid({ cols = '1', gap = 'md', className, children, ...props }: GridProps) {
  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]} ${className ?? ''}`.trim()} {...props}>
      {children}
    </div>
  );
}
