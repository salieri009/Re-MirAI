'use client';

import { useEffect, useRef } from 'react';

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  accent?: boolean;
  ariaLabel?: string;
  className?: string;
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  accent = false,
  ariaLabel,
  className,
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const clamped = Math.max(0, Math.min(100, value));

  useEffect(() => {
    if (!fillRef.current) return;
    fillRef.current.style.width = `${clamped}%`;
  }, [clamped]);

  return (
    <div className={`flex w-full flex-col gap-1 ${className ?? ''}`.trim()}>
      {label ? (
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>{label}</span>
          {showValue ? <span>{clamped}%</span> : null}
        </div>
      ) : null}

      <div
        className="h-2 w-full overflow-hidden rounded-pill bg-surface"
        role="progressbar"
        aria-label={ariaLabel ?? label}
      >
        <div
          ref={fillRef}
          className={`h-full w-0 rounded-pill transition-[width] duration-300 ${accent ? 'bg-gradient-to-r from-accent to-accent-light' : 'bg-gradient-to-r from-primary to-highlight'}`}
        />
      </div>
    </div>
  );
}
