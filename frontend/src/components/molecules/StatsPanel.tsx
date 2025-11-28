'use client';

import { PersonaStats } from '@/lib/mock-data/personas';
import styles from './StatsPanel.module.css';

interface StatsPanelProps {
  stats: PersonaStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const entries = Object.entries(stats);

  return (
    <div className={styles.grid}>
      {entries.map(([key, value]) => (
        <div key={key} className={styles.card}>
          <p className={styles.label}>{formatLabel(key)}</p>
          <div className={styles.valueRow}>
            <span className={styles.value}>{value}</span>
            <span className={styles.unit}>/100</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${Math.min(value, 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatLabel(label: string) {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

