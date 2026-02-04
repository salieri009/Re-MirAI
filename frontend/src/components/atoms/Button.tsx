'use client';

import React, { forwardRef, useState } from 'react';
import { colors, spacing, radius, typography, shadows, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: typography.fontDisplay,
  fontWeight: typography.weight.semiBold,
  borderRadius: radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: transitions.normal,
  position: 'relative',
  gap: spacing.xs,
};

const variantStyles: Record<ButtonVariant, { base: CSSProperties; hover: CSSProperties }> = {
  primary: {
    base: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    hover: {
      backgroundColor: colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },
  secondary: {
    base: {
      backgroundColor: colors.accent,
      color: colors.white,
    },
    hover: {
      backgroundColor: colors.accentDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },
  accent: {
    base: {
      backgroundColor: colors.accent,
      color: colors.bgDark,
    },
    hover: {
      backgroundColor: colors.accentLight,
      transform: 'translateY(-1px)',
      boxShadow: shadows.glowAccent,
    },
  },
  ghost: {
    base: {
      backgroundColor: 'transparent',
      color: colors.accent,
      border: `1px solid ${colors.accent}`,
    },
    hover: {
      backgroundColor: colors.surface,
    },
  },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.size.sm,
  },
  md: {
    padding: `${spacing.md}px ${spacing.lg}px`,
    fontSize: typography.size.base,
  },
  lg: {
    padding: `${spacing.lg}px ${spacing.xl}px`,
    fontSize: typography.size.lg,
  },
};

const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    disabled,
    style,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const combinedStyle = mergeStyles(
    baseStyle,
    variantStyles[variant].base,
    sizeStyles[size],
    isHovered && !disabled && variantStyles[variant].hover,
    disabled && disabledStyle,
    style
  );

  return (
    <button
      ref={ref}
      style={combinedStyle}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
});
