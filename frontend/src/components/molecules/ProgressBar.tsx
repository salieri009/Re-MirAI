import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.container}>
        <div
          className={styles.bar}
          style={{ width: `${percentage}%` }}
        />
        <span className={styles.text}>
          {current} / {total}
        </span>
      </div>
    </div>
  );
}




