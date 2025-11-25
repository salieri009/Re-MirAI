'use client';

import { useEffect, useRef } from 'react';
import { trustInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './TrustBadge.module.css';

interface TrustBadgeProps {
    icon: string;
    label: string;
    description: string;
}

export function TrustBadge({ icon, label, description }: TrustBadgeProps) {
    const badgeRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!reducedMotion && badgeRef.current) {
            trustInteractions.privacyBadgePulse(badgeRef.current);
        }
    }, [reducedMotion]);

    return (
        <div ref={badgeRef} className={styles.badge}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
                <strong className={styles.label}>{label}</strong>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}
