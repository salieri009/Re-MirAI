'use client';

import { motion } from 'framer-motion';
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
          <motion.span
            key={i}
            className={styles.dot}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
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

