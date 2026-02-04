'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MirrorCanvas } from '@/components/organisms/MirrorCanvas/MirrorCanvas';
import { TraitPill } from '@/components/atoms/TraitPill';
import { colors, spacing, radius, typography, shadows, CSSProperties } from '@/lib/styles';

interface LivePreviewProps {
    answersCount: number;
    lastAnswer?: number;
    isAnalyzing?: boolean;
}

const containerStyle: CSSProperties = {
    position: 'relative',
    borderRadius: radius.xl,
    overflow: 'hidden',
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.lg,
};

const canvasWrapperStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 300,
};

const overlayStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.lg,
    pointerEvents: 'none',
};

const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
};

const titleStyle: CSSProperties = {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    margin: 0,
};

const statusStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
};

const traitsGridStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: 'auto',
};

const traitWrapperStyle: CSSProperties = {
    pointerEvents: 'auto',
};

const emptyStateStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
};

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
        <div ref={containerRef} style={containerStyle}>
            <div style={canvasWrapperStyle}>
                <MirrorCanvas
                    variant="mirror"
                    intensity={0.5 + (answersCount * 0.05)}
                    interactionMode={isAnalyzing ? 'converge' : 'default'}
                />
            </div>

            <div style={overlayStyle}>
                <div style={headerStyle}>
                    <h3 style={titleStyle}>Digital Mirror</h3>
                    <span style={statusStyle}>
                        {isAnalyzing ? 'Analyzing resonance...' : 'Waiting for input...'}
                    </span>
                </div>

                <div ref={traitsRef} style={traitsGridStyle}>
                    {Array.from({ length: answersCount }).map((_, i) => (
                        <div key={i} style={traitWrapperStyle}>
                            <TraitPill
                                trait={getTraitForAnswer(i)}
                                variant="accent"
                            />
                        </div>
                    ))}
                </div>

                {answersCount === 0 && (
                    <div style={emptyStateStyle}>
                        <p>Answer questions to reveal your reflection</p>
                    </div>
                )}
            </div>
        </div>
    );
}
