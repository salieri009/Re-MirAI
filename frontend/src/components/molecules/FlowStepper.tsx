'use client';

import React from 'react';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

interface FlowStepperProps {
  steps: string[];
  activeIndex: number;
  ariaLabel?: string;
  variant?: 'default' | 'hero' | 'compact';
  style?: CSSProperties;
}

const containerStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: spacing.xs,
};

const stepBaseStyle: CSSProperties = {
  fontSize: typography.size.xs,
  textAlign: 'center',
  padding: `${spacing.xs}px ${spacing.sm}px`,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: 'rgba(255, 255, 255, 0.68)',
  color: colors.textSecondary,
  lineHeight: typography.lineHeight.snug,
};

const stepActiveStyle: CSSProperties = {
  borderColor: 'rgba(217, 70, 239, 0.45)',
  background: 'rgba(217, 70, 239, 0.14)',
  color: colors.text,
  fontWeight: typography.weight.semiBold,
};

const variantContainerStyles: Record<NonNullable<FlowStepperProps['variant']>, CSSProperties> = {
  default: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  },
  hero: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: spacing.sm,
  },
  compact: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
    gap: spacing.xxs,
  },
};

const variantStepStyles: Record<NonNullable<FlowStepperProps['variant']>, CSSProperties> = {
  default: {},
  hero: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.size.sm,
  },
  compact: {
    padding: `${spacing.xxs}px ${spacing.xs}px`,
    fontSize: typography.size.xs,
  },
};

export function FlowStepper({
  steps,
  activeIndex,
  ariaLabel = 'User flow',
  variant = 'default',
  style,
}: FlowStepperProps) {
  return (
    <div style={mergeStyles(containerStyle, variantContainerStyles[variant], style)} aria-label={ariaLabel}>
      {steps.map((step, index) => (
        <span
          key={`${step}-${index}`}
          style={mergeStyles(stepBaseStyle, variantStepStyles[variant], index === activeIndex && stepActiveStyle)}
          aria-current={index === activeIndex ? 'step' : undefined}
        >
          {step}
        </span>
      ))}
    </div>
  );
}
