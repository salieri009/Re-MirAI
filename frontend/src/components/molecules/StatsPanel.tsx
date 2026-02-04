'use client';

import { PersonaStats } from '@/lib/api/persona';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

interface StatsPanelProps {
  stats: PersonaStats;
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: spacing.md,
};

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
  padding: spacing.md,
  background: colors.surface,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
};

const labelStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: 0,
};

const valueRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: spacing.xxs,
};

const valueStyle: CSSProperties = {
  fontSize: typography.size['2xl'],
  fontWeight: typography.weight.bold,
  color: colors.text,
};

const unitStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
};

const trackStyle: CSSProperties = {
  width: '100%',
  height: 4,
  background: colors.border,
  borderRadius: radius.pill,
  overflow: 'hidden',
};

const fillStyle: CSSProperties = {
  height: '100%',
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
  borderRadius: radius.pill,
  transition: 'width 0.5s ease',
};

export function StatsPanel({ stats }: StatsPanelProps) {
  const entries = Object.entries(stats);

  return (
    <div style={gridStyle}>
      {entries.map(([key, value]) => (
        <div key={key} style={cardStyle}>
          <p style={labelStyle}>{formatLabel(key)}</p>
          <div style={valueRowStyle}>
            <span style={valueStyle}>{value}</span>
            <span style={unitStyle}>/100</span>
          </div>
          <div style={trackStyle}>
            <div style={{ ...fillStyle, width: `${Math.min(value, 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatLabel(label: string) {
  return label.charAt(0).toUpperCase() + label.slice(1);
}
