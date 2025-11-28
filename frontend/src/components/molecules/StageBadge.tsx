'use client';

import React from 'react';
import styles from './StageBadge.module.css';

export type SurveyStage = 'COLLECTING' | 'READY' | 'SYNTHESIZED';

interface StageBadgeProps {
    stage: SurveyStage;
    className?: string;
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

export function StageBadge({ stage, className = '' }: StageBadgeProps) {
    const config = STAGE_CONFIG[stage];

    return (
        <span
            className={`${styles.badge} ${styles[config.color]} ${className}`}
            aria-label={`Status: ${config.label}`}
        >
            <span className={styles.icon} aria-hidden="true">
                {config.icon}
            </span>
            <span className={styles.label}>{config.label}</span>
        </span>
    );
}


