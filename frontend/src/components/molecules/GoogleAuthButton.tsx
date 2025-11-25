'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  onAuth: () => void;
  loading?: boolean;
  disabled?: boolean;
  statusMessage?: string;
}

export function GoogleAuthButton({
  onAuth,
  loading = false,
  disabled = false,
  statusMessage,
}: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={styles.container}>
      <Button
        variant="primary"
        size="lg"
        onClick={onAuth}
        disabled={disabled || loading}
        className={styles.button}
        aria-busy={loading}
        aria-live="polite"
      >
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <span>{statusMessage || 'Connecting...'}</span>
          </div>
        ) : (
          <div className={styles.buttonContent}>
            <span className={styles.googleIcon}>🔐</span>
            <span>Sign in with Google</span>
          </div>
        )}
      </Button>
      {loading && statusMessage && (
        <p className={styles.statusText} aria-live="polite">
          {statusMessage}
        </p>
      )}
    </div>
  );
}

