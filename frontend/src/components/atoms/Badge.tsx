import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'outline' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md'
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  );
}


