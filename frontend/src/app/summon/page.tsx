'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { ArchetypeCard } from '@/components/atoms/ArchetypeCard';
import { SkipToContent, useAnnouncement } from '@/hooks/useAccessibility';
import { useSummoningAnimation, type SummoningStage } from '@/hooks/useSummoningAnimation';
import styles from './page.module.css';

// Lazy load canvas for summoning animation
const SummoningCanvas = dynamic(() => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then(mod => ({ default: mod.MirrorCanvas })), {
  loading: () => <canvas aria-hidden="true" className={styles.backgroundCanvas} />,
  ssr: false,
});

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

export default function SummonPage() {
    const router = useRouter();
    const announce = useAnnouncement();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
    const [personaId, setPersonaId] = useState('p-123');

    const {
        stage,
        progress,
        transitionToAlchemicMode,
        transitionToReveal,
        skipToReveal,
    } = useSummoningAnimation({
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
            <main id="summon-main" className={styles.page} role="main" aria-label="Summoning ritual">
                <div className={styles.backdrop} aria-hidden="true" />
                <section className={styles.stage}>
                <header className={styles.header}>
                    <p className={styles.kicker}>Summoning Ritual ver2</p>
                    <h1>The ceremony that births your Persona.</h1>
                    <p>Follow the three stages: anticipation, alchemic choice, and the reveal.</p>
                </header>

                {stage === 'PRE_SYNTHESIS' && (
                    <div className={styles.stagePanel}>
                        <SynthesisSpinner caption="Calibrating data threads..." />
                        <p className={styles.helper}>Gathering resonance from your survey responses.</p>
                        <Button variant="secondary" onClick={handleBeginSynthesis}>
                            Begin Synthesis
                        </Button>
                    </div>
                )}

                {stage === 'ALCHEMIC_MODE' && (
                    <div className={styles.stagePanel}>
                        <div className={styles.alchemicHeader}>
                            <div>
                                <h2>Choose an archetype focus</h2>
                                <p>Guide the synthesis while progress builds automatically.</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleSkip}>
                                Skip Animation
                            </Button>
                        </div>
                        <ProgressBar value={progress} label="Synthesis progress" />
                        <div className={styles.archetypeGrid}>
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
                    <div className={styles.revealPanel}>
                        <p className={styles.kicker}>Stage 3 · Reveal</p>
                        <h2>{personaSummary.name}</h2>
                        <p>{personaSummary.synopsis}</p>
                        <div className={styles.revealActions}>
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
