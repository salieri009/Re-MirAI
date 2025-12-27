'use client';

import React from 'react';
import styles from './SocialAuthButton.module.css';

type AuthProvider = 'google' | 'kakao' | 'apple';

interface SocialAuthButtonProps {
    provider: AuthProvider;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const providerConfig = {
    google: {
        label: 'Continue with Google',
        icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
        ),
        className: styles.google,
    },
    kakao: {
        label: 'Continue with Kakao',
        icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#000000" d="M12 3C6.48 3 2 6.69 2 11.2c0 2.88 1.86 5.41 4.67 6.87-.15.55-.96 3.53-.99 3.76 0 0-.02.17.09.23.11.07.23.02.23.02.3-.04 3.51-2.32 4.06-2.71.62.09 1.27.14 1.94.14 5.52 0 10-3.69 10-8.2S17.52 3 12 3z" />
            </svg>
        ),
        className: styles.kakao,
    },
    apple: {
        label: 'Continue with Apple',
        icon: (
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
        ),
        className: styles.apple,
    },
};

/**
 * Social Auth Button Component
 * 
 * Unified button component for social login providers.
 * Redirect-based OAuth: clicks navigate to backend auth endpoint.
 */
export function SocialAuthButton({
    provider,
    onClick,
    disabled = false,
    loading = false,
}: SocialAuthButtonProps) {
    const config = providerConfig[provider];
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    const handleClick = () => {
        if (disabled || loading) return;

        if (onClick) {
            onClick();
        } else {
            // Default behavior: redirect to OAuth endpoint
            window.location.href = `${apiBaseUrl}/v1/auth/${provider}`;
        }
    };

    return (
        <button
            className={`${styles.button} ${config.className} ${disabled ? styles.disabled : ''}`}
            onClick={handleClick}
            disabled={disabled || loading}
            aria-label={config.label}
        >
            {loading ? (
                <span className={styles.spinner}></span>
            ) : (
                <>
                    <span className={styles.icon}>{config.icon}</span>
                    <span className={styles.label}>{config.label}</span>
                </>
            )}
        </button>
    );
}
