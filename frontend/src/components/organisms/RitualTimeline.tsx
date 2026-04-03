'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { useReducedMotion } from '@/hooks/useAccessibility';

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
        <div ref={timelineRef} className="relative flex gap-6 p-4">
            <div className="absolute bottom-0 left-5 top-0 w-1 rounded-full bg-slate-700/25">
                <div ref={progressRef} className="h-0 w-full rounded-full bg-gradient-to-b from-primary to-accent" />
            </div>

            <div className="ml-10 flex flex-col gap-6">
                {stages.map((stage) => (
                    <div
                        key={stage.id}
                        className="flex -translate-x-5 items-start gap-4 opacity-0"
                        data-stage
                    >
                        <div
                            className={clsx(
                                '-ml-14 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-700/25 bg-surface text-lg',
                                stage.status === 'completed' && 'border-primary bg-primary text-text-primary',
                                stage.status === 'active' && 'border-accent shadow-[0_0_10px_rgba(0,201,167,0.25)]'
                            )}
                        >
                            {stage.status === 'completed' ? '✓' : stage.icon}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <h3 className="m-0 text-lg font-semibold text-text-primary">{stage.name}</h3>
                            <p className="m-0 text-sm text-text-muted">{stage.description}</p>
                            {stage.timestamp && (
                                <div className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
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
