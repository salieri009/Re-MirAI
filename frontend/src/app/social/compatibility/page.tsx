'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { socialApi } from '@/lib/api/social';
import { personaApi } from '@/lib/api/persona';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import styles from './page.module.css';

/**
 * Social Compatibility Page (FR-005.1, FR-005.2)
 * 
 * Allows users to check compatibility between their persona and a friend's persona.
 * Shows compatibility score and relationship dynamic description.
 */
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
    const friendPersonas = useMemo(() => [
        { id: 'friend-1', name: 'Alex', archetype: 'The Strategist' },
        { id: 'friend-2', name: 'Mia', archetype: 'The Dreamer' },
        { id: 'friend-3', name: 'Jordan', archetype: 'The Guardian' },
    ], []);

    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const myPersona = myPersonas?.[0];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <p className={styles.kicker}>Social Features</p>
                    <h1>Compatibility Check</h1>
                    <p className={styles.subtitle}>
                        Discover the chemistry between your persona and your friends&apos; personas.
                    </p>
                </header>

                <div className={styles.comparisonGrid}>
                    {/* My Persona */}
                    <section className={styles.personaSection}>
                        <h2>Your Persona</h2>
                        {myPersona ? (
                            <PersonaCard persona={myPersona} readOnly />
                        ) : (
                            <div className={styles.placeholder}>
                                <p>No persona found</p>
                                <Button onClick={() => router.push('/dashboard/ritual')}>
                                    Create Persona
                                </Button>
                            </div>
                        )}
                    </section>

                    {/* Compatibility Result */}
                    <section className={styles.resultSection}>
                        {isCheckingCompatibility ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner} />
                                <p>Calculating chemistry...</p>
                            </div>
                        ) : compatibility ? (
                            <div className={styles.result}>
                                <div className={styles.scoreCircle}>
                                    <span className={styles.scoreValue}>{compatibility.score}</span>
                                    <span className={styles.scoreLabel}>%</span>
                                </div>
                                <h3 className={styles.compatibilityLabel}>{compatibility.label}</h3>
                                <p className={styles.compatibilityDesc}>{compatibility.description}</p>
                                <div className={styles.resultActions}>
                                    <Button variant="secondary" onClick={() => {
                                        // Share functionality
                                        navigator.clipboard.writeText(
                                            `My persona and ${selectedPersonaId} have ${compatibility.score}% compatibility! Check your chemistry at Re:MirAI.`
                                        );
                                        alert('Copied to clipboard!');
                                    }}>
                                        📤 Share Result
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.awaiting}>
                                <p>Select a friend&apos;s persona to check compatibility</p>
                                <span className={styles.arrow}>→</span>
                            </div>
                        )}
                    </section>

                    {/* Friend Personas */}
                    <section className={styles.personaSection}>
                        <h2>Friend&apos;s Personas</h2>
                        <div className={styles.friendList}>
                            {friendPersonas.map((friend) => (
                                <button
                                    key={friend.id}
                                    className={`${styles.friendCard} ${selectedPersonaId === friend.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedPersonaId(friend.id)}
                                >
                                    <div className={styles.friendAvatar}>
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div className={styles.friendInfo}>
                                        <span className={styles.friendName}>{friend.name}</span>
                                        <span className={styles.friendArchetype}>{friend.archetype}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <div className={styles.actions}>
                    <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                        ← Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
