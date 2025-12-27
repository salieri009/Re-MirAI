'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';
import styles from './page.module.css';

/**
 * Profile Settings Page (FR-005.3)
 * 
 * Allows users to manage their profile visibility (public/private).
 * Privacy-first approach: users must explicitly opt-in to make their profile public.
 */
export default function ProfileSettingsPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    // Privacy settings state
    const [isPublic, setIsPublic] = useState(false);
    const [showCompatibility, setShowCompatibility] = useState(true);
    const [allowRoomVisits, setAllowRoomVisits] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleSave = async () => {
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 3000);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <p className={styles.kicker}>Profile Settings</p>
                    <h1>Privacy & Visibility</h1>
                    <p className={styles.subtitle}>
                        Control how others can see and interact with your personas.
                    </p>
                </header>

                <section className={styles.settingsSection}>
                    <h2>Profile Visibility</h2>
                    <p className={styles.sectionDesc}>
                        By default, your profile is private. You must opt-in to make it visible to others.
                    </p>

                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <h3>Public Profile</h3>
                            <p>Allow anyone with your profile link to view your personas.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <h3>Show in Compatibility Checks</h3>
                            <p>Allow friends to check compatibility with your personas.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={showCompatibility}
                                onChange={(e) => setShowCompatibility(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <h3>Allow Room Visits</h3>
                            <p>Let friends visit your persona&apos;s room and leave gifts.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={allowRoomVisits}
                                onChange={(e) => setAllowRoomVisits(e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </section>

                <section className={styles.settingsSection}>
                    <h2>Account</h2>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>{user?.email || 'Not set'}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Member Since</span>
                        <span className={styles.infoValue}>December 2025</span>
                    </div>
                </section>

                <div className={styles.actions}>
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/dashboard')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
