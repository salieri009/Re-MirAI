'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { ArchetypeCard } from '@/components/atoms/ArchetypeCard';
import { useAnnouncement } from '@/hooks/useAccessibility';
import styles from './page.module.css';

type SummoningStage = 'PRE_SYNTHESIS' | 'ALCHEMIC_MODE' | 'REVEAL';

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
    const [stage, setStage] = useState<SummoningStage>('PRE_SYNTHESIS');
    const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [personaId, setPersonaId] = useState('p-123');

    useEffect(() => {
        if (stage === 'PRE_SYNTHESIS') {
            announce('Ready to begin synthesis ritual.', 'polite');
            const timer = setTimeout(() => setStage('ALCHEMIC_MODE'), 4000);
            return () => clearTimeout(timer);
        }

        if (stage === 'ALCHEMIC_MODE' && selectedArchetype) {
            announce(`Alchemic Mode engaged with ${selectedArchetype}`, 'polite');
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStage('REVEAL');
                        return 100;
                    }
                    return prev + 5;
                });
            }, 250);

            return () => clearInterval(interval);
        }

        if (stage === 'REVEAL') {
            announce('Persona revealed. Explore your new companion.', 'assertive');
        }
    }, [stage, selectedArchetype, announce]);

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
        setStage('REVEAL');
        setProgress(100);
    };

    const handleExplore = () => {
        router.push(`/p/${personaId}`);
    };

    return (
        <main className={styles.page}>
            <div className={styles.backdrop} />
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
                        <Button variant="secondary" onClick={() => setStage('ALCHEMIC_MODE')}>
                            Skip to Alchemic Mode
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
                                    onSelect={setSelectedArchetype}
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
    );
}
