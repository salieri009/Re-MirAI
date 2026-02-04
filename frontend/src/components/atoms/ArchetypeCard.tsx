'use client';

import { KeyboardEvent, useState } from 'react';
import { colors, spacing, radius, typography, shadows, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

export type ArchetypeCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
};

const cardBaseStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  width: '100%',
  padding: spacing.lg,
  borderRadius: radius.lg,
  border: '1px solid transparent',
  background: 'radial-gradient(circle at 20% 20%, rgba(132, 94, 194, 0.2), rgba(10, 1, 18, 0.6))',
  transition: transitions.normal,
  cursor: 'pointer',
  boxShadow: 'inset 0 0 0 1px rgba(193, 151, 255, 0.05)',
};

const cardHoverStyle: CSSProperties = {
  transform: 'translateY(-2px)',
  borderColor: colors.highlight,
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
};

const cardSelectedStyle: CSSProperties = {
  borderColor: colors.accent,
  background: 'linear-gradient(140deg, rgba(0, 201, 167, 0.15), rgba(132, 94, 194, 0.25))',
  boxShadow: '0 0 32px rgba(0, 201, 167, 0.35)',
};

const cardDisabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

const iconStyle: CSSProperties = {
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: radius.pill,
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.35rem',
  color: colors.white,
  boxShadow: shadows.glowPrimary,
};

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
};

const titleRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.xs,
};

const titleStyle: CSSProperties = {
  fontSize: typography.size.lg,
  fontWeight: typography.weight.semiBold,
  letterSpacing: '0.01em',
  color: colors.text,
  margin: 0,
};

const badgeStyle: CSSProperties = {
  fontSize: typography.size.xs,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: colors.textMuted,
};

const descriptionStyle: CSSProperties = {
  fontSize: '0.95rem',
  color: colors.textMuted,
  lineHeight: typography.lineHeight.relaxed,
  margin: 0,
};

export function ArchetypeCard({
  id,
  title,
  description,
  icon = '✨',
  badge,
  selected = false,
  disabled = false,
  onSelect,
}: ArchetypeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    if (disabled) return;
    onSelect?.(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  const cardStyle = mergeStyles(
    cardBaseStyle,
    isHovered && !disabled && cardHoverStyle,
    selected && cardSelectedStyle,
    disabled && cardDisabledStyle
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      style={cardStyle}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconStyle} aria-hidden="true">
        {icon}
      </div>

      <div style={contentStyle}>
        <div style={titleRowStyle}>
          <p style={titleStyle}>{title}</p>
          {badge ? <span style={badgeStyle}>{badge}</span> : null}
        </div>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
}
