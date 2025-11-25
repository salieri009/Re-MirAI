'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { trustInteractions } from '@/lib/micro-interactions';
import styles from './GoogleAuthButton.module.css';

type AuthButtonState = 'idle' | 'loading' | 'success' | 'error';

interface GoogleAuthButtonProps {
  onAuth: () => void;
  onRetry?: () => void;
  state?: AuthButtonState;
  disabled?: boolean;
  statusMessage?: string;
  errorMessage?: string | null;
}

export function GoogleAuthButton({
  onAuth,
  onRetry,
  state = 'idle',
  disabled = false,
  statusMessage,
  errorMessage,
}: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [reducedMotion]);

  const isLoading = state === 'loading';
  const isSuccess = state === 'success';
  const isError = state === 'error';

  return (
    <div ref={containerRef} className={styles.container}>
      <Button
        ref={buttonRef}
        variant="primary"
        size="lg"
        onClick={onAuth}
        onMouseEnter={() => {
          if (!reducedMotion && buttonRef.current) {
            trustInteractions.buttonGlow(buttonRef.current);
          }
        }}
        disabled={disabled || isLoading || isSuccess}
        className={`${styles.button} ${styles[state]}`}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <span>{statusMessage || 'Connecting...'}</span>
          </div>
        )}
        {isSuccess && (
          <div className={styles.successState}>
            <span className={styles.googleIcon}>✅</span>
            <span>Authenticated</span>
          </div>
        )}
        {!isLoading && !isSuccess && (
          <div className={styles.buttonContent}>
            <span className={styles.googleIcon}>🔐</span>
            <span>Sign in with Google</span>
          </div>
        )}
      </Button>
      {state !== 'success' && statusMessage && (
        <p className={styles.statusText} aria-live="polite">
          {statusMessage}
        </p>
      )}
      {isError && errorMessage && (
        <div className={styles.errorCallout} role="alert">
          <p>{errorMessage}</p>
          {onRetry && (
            <button className={styles.retryButton} onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

