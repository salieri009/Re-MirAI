'use client';

import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'outline' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClass: Record<BadgeVariant, string> = {
  default: styles.default,
  primary: styles.primary,
  accent: styles.accent,
  outline: styles.outline,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
};

const sizeClass: Record<BadgeSize, string> = {
  sm: styles.sm,
  md: styles.md,
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span className={[styles.badge, variantClass[variant], sizeClass[size], className ?? ''].join(' ').trim()}>
      {children}
    </span>
  );
}
