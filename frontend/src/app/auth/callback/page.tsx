'use client';

import { useEffect, useState, CSSProperties, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';

// Styles
const pageStyles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg-dark)',
        padding: '1rem',
    } as CSSProperties,
    card: {
        background: 'var(--color-surface)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    } as CSSProperties,
    h2: {
        color: 'var(--color-text)',
        margin: '1rem 0 0.5rem',
        fontSize: '1.5rem',
    } as CSSProperties,
    p: {
        color: 'var(--color-text-secondary)',
        margin: 0,
    } as CSSProperties,
    spinner: {
        width: '48px',
        height: '48px',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        margin: '0 auto',
        animation: 'spin 1s linear infinite',
    } as CSSProperties,
    successIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        color: 'white',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
    } as CSSProperties,
    errorIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
    } as CSSProperties,
    retryButton: {
        marginTop: '1.5rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--color-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    } as CSSProperties,
};

// CSS for spinner animation
const spinnerKeyframes = `
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
`;

/**
 * OAuth Callback Handler
 *
 * This page handles the redirect from OAuth providers.
 * It extracts tokens from URL parameters and stores them in the auth store.
 */
function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            const accessToken = searchParams.get('accessToken');
            const refreshToken = searchParams.get('refreshToken');
            const provider = searchParams.get('provider');
            const error = searchParams.get('error');

            if (error) {
                setStatus('error');
                setErrorMessage(decodeURIComponent(error));
                return;
            }

            if (!accessToken || !refreshToken) {
                setStatus('error');
                setErrorMessage('Missing authentication tokens');
                return;
            }

            try {
                // Extract user info from JWT token
                // JWT format: header.payload.signature
                let user = {
                    id: 'user-unknown',
                    email: 'user@example.com',
                    name: 'User',
                };

                try {
                    // Decode JWT payload to extract user info
                    const parts = accessToken.split('.');
                    if (parts.length === 3) {
                        const decodedPayload = JSON.parse(
                            atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
                        );
                        user = {
                            id: decodedPayload.sub || decodedPayload.id || user.id,
                            email: decodedPayload.email || user.email,
                            name: decodedPayload.name || 'User',
                        };
                    }
                } catch (decodeError) {
                    console.warn('Failed to decode JWT, using defaults:', decodeError);
                }

                // Store tokens and user in auth store
                login(accessToken, refreshToken, user);

                setStatus('success');

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
            } catch (err) {
                console.error('Auth callback error:', err);
                setStatus('error');
                setErrorMessage('Failed to process authentication');
            }
        };

        handleCallback();
    }, [searchParams, login, router]);

    return (
        <div style={pageStyles.card}>
            {status === 'processing' && (
                <>
                    <div style={pageStyles.spinner}></div>
                    <h2 style={pageStyles.h2}>Completing sign in...</h2>
                    <p style={pageStyles.p}>Please wait while we verify your account.</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div style={pageStyles.successIcon}>✓</div>
                    <h2 style={pageStyles.h2}>Welcome!</h2>
                    <p style={pageStyles.p}>Redirecting to your dashboard...</p>
                </>
            )}

            {status === 'error' && (
                <>
                    <div style={pageStyles.errorIcon}>✕</div>
                    <h2 style={pageStyles.h2}>Sign in failed</h2>
                    <p style={pageStyles.p}>{errorMessage || 'An error occurred during authentication.'}</p>
                    <button style={pageStyles.retryButton} onClick={() => router.push('/login')}>
                        Try Again
                    </button>
                </>
            )}
        </div>
    );
}

// Loading fallback for Suspense
function LoadingFallback() {
    return (
        <div style={pageStyles.card}>
            <div style={pageStyles.spinner}></div>
            <h2 style={pageStyles.h2}>Loading...</h2>
            <p style={pageStyles.p}>Please wait...</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <>
            <style>{spinnerKeyframes}</style>
            <div style={pageStyles.container}>
                <Suspense fallback={<LoadingFallback />}>
                    <AuthCallbackContent />
                </Suspense>
            </div>
        </>
    );
}

