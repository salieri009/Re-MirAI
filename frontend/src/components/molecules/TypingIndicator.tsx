'use client';

import styles from './TypingIndicator.module.css';

interface TypingIndicatorProps {
  personaName?: string;
  estimatedTime?: number;
}

export function TypingIndicator({ personaName = 'AI', estimatedTime }: TypingIndicatorProps) {
  return (
    <div className={styles.container} aria-live="polite" role="status">
      <div className={styles.dots}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={styles.dot}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className={styles.text}>
        {personaName} is typing...
      </span>
      {estimatedTime && (
        <span className={styles.time}>
          Estimated {estimatedTime}s
        </span>
      )}
    </div>
  );
}

