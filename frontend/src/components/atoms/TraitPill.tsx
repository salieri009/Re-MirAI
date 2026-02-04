'use client';

import React, { useState } from 'react';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

interface TraitPillProps {
    trait: string;
    value?: number | string;
    variant?: 'neutral' | 'accent' | 'highlight';
    style?: CSSProperties;
}

const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xxs}px ${spacing.sm}px`,
    borderRadius: radius.md,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    border: '1px solid',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    transition: transitions.normal,
};

const variantStyles: Record<'neutral' | 'accent' | 'highlight', CSSProperties> = {
    neutral: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: colors.textSecondary,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    accent: {
        background: `${colors.accent}15`,
        color: colors.accent,
        borderColor: `${colors.accent}30`,
    },
    highlight: {
        background: `${colors.highlight}15`,
        color: colors.highlight,
        borderColor: `${colors.highlight}30`,
    },
};

const hoverStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
};

const dotStyle: CSSProperties = {
    width: 4,
    height: 4,
    borderRadius: radius.pill,
    background: 'currentColor',
    opacity: 0.5,
};

export function TraitPill({
    trait,
    value,
    variant = 'neutral',
    style,
}: TraitPillProps) {
    const [isHovered, setIsHovered] = useState(false);

    const combinedStyle = mergeStyles(
        baseStyle,
        variantStyles[variant],
        isHovered && hoverStyle,
        style
    );

    return (
        <div
            style={combinedStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{trait}</span>
            {value && (
                <>
                    <span style={dotStyle} />
                    <span style={{ opacity: 0.9 }}>{value}</span>
                </>
            )}
        </div>
    );
}
