'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, typography, CSSProperties } from '@/lib/styles';

interface BondLevelIndicatorProps {
    level: number;
    progress: number; // 0 to 100
    label?: string;
}

const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
};

const ringContainerStyle: CSSProperties = {
    position: 'relative',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const ringSvgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    transform: 'rotate(-90deg)',
};

const ringBackgroundStyle: CSSProperties = {
    fill: 'none',
    stroke: colors.border,
    strokeWidth: 3,
};

const ringProgressStyle: CSSProperties = {
    fill: 'none',
    stroke: colors.accent,
    strokeWidth: 3,
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease',
};

const levelBadgeStyle: CSSProperties = {
    position: 'absolute',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text,
};

const infoStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

const labelStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

const statusStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
};

export function BondLevelIndicator({ level, progress, label = 'Bond Level' }: BondLevelIndicatorProps) {
    const ringRef = useRef<SVGCircleElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        if (reducedMotion || !containerRef.current) return;

        // Animate on level up (mock detection for now, ideally passed as prop)
        if (progress === 0 && level > 1) {
            connectionInteractions.bondLevelUp(containerRef.current);
        }
    }, [level, progress, reducedMotion]);

    return (
        <div ref={containerRef} style={containerStyle} role="status" aria-label={`${label}: Level ${level}, ${progress}% progress`}>
            <div style={ringContainerStyle}>
                <svg style={ringSvgStyle} viewBox="0 0 32 32">
                    <circle
                        style={ringBackgroundStyle}
                        cx="16"
                        cy="16"
                        r={radius}
                    />
                    <circle
                        ref={ringRef}
                        style={ringProgressStyle}
                        cx="16"
                        cy="16"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <span style={levelBadgeStyle}>{level}</span>
            </div>
            <div style={infoStyle}>
                <span style={labelStyle}>{label}</span>
                <span style={statusStyle}>
                    {getLevelTitle(level)}
                </span>
            </div>
        </div>
    );
}

function getLevelTitle(level: number): string {
    if (level <= 1) return 'Stranger';
    if (level <= 3) return 'Acquaintance';
    if (level <= 5) return 'Friend';
    if (level <= 8) return 'Close Friend';
    return 'Soulmate';
}
