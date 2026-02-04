'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';

// Styles
const pageStyles = {
    container: {
        minHeight: '100vh',
        background: 'var(--background-dark)',
        padding: '2rem',
    } as CSSProperties,
    content: {
        maxWidth: '640px',
        margin: '0 auto',
    } as CSSProperties,
    header: {
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
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
    } as CSSProperties,
    subtitle: {
        color: 'var(--text-secondary)',
    } as CSSProperties,
    settingsSection: {
        background: 'var(--card-background)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
    } as CSSProperties,
    settingsSectionH2: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
    } as CSSProperties,
    sectionDesc: {
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        marginBottom: '1.5rem',
    } as CSSProperties,
    settingItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: '1px solid var(--border-color)',
    } as CSSProperties,
    settingItemLast: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: 'none',
        paddingBottom: 0,
    } as CSSProperties,
    settingInfoH3: {
        fontSize: '1rem',
        fontWeight: 500,
        color: 'var(--text-primary)',
        margin: '0 0 0.25rem',
    } as CSSProperties,
    settingInfoP: {
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        margin: 0,
    } as CSSProperties,
    toggle: {
        position: 'relative',
        width: '50px',
        height: '28px',
        flexShrink: 0,
    } as CSSProperties,
    toggleInput: {
        opacity: 0,
        width: 0,
        height: 0,
    } as CSSProperties,
    slider: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--border-color)',
        transition: '0.3s',
        borderRadius: '28px',
    } as CSSProperties,
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
    } as CSSProperties,
    infoLabel: {
        color: 'var(--text-secondary)',
    } as CSSProperties,
    infoValue: {
        color: 'var(--text-primary)',
        fontWeight: 500,
    } as CSSProperties,
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        paddingTop: '1rem',
    } as CSSProperties,
};

// CSS for toggle slider before and checked states
const toggleStyles = `
.profile-toggle-slider::before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}
.profile-toggle input:checked + .profile-toggle-slider {
    background-color: var(--accent);
}
.profile-toggle input:checked + .profile-toggle-slider::before {
    transform: translateX(22px);
}
`;

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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSaving(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 3000);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <style>{toggleStyles}</style>
            <div style={pageStyles.container}>
                <div style={pageStyles.content}>
                    <header style={pageStyles.header}>
                        <p style={pageStyles.kicker}>Profile Settings</p>
                        <h1 style={pageStyles.h1}>Privacy & Visibility</h1>
                        <p style={pageStyles.subtitle}>Control how others can see and interact with your personas.</p>
                    </header>

                    <section style={pageStyles.settingsSection}>
                        <h2 style={pageStyles.settingsSectionH2}>Profile Visibility</h2>
                        <p style={pageStyles.sectionDesc}>
                            By default, your profile is private. You must opt-in to make it visible to others.
                        </p>

                        <div style={pageStyles.settingItem}>
                            <div>
                                <h3 style={pageStyles.settingInfoH3}>Public Profile</h3>
                                <p style={pageStyles.settingInfoP}>
                                    Allow anyone with your profile link to view your personas.
                                </p>
                            </div>
                            <label className="profile-toggle" style={pageStyles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                    style={pageStyles.toggleInput}
                                />
                                <span className="profile-toggle-slider" style={pageStyles.slider}></span>
                            </label>
                        </div>

                        <div style={pageStyles.settingItem}>
                            <div>
                                <h3 style={pageStyles.settingInfoH3}>Show in Compatibility Checks</h3>
                                <p style={pageStyles.settingInfoP}>
                                    Allow friends to check compatibility with your personas.
                                </p>
                            </div>
                            <label className="profile-toggle" style={pageStyles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={showCompatibility}
                                    onChange={(e) => setShowCompatibility(e.target.checked)}
                                    style={pageStyles.toggleInput}
                                />
                                <span className="profile-toggle-slider" style={pageStyles.slider}></span>
                            </label>
                        </div>

                        <div style={pageStyles.settingItemLast}>
                            <div>
                                <h3 style={pageStyles.settingInfoH3}>Allow Room Visits</h3>
                                <p style={pageStyles.settingInfoP}>
                                    Let friends visit your persona&apos;s room and leave gifts.
                                </p>
                            </div>
                            <label className="profile-toggle" style={pageStyles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={allowRoomVisits}
                                    onChange={(e) => setAllowRoomVisits(e.target.checked)}
                                    style={pageStyles.toggleInput}
                                />
                                <span className="profile-toggle-slider" style={pageStyles.slider}></span>
                            </label>
                        </div>
                    </section>

                    <section style={pageStyles.settingsSection}>
                        <h2 style={pageStyles.settingsSectionH2}>Account</h2>

                        <div style={pageStyles.infoItem}>
                            <span style={pageStyles.infoLabel}>Email</span>
                            <span style={pageStyles.infoValue}>{user?.email || 'Not set'}</span>
                        </div>

                        <div style={pageStyles.infoItem}>
                            <span style={pageStyles.infoLabel}>Member Since</span>
                            <span style={pageStyles.infoValue}>December 2025</span>
                        </div>
                    </section>

                    <div style={pageStyles.actions}>
                        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
