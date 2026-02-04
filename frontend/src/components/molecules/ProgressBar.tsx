'use client';

import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  accent?: boolean;
  ariaLabel?: string;
  style?: CSSProperties;
};

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
  width: '100%',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: typography.size.sm,
  color: colors.textSecondary,
};

const trackStyle: CSSProperties = {
  width: '100%',
  height: 8,
  background: colors.surface,
  borderRadius: radius.pill,
  overflow: 'hidden',
};

const fillBaseStyle: CSSProperties = {
  height: '100%',
  borderRadius: radius.pill,
  transition: 'width 0.3s ease',
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.highlight})`,
};

const fillAccentStyle: CSSProperties = {
  background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`,
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  accent = false,
  ariaLabel,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  const fillStyle = mergeStyles(
    fillBaseStyle,
    accent && fillAccentStyle,
    { width: `${clamped}%` }
  );

  return (
    <div style={mergeStyles(wrapperStyle, style)}>
      {label ? (
        <div style={headerStyle}>
          <span>{label}</span>
          {showValue ? <span>{clamped}%</span> : null}
        </div>
      ) : null}

      <div
        style={trackStyle}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={ariaLabel ?? label}
      >
        <div style={fillStyle} />
      </div>
    </div>
  );
}
