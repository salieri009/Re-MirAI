'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MirrorCanvas } from '@/components/organisms/MirrorCanvas/MirrorCanvas';
import { TraitPill } from '@/components/atoms/TraitPill';
import styles from './LivePreview.module.css';

interface LivePreviewProps {
    answersCount: number;
    lastAnswer?: number;
    isAnalyzing?: boolean;
}

export function LivePreview({ answersCount, lastAnswer, isAnalyzing }: LivePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const traitsRef = useRef<HTMLDivElement>(null);

    // Mock traits logic - in real app this would come from an analysis engine
    const getTraitForAnswer = (count: number) => {
        const traits = [
            'Curious', 'Empathetic', 'Analytical', 'Creative', 'Resilient',
            'Diplomatic', 'Adventurous', 'Loyal', 'Intuitive', 'Wise'
        ];
        return traits[count % traits.length];
    };

    useEffect(() => {
        if (answersCount > 0 && traitsRef.current) {
            // Animate new trait appearing
            const lastTrait = traitsRef.current.lastElementChild;
            if (lastTrait) {
                gsap.fromTo(lastTrait,
                    { opacity: 0, scale: 0.5, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
                );
            }

            // Pulse the container
            if (containerRef.current) {
                gsap.fromTo(containerRef.current,
                    { boxShadow: '0 0 20px rgba(132, 94, 194, 0.2)' },
                    {
                        boxShadow: '0 0 40px rgba(132, 94, 194, 0.6)',
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1
                    }
                );
            }
        }
    }, [answersCount]);

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.canvasWrapper}>
                <MirrorCanvas
                    variant="mirror"
                    intensity={0.5 + (answersCount * 0.05)}
                    interactionMode={isAnalyzing ? 'converge' : 'default'}
                />
            </div>

            <div className={styles.overlay}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Digital Mirror</h3>
                    <span className={styles.status}>
                        {isAnalyzing ? 'Analyzing resonance...' : 'Waiting for input...'}
                    </span>
                </div>

                <div ref={traitsRef} className={styles.traitsGrid}>
                    {Array.from({ length: answersCount }).map((_, i) => (
                        <div key={i} className={styles.traitWrapper}>
                            <TraitPill
                                trait={getTraitForAnswer(i)}
                                variant="accent"
                                className="shadow-lg"
                            />
                        </div>
                    ))}
                </div>

                {answersCount === 0 && (
                    <div className={styles.emptyState}>
                        <p>Answer questions to reveal your reflection</p>
                    </div>
                )}
            </div>
        </div>
    );
}
