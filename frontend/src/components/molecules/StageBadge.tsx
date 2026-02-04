'use client';

import React from 'react';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

export type SurveyStage = 'COLLECTING' | 'READY' | 'SYNTHESIZED';

interface StageBadgeProps {
    stage: SurveyStage;
    style?: CSSProperties;
}

const STAGE_CONFIG: Record<SurveyStage, { label: string; color: string; icon: string }> = {
    COLLECTING: {
        label: 'Collecting',
        color: 'accent',
        icon: '🔮',
    },
    READY: {
        label: 'Ready',
        color: 'primary',
        icon: '⚡',
    },
    SYNTHESIZED: {
        label: 'Synthesized',
        color: 'highlight',
        icon: '✨',
    },
};

const badgeBase: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xxs}px ${spacing.sm}px`,
    borderRadius: radius.pill,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
};

const colorStyles: Record<string, CSSProperties> = {
    accent: {
        background: `${colors.accent}20`,
        color: colors.accent,
    },
    primary: {
        background: `${colors.primary}20`,
        color: colors.primary,
    },
    highlight: {
        background: `${colors.highlight}20`,
        color: colors.highlight,
    },
};

const iconStyle: CSSProperties = {
    fontSize: typography.size.base,
};

const labelStyle: CSSProperties = {
    fontSize: typography.size.sm,
};

export function StageBadge({ stage, style }: StageBadgeProps) {
    const config = STAGE_CONFIG[stage];
    const combinedStyle = mergeStyles(badgeBase, colorStyles[config.color], style);

    return (
        <span style={combinedStyle} aria-label={`Status: ${config.label}`}>
            <span style={iconStyle} aria-hidden="true">{config.icon}</span>
            <span style={labelStyle}>{config.label}</span>
        </span>
    );
}
