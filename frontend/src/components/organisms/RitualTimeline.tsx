'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './RitualTimeline.module.css';

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

export function RitualTimeline({ stages }: RitualTimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion || !timelineRef.current) return;

        const stageElements = timelineRef.current.querySelectorAll(`.${styles.stage}`);
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
        <div ref={timelineRef} className={styles.timeline}>
            <div className={styles.timelineTrack}>
                <div ref={progressRef} className={styles.timelineProgress} />
            </div>

            <div className={styles.stages}>
                {stages.map((stage) => (
                    <div
                        key={stage.id}
                        className={`${styles.stage} ${styles[stage.status]}`}
                    >
                        <div className={styles.stageMarker}>
                            {stage.status === 'completed' ? '✓' : stage.icon}
                        </div>

                        <div className={styles.stageContent}>
                            <h3 className={styles.stageName}>{stage.name}</h3>
                            <p className={styles.stageDescription}>{stage.description}</p>
                            {stage.timestamp && (
                                <div className={styles.stageTimestamp}>
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
