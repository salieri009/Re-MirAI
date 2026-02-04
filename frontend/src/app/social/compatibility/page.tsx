'use client';

import { useState, useMemo, CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { socialApi } from '@/lib/api/social';
import { personaApi } from '@/lib/api/persona';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';

/**
 * Social Compatibility Page (FR-005.1, FR-005.2)
 *
 * Allows users to check compatibility between their persona and a friend's persona.
 * Shows compatibility score and relationship dynamic description.
 */

// Styles
const styles = {
    container: {
        minHeight: '100vh',
        background: 'var(--background-dark)',
        padding: '2rem',
    } as CSSProperties,
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
    } as CSSProperties,
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
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
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
    } as CSSProperties,
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '1.125rem',
        maxWidth: '600px',
        margin: '0 auto',
    } as CSSProperties,
    comparisonGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '2rem',
        alignItems: 'start',
        marginBottom: '3rem',
    } as CSSProperties,
    personaSectionH2: {
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '1rem',
        textAlign: 'center',
    } as CSSProperties,
    placeholder: {
        background: 'var(--card-background)',
        border: '1px dashed var(--border-color)',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
    } as CSSProperties,
    resultSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
    } as CSSProperties,
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    } as CSSProperties,
    spinner: {
        width: '48px',
        height: '48px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    } as CSSProperties,
    result: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    } as CSSProperties,
    scoreCircle: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(59, 130, 246, 0.2))',
        border: '3px solid var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    scoreValue: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--accent)',
    } as CSSProperties,
    scoreLabel: {
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        marginLeft: '2px',
    } as CSSProperties,
    compatibilityLabel: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: 0,
    } as CSSProperties,
    compatibilityDesc: {
        color: 'var(--text-secondary)',
        maxWidth: '300px',
        lineHeight: 1.5,
    } as CSSProperties,
    resultActions: {
        marginTop: '0.5rem',
    } as CSSProperties,
    awaiting: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    } as CSSProperties,
    arrow: {
        fontSize: '2rem',
        opacity: 0.5,
    } as CSSProperties,
    friendList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    } as CSSProperties,
    friendCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: 'var(--card-background)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        textAlign: 'left',
    } as CSSProperties,
    friendCardSelected: {
        borderColor: 'var(--accent)',
        background: 'rgba(217, 70, 239, 0.1)',
    } as CSSProperties,
    friendAvatar: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        color: 'white',
        fontSize: '1.25rem',
    } as CSSProperties,
    friendInfo: {
        display: 'flex',
        flexDirection: 'column',
    } as CSSProperties,
    friendName: {
        fontWeight: 600,
        color: 'var(--text-primary)',
    } as CSSProperties,
    friendArchetype: {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
    } as CSSProperties,
    actions: {
        display: 'flex',
        justifyContent: 'center',
    } as CSSProperties,
};

// CSS for spinner animation (injected via style tag)
const spinnerKeyframes = `
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
`;

export default function CompatibilityPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

    // Get user's personas
    const { data: myPersonas } = useQuery({
        queryKey: ['my-personas'],
        queryFn: () => personaApi.list(),
        enabled: isAuthenticated,
    });

    // Get compatibility when a friend's persona is selected
    const { data: compatibility, isLoading: isCheckingCompatibility } = useQuery({
        queryKey: ['compatibility', selectedPersonaId],
        queryFn: () => socialApi.getCompatibility(selectedPersonaId!),
        enabled: !!selectedPersonaId,
    });

    // Mock friend personas for demo
    const friendPersonas = useMemo(
        () => [
            { id: 'friend-1', name: 'Alex', archetype: 'The Strategist' },
            { id: 'friend-2', name: 'Mia', archetype: 'The Dreamer' },
            { id: 'friend-3', name: 'Jordan', archetype: 'The Guardian' },
        ],
        []
    );

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const myPersona = myPersonas?.[0];

    return (
        <>
            <style>{spinnerKeyframes}</style>
            <div style={styles.container}>
                <div style={styles.content}>
                    <header style={styles.header}>
                        <p style={styles.kicker}>Social Features</p>
                        <h1 style={styles.h1}>Compatibility Check</h1>
                        <p style={styles.subtitle}>
                            Discover the chemistry between your persona and your friends&apos; personas.
                        </p>
                    </header>

                    <div style={styles.comparisonGrid}>
                        {/* My Persona */}
                        <section>
                            <h2 style={styles.personaSectionH2}>Your Persona</h2>
                            {myPersona ? (
                                <PersonaCard persona={myPersona} readOnly />
                            ) : (
                                <div style={styles.placeholder}>
                                    <p>No persona found</p>
                                    <Button onClick={() => router.push('/dashboard/ritual')}>Create Persona</Button>
                                </div>
                            )}
                        </section>

                        {/* Compatibility Result */}
                        <section style={styles.resultSection}>
                            {isCheckingCompatibility ? (
                                <div style={styles.loading}>
                                    <div style={styles.spinner} />
                                    <p>Calculating chemistry...</p>
                                </div>
                            ) : compatibility ? (
                                <div style={styles.result}>
                                    <div style={styles.scoreCircle}>
                                        <span style={styles.scoreValue}>{compatibility.score}</span>
                                        <span style={styles.scoreLabel}>%</span>
                                    </div>
                                    <h3 style={styles.compatibilityLabel}>{compatibility.label}</h3>
                                    <p style={styles.compatibilityDesc}>{compatibility.description}</p>
                                    <div style={styles.resultActions}>
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                // Share functionality
                                                navigator.clipboard.writeText(
                                                    `My persona and ${selectedPersonaId} have ${compatibility.score}% compatibility! Check your chemistry at Re:MirAI.`
                                                );
                                                alert('Copied to clipboard!');
                                            }}
                                        >
                                            📤 Share Result
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div style={styles.awaiting}>
                                    <p>Select a friend&apos;s persona to check compatibility</p>
                                    <span style={styles.arrow}>→</span>
                                </div>
                            )}
                        </section>

                        {/* Friend Personas */}
                        <section>
                            <h2 style={styles.personaSectionH2}>Friend&apos;s Personas</h2>
                            <div style={styles.friendList}>
                                {friendPersonas.map((friend) => (
                                    <button
                                        key={friend.id}
                                        style={{
                                            ...styles.friendCard,
                                            ...(selectedPersonaId === friend.id ? styles.friendCardSelected : {}),
                                        }}
                                        onClick={() => setSelectedPersonaId(friend.id)}
                                    >
                                        <div style={styles.friendAvatar}>{friend.name.charAt(0)}</div>
                                        <div style={styles.friendInfo}>
                                            <span style={styles.friendName}>{friend.name}</span>
                                            <span style={styles.friendArchetype}>{friend.archetype}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div style={styles.actions}>
                        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                            ← Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
