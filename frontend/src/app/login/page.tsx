'use client';

import { useEffect, useRef, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { authApi } from '@/lib/api/auth';
import { trackEvent } from '@/lib/analytics';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/lib/toast';
import { SocialAuthButton } from '@/components/molecules/SocialAuthButton';
import { TrustBadge } from '@/components/molecules/TrustBadge';
import { Button } from '@/components/atoms/Button';
import { MirrorCanvas } from '@/components/organisms/MirrorCanvas/MirrorCanvas';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { ProgressTracker } from '@/components/molecules/ProgressTracker';
import { trustInteractions } from '@/lib/micro-interactions';
import { useReducedMotion, useAnnouncement } from '@/hooks/useAccessibility';

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
  { label: 'Active surveys', value: 64 },
  { label: 'Personas created', value: 32 },
  { label: 'User satisfaction', value: 92 },
];

// Styles
const pageStyles = {
  main: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 0.9fr) minmax(360px, 1fr)',
    gap: 'var(--space-3xl)',
    padding: 'var(--space-4xl)',
    background: `radial-gradient(circle at top left, rgba(132, 94, 194, 0.45), transparent),
            radial-gradient(circle at bottom right, rgba(0, 201, 167, 0.35), transparent),
            var(--color-bg-dark)`,
  } as CSSProperties,
  showcase: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
    padding: 'var(--space-3xl)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(10, 1, 18, 0.6)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
  } as CSSProperties,
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: '0.35em',
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  headline: {
    fontSize: 'clamp(2rem, 3vw, 2.75rem)',
    fontWeight: 'var(--font-weight-extrabold)',
  } as CSSProperties,
  copy: {
    color: 'var(--color-text-muted)',
    fontSize: '1.1rem',
    lineHeight: 'var(--line-height-relaxed)',
  } as CSSProperties,
  pointList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 0,
    margin: 0,
  } as CSSProperties,
  pointListItem: {
    paddingLeft: 'var(--space-xl)',
    position: 'relative',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  metricGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  } as CSSProperties,
  cardWrapper: {
    position: 'relative',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  } as CSSProperties,
  card: {
    position: 'relative',
    zIndex: 1,
    padding: 'var(--space-4xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2xl)',
  } as CSSProperties,
  header: {
    textAlign: 'center',
  } as CSSProperties,
  title: {
    fontSize: '2.25rem',
    marginBottom: 'var(--space-xs)',
  } as CSSProperties,
  subtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '1.1rem',
  } as CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
    alignItems: 'center',
  } as CSSProperties,
  helpText: {
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    textAlign: 'center',
  } as CSSProperties,
  privacyPromise: {
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    textAlign: 'center',
  } as CSSProperties,
  trustBadges: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 'var(--space-md)',
  } as CSSProperties,
  footer: {
    textAlign: 'center',
  } as CSSProperties,
  progressTracker: {
    width: '100%',
    marginBottom: 'var(--space-lg)',
  } as CSSProperties,
  authButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    width: '100%',
    maxWidth: '320px',
  } as CSSProperties,
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.9rem',
    textAlign: 'center',
    padding: 'var(--space-sm) var(--space-md)',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  } as CSSProperties,
};

// CSS for li::before pseudo-element
const listItemStyles = `
.login-list-item::before {
    content: '◆';
    position: absolute;
    left: 0;
    color: var(--color-accent);
}
`;

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
      const messages = ['Connecting to Google...', 'Verifying your account...', 'Almost there...'];

      const cleanup = trustInteractions.loadingStates(setStatusMessage, messages, 2000);

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
      const errorMsg = err.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
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
    <>
      <style>{listItemStyles}</style>
      <main style={pageStyles.main}>
        <section style={pageStyles.showcase}>
          <p style={pageStyles.kicker}>secure sign in</p>
          <h1 style={pageStyles.headline}>Sign in to continue</h1>
          <p style={pageStyles.copy}>
            One-click authentication with your favorite provider. Your data stays private and secure.
          </p>

          <ul style={pageStyles.pointList}>
            {SECURITY_POINTS.map((point) => (
              <li key={point} className="login-list-item" style={pageStyles.pointListItem}>
                {point}
              </li>
            ))}
          </ul>

          <div style={pageStyles.metricGrid}>
            {PROGRESS_METRICS.map((metric) => (
              <ProgressBar key={metric.label} label={metric.label} value={metric.value} />
            ))}
          </div>
        </section>

        <div style={pageStyles.cardWrapper}>
          <MirrorCanvas variant="background" intensity={0.6} />

          <div ref={cardRef} style={pageStyles.card}>
            <div style={pageStyles.header}>
              <h1 style={pageStyles.title}>✨ Re:MirAI</h1>
              <h2 style={pageStyles.subtitle}>Ready to discover your reflection?</h2>
            </div>

            <div style={pageStyles.content}>
              {authState === 'loading' && (
                <ProgressTracker currentStep={progressStep} style={pageStyles.progressTracker} />
              )}

              {/* Multi-provider Social Auth Buttons */}
              <div style={pageStyles.authButtons}>
                <SocialAuthButton provider="google" />
                <SocialAuthButton provider="kakao" />
                <SocialAuthButton provider="apple" />
              </div>

              {error && <p style={pageStyles.errorMessage}>{error}</p>}

              <p style={pageStyles.privacyPromise}>
                We only use your email to save your progress. No data is sold.
              </p>

              <p style={pageStyles.helpText}>Quick, secure, simple</p>
            </div>

            <div style={pageStyles.trustBadges} role="list">
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

            <div style={pageStyles.footer}>
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
    </>
  );
}
