'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { personaApi } from '@/lib/api/persona';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import styles from './page.module.css';

/**
 * Practice Mode (FR-001.5)
 * Allows users to answer their own survey questions to generate a "Proto-Persona"
 * This creates a lower-rarity persona based on self-perception rather than friend feedback.
 */
export default function PracticeModePage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Load survey questions (same as friend survey)
    const { data: survey, isLoading } = useQuery({
        queryKey: ['practice-survey'],
        queryFn: () => surveyApi.get('practice'),
        enabled: isAuthenticated,
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleSubmitComplete = async () => {
        setIsComplete(true);
        setIsGenerating(true);

        try {
            // Generate Proto-Persona with PRACTICE mode
            const persona = await personaApi.synthesize({
                surveyId: 'practice-self',
                mode: 'FATED',  // Practice mode always uses FATED (auto-generated)
                modifiers: {
                    archetype: undefined, // Let AI determine based on self-answers
                },
            });

            // Navigate to the new persona
            router.push(`/p/${persona.id}?practice=true`);
        } catch (error) {
            console.error('Failed to generate Proto-Persona:', error);
            alert('Failed to generate your Proto-Persona. Please try again.');
            setIsGenerating(false);
            setIsComplete(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <SynthesisSpinner caption="Loading practice questions..." />
                </div>
            </div>
        );
    }

    if (isComplete && isGenerating) {
        return (
            <div className={styles.container}>
                <div className={styles.generatingPanel}>
                    <SynthesisSpinner caption="Creating your Proto-Persona..." size={200} />
                    <h2>Synthesizing Your Self-Reflection</h2>
                    <p>
                        Based on your own answers, we&apos;re creating a Proto-Persona that represents
                        how you see yourself. This will be a lower-rarity persona compared to
                        those synthesized from friend feedback.
                    </p>
                    <ProgressBar value={75} label="Generating Proto-Persona" />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.practiceHub}>
                <header className={styles.header}>
                    <p className={styles.kicker}>Practice Mode</p>
                    <h1>Discover Your Self-Perception</h1>
                    <p className={styles.subtitle}>
                        Answer the same questions your friends would answer about you.
                        This creates a <strong>Proto-Persona</strong> based on self-reflection.
                    </p>
                </header>

                <section className={styles.infoCard}>
                    <h3>💡 About Practice Mode</h3>
                    <ul>
                        <li>Answer honestly about how you see yourself</li>
                        <li>Creates a <strong>Proto-Persona</strong> (lower rarity)</li>
                        <li>Compare later with your friend-generated persona</li>
                        <li>No friends needed - instant gratification!</li>
                    </ul>
                </section>

                {survey && (
                    <section className={styles.wizardSection}>
                        <SurveyWizard
                            surveyId="practice-mode"
                            questions={survey.questions}
                            onComplete={handleSubmitComplete}
                            isPracticeMode
                        />
                    </section>
                )}

                <div className={styles.actions}>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/dashboard/ritual')}
                    >
                        ← Back to Survey Hub
                    </Button>
                </div>
            </div>
        </div>
    );
}
