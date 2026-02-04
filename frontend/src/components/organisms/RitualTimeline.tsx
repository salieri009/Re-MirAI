'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

interface TimelineStage {
    id: string;
    name: string;
    description: string;
    status: 'completed' | 'active' | 'upcoming';
    icon: string;
    timestamp?: string;
}

interface RitualTimelineProps {
    stages: TimelineStage[];
}

const timelineStyle: CSSProperties = {
    display: 'flex',
    gap: spacing.lg,
    position: 'relative',
    padding: spacing.md,
};

const timelineTrackStyle: CSSProperties = {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 4,
    background: colors.border,
    borderRadius: radius.full,
};

const timelineProgressStyle: CSSProperties = {
    width: '100%',
    background: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
    borderRadius: radius.full,
    height: 0,
};

const stagesStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    marginLeft: 40,
};

const stageBase: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    opacity: 0,
    transform: 'translateX(-20px)',
};

const stageMarkerBase: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.size.lg,
    flexShrink: 0,
    marginLeft: -60,
    background: colors.surface,
    border: `2px solid ${colors.border}`,
};

const markerCompleted: CSSProperties = {
    background: colors.primary,
    borderColor: colors.primary,
    color: colors.text,
};

const markerActive: CSSProperties = {
    borderColor: colors.accent,
    boxShadow: `0 0 10px ${colors.accent}40`,
};

const stageContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xxs,
};

const stageNameStyle: CSSProperties = {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    margin: 0,
};

const stageDescriptionStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    margin: 0,
};

const stageTimestampStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
};

export function RitualTimeline({ stages }: RitualTimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion || !timelineRef.current) return;

        const stageElements = timelineRef.current.querySelectorAll('[data-stage]');
        const completedCount = stages.filter(s => s.status === 'completed').length;
        const progressPercentage = (completedCount / stages.length) * 100;

        // Animate progress bar
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                height: `${progressPercentage}%`,
                duration: 1.5,
                ease: 'power2.out',
            });
        }

        // Stagger animate stages
        gsap.to(stageElements, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
        });
    }, [reducedMotion, stages]);

    return (
        <div ref={timelineRef} style={timelineStyle}>
            <div style={timelineTrackStyle}>
                <div ref={progressRef} style={timelineProgressStyle} />
            </div>

            <div style={stagesStyle}>
                {stages.map((stage) => (
                    <div
                        key={stage.id}
                        style={stageBase}
                        data-stage
                    >
                        <div style={mergeStyles(
                            stageMarkerBase,
                            stage.status === 'completed' && markerCompleted,
                            stage.status === 'active' && markerActive
                        )}>
                            {stage.status === 'completed' ? '✓' : stage.icon}
                        </div>

                        <div style={stageContentStyle}>
                            <h3 style={stageNameStyle}>{stage.name}</h3>
                            <p style={stageDescriptionStyle}>{stage.description}</p>
                            {stage.timestamp && (
                                <div style={stageTimestampStyle}>
                                    <span>🕐</span>
                                    <span>{new Date(stage.timestamp).toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
