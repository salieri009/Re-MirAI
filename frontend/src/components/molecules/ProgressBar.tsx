import React, { useEffect, useRef } from 'react';
import { guidanceInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Estimate time remaining (assume 30s per question)
  const questionsLeft = Math.max(0, total - current);
  const estimatedMinutes = Math.ceil((questionsLeft * 30) / 60);

  useEffect(() => {
    if (reducedMotion || !barRef.current) return;

    guidanceInteractions.progressShimmer(barRef.current);
  }, [reducedMotion, current]);

  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.container}>
        <div
          ref={barRef}
          className={styles.bar}
          style={{ width: `${percentage}%` }}
        />
        <span className={styles.text}>
          {current} / {total}
        </span>
      </div>
      {questionsLeft > 0 && (
        <div className={styles.timeEstimate}>
          ⏱️ ~{estimatedMinutes} min remaining
        </div>
      )}
    </div>
  );
}




