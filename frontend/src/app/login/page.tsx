'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { authApi } from '@/lib/api/auth';
import { trackEvent } from '@/lib/analytics';
import { useAuthStore } from '@/stores/authStore';
import { GoogleAuthButton } from '@/components/molecules/GoogleAuthButton';
import { TrustBadge } from '@/components/molecules/TrustBadge';
import { Button } from '@/components/atoms/Button';
import { MirrorCanvas } from '@/components/organisms/MirrorCanvas/MirrorCanvas';
import { trustInteractions } from '@/lib/micro-interactions';
import { useReducedMotion, useAnnouncement } from '@/hooks/useAccessibility';
import styles from './page.module.css';

type AuthState = 'idle' | 'loading' | 'success' | 'error';

const TRUST_BADGES = [
  {
    icon: '🔐',
    label: 'Secure OAuth',
    description: 'Google-verified authentication',
  },
  {
    icon: '🔒',
    label: 'Privacy First',
    description: '100% anonymous responses',
  },
  {
    icon: '⚡',
    label: 'No Password',
    description: 'One-click access',
  },
];

// Error message dictionary for consistent, user-friendly errors
const ERROR_MESSAGES: Record<string, string> = {
  network: 'Connection issue. Check your internet and try again.',
  oauth_cancelled: 'Sign in cancelled. Ready to try again?',
  server: 'Our servers hiccuped. Give it another shot.',
  timeout: 'Request timed out. Please try again.',
  unknown: 'Something went wrong. Let\'s try that again.',
};

// Helper to extract error type from error object
function getErrorType(error: any): string {
  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('network')) {
    return 'network';
  }
  if (error?.code === 'OAUTH_CANCELLED' || error?.message?.includes('cancelled')) {
    return 'oauth_cancelled';
  }
  if (error?.status >= 500 || error?.message?.includes('server')) {
    return 'server';
  }
  if (error?.code === 'TIMEOUT' || error?.message?.includes('timeout')) {
    return 'timeout';
  }
  return 'unknown';
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [statusMessage, setStatusMessage] = useState('Connecting to Google...');
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const successCheckRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  // Initial entrance animation
  useEffect(() => {
    if (!reducedMotion && cardRef.current) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [reducedMotion]);

  // Loading state carousel
  useEffect(() => {
    if (authState === 'loading') {
      const messages = [
        'Connecting to Google...',
        'Verifying your account...',
        'Almost there...',
      ];

      const cleanup = trustInteractions.loadingStates(
        setStatusMessage,
        messages,
        2000
      );

      return cleanup;
    }
  }, [authState]);

  const handleGoogleAuth = async () => {
    if (authState === 'loading') return;

    setAuthState('loading');
    setError(null);
    trackEvent('auth.start', { provider: 'google' });
    announce('Authenticating with Google', 'polite');

    try {
      const response = await authApi.googleLogin('mock-id-token');
      login(response.accessToken, response.refreshToken, response.user);
      setStatusMessage('Welcome back. Redirecting to your dashboard...');
      setAuthState('success');
      announce('Login successful! Redirecting…', 'polite');
      trackEvent('auth.success', { provider: 'google' });
      
      // Success checkmark animation
      if (!reducedMotion && successCheckRef.current) {
        gsap.fromTo(
          successCheckRef.current,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.4,
            ease: 'back.out(1.7)',
          }
        );
      }
      
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err: any) {
      console.error('Login failed:', err);
      const errorType = getErrorType(err);
      const errorMsg = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.unknown;
      setError(errorMsg);
      setStatusMessage(errorMsg);
      setAuthState('error');
      announce(errorMsg, 'assertive');
      trackEvent('auth.error', { provider: 'google', type: errorType, message: errorMsg });
    }
  };

  const handleRetry = () => {
    setError(null);
    setAuthState('idle');
    setStatusMessage('Connecting to Google...');
    handleGoogleAuth();
  };

  return (
    <main className={styles.main}>
      {/* Particle background canvas */}
      <MirrorCanvas variant="background" intensity={0.5} />

      <div ref={cardRef} className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>✨ Re:MirAI</h1>
          <h2 className={styles.subtitle}>Ready to discover your reflection?</h2>
        </div>

        <div className={styles.content}>
          <GoogleAuthButton
            onAuth={handleGoogleAuth}
            onRetry={handleRetry}
            state={authState}
            statusMessage={statusMessage}
            errorMessage={error}
          />

          <p className={styles.privacyPromise}>
            We only use your email to save your progress. No data is sold.
          </p>

          <p className={styles.helpText}>
            Quick, secure, simple
          </p>
        </div>

        {/* Trust Badges */}
        <div className={styles.trustBadges} role="list">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} role="listitem">
              <TrustBadge
                icon={badge.icon}
                label={badge.label}
                description={badge.description}
                aria-label={`${badge.label} — ${badge.description}`}
              />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Button
            ref={backButtonRef}
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            onMouseEnter={() => {
              if (!reducedMotion && backButtonRef.current) {
                trustInteractions.buttonGlow(backButtonRef.current);
              }
            }}
            aria-label="Return to home page"
          >
            ← Back to home
          </Button>
        </div>
        
        {/* Success checkmark overlay */}
        {authState === 'success' && (
          <div ref={successCheckRef} className={styles.successOverlay} aria-hidden="true">
            <div className={styles.checkmark}>✓</div>
          </div>
        )}
      </div>
    </main>
  );
}
