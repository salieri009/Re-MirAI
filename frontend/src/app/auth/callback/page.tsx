'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '@/lib/api/auth';
import styles from './page.module.css';

/**
 * OAuth Callback Handler
 * 
 * This page handles the redirect from OAuth providers.
 * It extracts tokens from URL parameters and stores them in the auth store.
 */
export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            const accessToken = searchParams.get('access_token');
            const refreshToken = searchParams.get('refresh_token');
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
                // Fetch user details with the access token
                // For now, create a minimal user object from the token
                // In production, you'd decode the JWT or call a /me endpoint
                const mockUser = {
                    id: 'user-' + Date.now(),
                    email: 'user@example.com',
                    name: 'User',
                };

                // Store tokens and user in auth store
                login(accessToken, refreshToken, mockUser);

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
        <div className={styles.container}>
            <div className={styles.card}>
                {status === 'processing' && (
                    <>
                        <div className={styles.spinner}></div>
                        <h2>Completing sign in...</h2>
                        <p>Please wait while we verify your account.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className={styles.successIcon}>✓</div>
                        <h2>Welcome!</h2>
                        <p>Redirecting to your dashboard...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className={styles.errorIcon}>✕</div>
                        <h2>Sign in failed</h2>
                        <p>{errorMessage || 'An error occurred during authentication.'}</p>
                        <button
                            className={styles.retryButton}
                            onClick={() => router.push('/login')}
                        >
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
