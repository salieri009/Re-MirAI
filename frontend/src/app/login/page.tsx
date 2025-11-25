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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [statusMessage, setStatusMessage] = useState('Connecting to Google...');
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  // Particle background effect
  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Simple ambient particles
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(217, 70, 239, 0.1)';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [reducedMotion]);

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
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err: any) {
      console.error('Login failed:', err);
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      setStatusMessage('We hit a snag. Try again.');
      setAuthState('error');
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
      {/* Particle background canvas */}
      <canvas ref={canvasRef} className={styles.particleCanvas} />

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
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            aria-label="Return to home page"
          >
            ← Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
