'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, typography, CSSProperties } from '@/lib/styles';

interface TypingIndicatorProps {
  personaName?: string;
  estimatedTime?: number;
}

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.sm}px ${spacing.md}px`,
  background: colors.surface,
  borderRadius: 16,
  width: 'fit-content',
};

const dotsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

const dotStyle: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: colors.highlight,
  opacity: 0.6,
};

const textStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
};

const timeStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  opacity: 0.7,
};

export function TypingIndicator({ personaName = 'AI', estimatedTime }: TypingIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    connectionInteractions.typingIndicator(containerRef.current);
  }, [reducedMotion]);

  return (
    <div ref={containerRef} style={containerStyle} aria-live="polite" role="status">
      <div style={dotsStyle}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="dot" style={dotStyle} />
        ))}
      </div>
      <span style={textStyle}>
        {personaName} is typing...
      </span>
      {estimatedTime && (
        <span style={timeStyle}>
          ~{estimatedTime}s
        </span>
      )}
    </div>
  );
}
