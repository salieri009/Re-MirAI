'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './BondLevelIndicator.module.css';

interface BondLevelIndicatorProps {
    level: number;
    progress: number; // 0 to 100
    label?: string;
}

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
        <div ref={containerRef} className={styles.container} role="status" aria-label={`${label}: Level ${level}, ${progress}% progress`}>
            <div className={styles.ringContainer}>
                <svg className={styles.ringSvg} viewBox="0 0 32 32">
                    <circle
                        className={styles.ringBackground}
                        cx="16"
                        cy="16"
                        r={radius}
                    />
                    <circle
                        ref={ringRef}
                        className={styles.ringProgress}
                        cx="16"
                        cy="16"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <span className={styles.levelBadge}>{level}</span>
            </div>
            <div className={styles.info}>
                <span className={styles.label}>{label}</span>
                <span className={styles.status}>
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
