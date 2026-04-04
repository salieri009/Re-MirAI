import React from 'react';

type Direction = 'row' | 'col';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around';
type Gap = 'xs' | 'sm' | 'md' | 'lg';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  gap?: Gap;
  wrap?: boolean;
  children: React.ReactNode;
}

const directionClasses: Record<Direction, string> = {
  row: 'flex-row',
  col: 'flex-col',
};

const alignClasses: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const gapClasses: Record<Gap, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
};

export function Flex({
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className,
  children,
  ...props
}: FlexProps) {
  return (
    <div
      className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${
        wrap ? 'flex-wrap' : ''
      } ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
