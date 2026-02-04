'use client';

import { useMemo, useState, useRef, CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { ArchetypeCard } from '@/components/atoms/ArchetypeCard';
import { SkipToContent, useAnnouncement } from '@/hooks/useAccessibility';
import { useSummoningAnimation, type SummoningStage } from '@/hooks/useSummoningAnimation';

// Lazy load canvas for summoning animation
const SummoningCanvas = dynamic(
    () => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then((mod) => ({ default: mod.MirrorCanvas })),
    {
        loading: () => <canvas aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />,
        ssr: false,
    }
);

const ARCHETYPES = [
    {
        id: 'creator',
        title: 'Creator',
        description: 'Inventive, visionary, driven to craft new worlds.',
        icon: '🎨',
    },
    {
        id: 'sage',
        title: 'Sage',
        description: 'Calm, analytical, translating data to wisdom.',
        icon: '📚',
    },
    {
        id: 'explorer',
        title: 'Explorer',
        description: 'Adventurous, curious, thrives on experimentation.',
        icon: '🧭',
    },
    {
        id: 'guardian',
        title: 'Guardian',
        description: 'Protective, empathetic, anchors emotional safety.',
        icon: '🛡️',
    },
];

// Styles
const styles = {
    page: {
        minHeight: '100vh',
        background: `radial-gradient(circle at top, rgba(132, 94, 194, 0.45), transparent 60%),
            radial-gradient(circle at bottom, rgba(0, 201, 167, 0.25), transparent 60%),
            var(--color-bg-dark)`,
        color: 'var(--color-text-primary)',
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--space-3xl)',
    } as CSSProperties,
    stage: {
        width: 'min(1100px, 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xl)',
    } as CSSProperties,
    header: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
    } as CSSProperties,
    kicker: {
        textTransform: 'uppercase',
        letterSpacing: '0.35em',
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
    } as CSSProperties,
    stagePanel: {
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'var(--space-2xl)',
        background: 'rgba(255, 255, 255, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xl)',
        alignItems: 'center',
        textAlign: 'center',
    } as CSSProperties,
    alchemicHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 'var(--space-md)',
        flexWrap: 'wrap',
        alignItems: 'center',
    } as CSSProperties,
    archetypeGrid: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-md)',
    } as CSSProperties,
    helper: {
        color: 'var(--color-text-secondary)',
        maxWidth: '460px',
    } as CSSProperties,
    revealActions: {
        display: 'flex',
        gap: 'var(--space-md)',
        flexWrap: 'wrap',
        justifyContent: 'center',
    } as CSSProperties,
};

export default function SummonPage() {
    const router = useRouter();
    const announce = useAnnouncement();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
    const [personaId, setPersonaId] = useState('p-123');

    const { stage, progress, transitionToAlchemicMode, transitionToReveal, skipToReveal } = useSummoningAnimation({
        canvasRef,
        onStageChange: (newStage) => {
            if (newStage === 'PRE_SYNTHESIS') {
                announce('Ready to begin synthesis ritual.', 'polite');
            } else if (newStage === 'ALCHEMIC_MODE') {
                announce(`Alchemic Mode engaged${selectedArchetype ? ` with ${selectedArchetype}` : ''}`, 'polite');
            } else if (newStage === 'REVEAL') {
                announce('Persona revealed. Explore your new companion.', 'assertive');
            }
        },
        autoStart: false,
    });

    const personaSummary = useMemo(() => {
        if (!selectedArchetype) {
            return {
                name: 'Awaiting Archetype',
                archetype: '—',
                synopsis: 'Select an archetype to guide the synthesis ritual.',
            };
        }

        return {
            name: `Echo of the ${selectedArchetype}`,
            archetype: selectedArchetype,
            synopsis:
                'This persona channels your survey echoes through the selected archetypal lens. Prepare for the reveal.',
        };
    }, [selectedArchetype]);

    const handleSkip = () => {
        skipToReveal();
    };

    const handleBeginSynthesis = () => {
        transitionToAlchemicMode();
    };

    const handleArchetypeSelect = (id: string) => {
        setSelectedArchetype(id);
        // Auto-transition to reveal after archetype selection
        setTimeout(() => {
            transitionToReveal();
        }, 500);
    };

    const handleExplore = () => {
        router.push(`/p/${personaId}`);
    };

    return (
        <>
            <SkipToContent targetId="summon-main" />
            <main id="summon-main" style={styles.page} role="main" aria-label="Summoning ritual">
                <div aria-hidden="true" />
                <section style={styles.stage}>
                    <header style={styles.header}>
                        <p style={styles.kicker}>Summoning Ritual ver2</p>
                        <h1>The ceremony that births your Persona.</h1>
                        <p>Follow the three stages: anticipation, alchemic choice, and the reveal.</p>
                    </header>

                    {stage === 'PRE_SYNTHESIS' && (
                        <div style={styles.stagePanel}>
                            <SynthesisSpinner caption="Calibrating data threads..." />
                            <p style={styles.helper}>Gathering resonance from your survey responses.</p>
                            <Button variant="secondary" onClick={handleBeginSynthesis}>
                                Begin Synthesis
                            </Button>
                        </div>
                    )}

                    {stage === 'ALCHEMIC_MODE' && (
                        <div style={styles.stagePanel}>
                            <div style={styles.alchemicHeader}>
                                <div>
                                    <h2>Choose an archetype focus</h2>
                                    <p>Guide the synthesis while progress builds automatically.</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleSkip}>
                                    Skip Animation
                                </Button>
                            </div>
                            <ProgressBar value={progress} label="Synthesis progress" />
                            <div style={styles.archetypeGrid}>
                                {ARCHETYPES.map((archetype) => (
                                    <ArchetypeCard
                                        key={archetype.id}
                                        id={archetype.id}
                                        title={archetype.title}
                                        description={archetype.description}
                                        icon={archetype.icon}
                                        selected={selectedArchetype === archetype.id}
                                        onSelect={handleArchetypeSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {stage === 'REVEAL' && (
                        <div style={styles.stagePanel}>
                            <p style={styles.kicker}>Stage 3 · Reveal</p>
                            <h2>{personaSummary.name}</h2>
                            <p>{personaSummary.synopsis}</p>
                            <div style={styles.revealActions}>
                                <Button size="lg" onClick={handleExplore}>
                                    Explore Persona Room
                                </Button>
                                <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                                    Back to Dashboard
                                </Button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
