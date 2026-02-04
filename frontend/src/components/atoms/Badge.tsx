'use client';

import React from 'react';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'outline' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: CSSProperties;
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: typography.weight.medium,
  borderRadius: radius.pill,
  border: '1px solid transparent',
};

const variantStyles: Record<BadgeVariant, CSSProperties> = {
  default: {
    backgroundColor: colors.surface,
    color: colors.textSecondary,
  },
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  accent: {
    backgroundColor: colors.accent,
    color: colors.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.accent,
    color: colors.accent,
  },
  success: {
    backgroundColor: '#10B981', // Green
    color: colors.white,
  },
  warning: {
    backgroundColor: '#F59E0B', // Amber
    color: colors.bgDark,
  },
  error: {
    backgroundColor: '#EF4444', // Red
    color: colors.white,
  },
};

const sizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: {
    padding: `${spacing.xxs}px ${spacing.sm}px`,
    fontSize: typography.size.xs,
  },
  md: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.size.sm,
  },
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
}: BadgeProps) {
  const combinedStyle = mergeStyles(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    style
  );

  return (
    <span style={combinedStyle}>
      {children}
    </span>
  );
}
