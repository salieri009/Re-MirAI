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
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { ProgressTracker } from '@/components/molecules/ProgressTracker';
import { trustInteractions } from '@/lib/micro-interactions';
import { useReducedMotion, useAnnouncement } from '@/hooks/useAccessibility';
import styles from './page.module.css';

type AuthState = 'idle' | 'loading' | 'success' | 'error';
type ProgressStep = 'authenticate' | 'verify' | 'welcome';

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

const SECURITY_POINTS = [
  'OAuth tokens are never stored client-side.',
  'Survey answers remain anonymous until you approve a persona.',
  'Session expires automatically after 20 minutes of inactivity.',
];

const PROGRESS_METRICS = [
  { label: 'Survey constellations completed', value: 64 },
  { label: 'Persona synthesis queue', value: 32 },
  { label: 'Community trust index', value: 92 },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [statusMessage, setStatusMessage] = useState('Connecting to Google...');
  const [error, setError] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState<ProgressStep>('authenticate');

  const cardRef = useRef<HTMLDivElement>(null);

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
    setProgressStep('authenticate');
    trackEvent('auth.start', { provider: 'google' });
    announce('Authenticating with Google', 'polite');

    try {
      // Simulate progress steps
      setTimeout(() => setProgressStep('verify'), 1000);
      
      const response = await authApi.googleLogin('mock-id-token');
      login(response.accessToken, response.refreshToken, response.user);
      
      setProgressStep('welcome');
      setStatusMessage('Welcome back. Redirecting to your dashboard...');
      setAuthState('success');
      announce('Login successful! Redirecting…', 'polite');
      trackEvent('auth.success', { provider: 'google' });
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err: any) {
      console.error('Login failed:', err);
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      setStatusMessage('We hit a snag. Try again.');
      setAuthState('error');
      setProgressStep('authenticate'); // Reset on error
      announce(errorMsg, 'assertive');
      trackEvent('auth.error', { provider: 'google', message: errorMsg });
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
      <section className={styles.showcase}>
        <p className={styles.kicker}>ver2 onboarding</p>
        <h1 className={styles.headline}>Authorize the ritual console.</h1>
        <p className={styles.copy}>
          The Login Page follows the ver2 spec: cinematic gradient, trust checklist, and real-time
          telemetry from the Summoning pipeline.
        </p>

        <ul className={styles.pointList}>
          {SECURITY_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className={styles.metricGrid}>
          {PROGRESS_METRICS.map((metric) => (
            <ProgressBar key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </section>

      <div className={styles.cardWrapper}>
        <MirrorCanvas variant="background" intensity={0.6} />

        <div ref={cardRef} className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>✨ Re:MirAI</h1>
            <h2 className={styles.subtitle}>Ready to discover your reflection?</h2>
          </div>

          <div className={styles.content}>
            {authState === 'loading' && (
              <ProgressTracker currentStep={progressStep} className={styles.progressTracker} />
            )}
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

            <p className={styles.helpText}>Quick, secure, simple</p>
          </div>

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
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              aria-label="Return to home page"
            >
              ← Back to home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
