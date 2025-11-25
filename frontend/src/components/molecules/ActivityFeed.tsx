'use client';

import styles from './ActivityFeed.module.css';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items.length) {
    return <p className={styles.empty}>No recent activity yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.subtitle}>{item.subtitle}</p>
          </div>
          <span className={styles.timestamp}>{item.timestamp}</span>
        </li>
      ))}
    </ul>
  );
}

