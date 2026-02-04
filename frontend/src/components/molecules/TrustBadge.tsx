'use client';

import { useEffect, useRef } from 'react';
import { trustInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

interface TrustBadgeProps {
    icon: string;
    label: string;
    description: string;
}

const badgeStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const iconStyle: CSSProperties = {
    fontSize: typography.size['2xl'],
    lineHeight: 1,
};

const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xxs,
};

const labelStyle: CSSProperties = {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
};

const descriptionStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    margin: 0,
};

export function TrustBadge({ icon, label, description }: TrustBadgeProps) {
    const badgeRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!reducedMotion && badgeRef.current) {
            trustInteractions.privacyBadgePulse(badgeRef.current);
        }
    }, [reducedMotion]);

    return (
        <div ref={badgeRef} style={badgeStyle}>
            <div style={iconStyle}>{icon}</div>
            <div style={contentStyle}>
                <strong style={labelStyle}>{label}</strong>
                <p style={descriptionStyle}>{description}</p>
            </div>
        </div>
    );
}
