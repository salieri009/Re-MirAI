'use client';

import React from 'react';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface ArchetypeBadgeProps {
    archetype: string;
    variant?: 'default' | 'large' | 'small';
    style?: CSSProperties;
}

const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    fontFamily: typography.fontDisplay,
    fontWeight: typography.weight.medium,
    letterSpacing: '0.05em',
    background: `${colors.primary}15`,
    color: colors.primary,
    border: `1px solid ${colors.primary}30`,
    boxShadow: '0 0 10px rgba(0, 201, 167, 0.1)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
};

const sizeStyles: Record<'small' | 'default' | 'large', CSSProperties> = {
    small: {
        fontSize: typography.size.xs,
        padding: `${spacing.xxs}px ${spacing.xs}px`,
    },
    default: {
        fontSize: typography.size.sm,
        padding: `${spacing.xxs}px ${spacing.sm}px`,
    },
    large: {
        fontSize: typography.size.base,
        padding: `${spacing.xs}px ${spacing.md}px`,
    },
};

export function ArchetypeBadge({
    archetype,
    variant = 'default',
    style,
}: ArchetypeBadgeProps) {
    const combinedStyle = mergeStyles(
        baseStyle,
        sizeStyles[variant],
        style
    );

    return (
        <div style={combinedStyle}>
            {archetype}
        </div>
    );
}
