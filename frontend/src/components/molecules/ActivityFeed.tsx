'use client';

import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const emptyStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  textAlign: 'center',
  padding: spacing.lg,
};

const listStyle: CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
};

const itemStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing.md,
  padding: spacing.md,
  background: colors.surface,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
};

const titleStyle: CSSProperties = {
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.text,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  margin: 0,
};

const timestampStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  whiteSpace: 'nowrap',
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  if (!items.length) {
    return <p style={emptyStyle}>No recent activity yet.</p>;
  }

  return (
    <ul style={listStyle}>
      {items.map((item) => (
        <li key={item.id} style={itemStyle}>
          <div>
            <p style={titleStyle}>{item.title}</p>
            <p style={subtitleStyle}>{item.subtitle}</p>
          </div>
          <span style={timestampStyle}>{item.timestamp}</span>
        </li>
      ))}
    </ul>
  );
}
