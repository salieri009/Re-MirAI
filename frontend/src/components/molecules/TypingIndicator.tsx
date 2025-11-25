'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './TypingIndicator.module.css';

interface TypingIndicatorProps {
  personaName?: string;
  estimatedTime?: number;
}

export function TypingIndicator({ personaName = 'AI', estimatedTime }: TypingIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    connectionInteractions.typingIndicator(containerRef.current);
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={styles.container} aria-live="polite" role="status">
      <div className={styles.dots}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`${styles.dot} dot`} />
        ))}
      </div>
      <span className={styles.text}>
        {personaName} is typing...
      </span>
      {estimatedTime && (
        <span className={styles.time}>
          ~{estimatedTime}s
        </span>
      )}
    </div>
  );
}

