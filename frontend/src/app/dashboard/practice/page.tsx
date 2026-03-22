'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { personaApi } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';

// Styles
const pageStyles = {
    container: {
        minHeight: '100vh',
        background: 'var(--background-dark)',
        padding: '2rem',
    } as CSSProperties,
    practiceHub: {
        maxWidth: '800px',
        margin: '0 auto',
    } as CSSProperties,
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    } as CSSProperties,
    kicker: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
    } as CSSProperties,
    h1: {
        fontSize: '2rem',
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
    } as CSSProperties,
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
    } as CSSProperties,
    infoCard: {
        background: 'var(--card-background)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
    } as CSSProperties,
    infoCardH3: {
        fontSize: '1.125rem',
        color: 'var(--text-primary)',
        marginBottom: '1rem',
    } as CSSProperties,
    infoCardUl: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    } as CSSProperties,
    infoCardLi: {
        color: 'var(--text-secondary)',
        padding: '0.5rem 0',
        paddingLeft: '1.5rem',
        position: 'relative',
    } as CSSProperties,
    wizardSection: {
        background: 'var(--card-background)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
    } as CSSProperties,
    actions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    } as CSSProperties,
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1rem',
    } as CSSProperties,
    generatingPanel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1.5rem',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto',
    } as CSSProperties,
    generatingH2: {
        color: 'var(--text-primary)',
        fontSize: '1.5rem',
    } as CSSProperties,
    generatingP: {
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
    } as CSSProperties,
};

// CSS for li::before pseudo-element
const listItemStyles = `
.practice-list-item::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent);
}
`;

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
                mode: 'FATED', // Practice mode always uses FATED (auto-generated)
                modifiers: {
                    archetype: undefined, // Let AI determine based on self-answers
                },
            });

            // Navigate to the new persona
            router.push(`/p/${persona.id}?practice=true`);
        } catch (error) {
            toast.error('Failed to generate your Proto-Persona. Please try again.');
            setIsGenerating(false);
            setIsComplete(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return (
            <div style={pageStyles.container}>
                <div style={pageStyles.loading}>
                    <SynthesisSpinner caption="Loading practice questions..." />
                </div>
            </div>
        );
    }

    if (isComplete && isGenerating) {
        return (
            <div style={pageStyles.container}>
                <div style={pageStyles.generatingPanel}>
                    <SynthesisSpinner caption="Creating your Proto-Persona..." size={200} />
                    <h2 style={pageStyles.generatingH2}>Synthesizing Your Self-Reflection</h2>
                    <p style={pageStyles.generatingP}>
                        Based on your own answers, we&apos;re creating a Proto-Persona that represents how you see
                        yourself. This will be a lower-rarity persona compared to those synthesized from friend
                        feedback.
                    </p>
                    <ProgressBar value={75} label="Generating Proto-Persona" />
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{listItemStyles}</style>
            <div style={pageStyles.container}>
                <div style={pageStyles.practiceHub}>
                    <header style={pageStyles.header}>
                        <p style={pageStyles.kicker}>Practice Mode</p>
                        <h1 style={pageStyles.h1}>Discover Your Self-Perception</h1>
                        <p style={pageStyles.subtitle}>
                            Answer the same questions your friends would answer about you. This creates a{' '}
                            <strong>Proto-Persona</strong> based on self-reflection.
                        </p>
                    </header>

                    <section style={pageStyles.infoCard}>
                        <h3 style={pageStyles.infoCardH3}>💡 About Practice Mode</h3>
                        <ul style={pageStyles.infoCardUl}>
                            <li className="practice-list-item" style={pageStyles.infoCardLi}>
                                Answer honestly about how you see yourself
                            </li>
                            <li className="practice-list-item" style={pageStyles.infoCardLi}>
                                Creates a <strong>Proto-Persona</strong> (lower rarity)
                            </li>
                            <li className="practice-list-item" style={pageStyles.infoCardLi}>
                                Compare later with your friend-generated persona
                            </li>
                            <li className="practice-list-item" style={pageStyles.infoCardLi}>
                                No friends needed - instant gratification!
                            </li>
                        </ul>
                    </section>

                    {survey && (
                        <section style={pageStyles.wizardSection}>
                            <SurveyWizard
                                surveyId="practice-mode"
                                questions={survey.questions}
                                onComplete={handleSubmitComplete}
                                isPracticeMode
                            />
                        </section>
                    )}

                    <div style={pageStyles.actions}>
                        <Button variant="ghost" onClick={() => router.push('/dashboard/ritual')}>
                            ← Back to Survey Hub
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
