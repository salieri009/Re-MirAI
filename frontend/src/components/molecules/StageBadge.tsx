'use client';

import React from 'react';

export type RitualStage = 'COLLECTING' | 'READY' | 'SYNTHESIZED';

interface StageBadgeProps {
    stage: RitualStage;
    className?: string;
}

const STAGE_CONFIG: Record<RitualStage, { label: string; tone: string; icon: string }> = {
    COLLECTING: {
        label: 'Collecting',
        tone: 'accent',
        icon: '🔮',
    },
    READY: {
        label: 'Ready',
        tone: 'primary',
        icon: '⚡',
    },
    SYNTHESIZED: {
        label: 'Synthesized',
        tone: 'highlight',
        icon: '✨',
    },
};

const toneClass: Record<string, string> = {
    accent: 'bg-accent/20 text-accent',
    primary: 'bg-primary/20 text-primary',
    highlight: 'bg-highlight/20 text-highlight',
};

export function StageBadge({ stage, className }: StageBadgeProps) {
    const config = STAGE_CONFIG[stage];

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-sm font-medium ${toneClass[config.tone]} ${className ?? ''}`.trim()}
            aria-label={`Status: ${config.label}`}
        >
            <span className="text-base" aria-hidden="true">{config.icon}</span>
            <span className="text-sm">{config.label}</span>
        </span>
    );
}
