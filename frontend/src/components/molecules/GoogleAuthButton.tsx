'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { trustInteractions } from '@/lib/micro-interactions';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

type AuthButtonState = 'idle' | 'loading' | 'success' | 'error';

interface GoogleAuthButtonProps {
  onAuth: () => void;
  onRetry?: () => void;
  state?: AuthButtonState;
  disabled?: boolean;
  statusMessage?: string;
  errorMessage?: string | null;
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.md,
};

const buttonContentStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
};

const loadingStateStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
};

const spinnerStyle: CSSProperties = {
  width: 20,
  height: 20,
  border: `2px solid ${colors.border}`,
  borderTopColor: colors.text,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const successStateStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
};

const googleIconStyle: CSSProperties = {
  fontSize: typography.size.xl,
};

const statusTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  textAlign: 'center',
};

const errorCalloutStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.sm,
  padding: spacing.md,
  background: `${colors.error}15`,
  borderRadius: radius.md,
  border: `1px solid ${colors.error}`,
};

const errorTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.error,
  margin: 0,
};

const retryButtonStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.highlight,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const keyframesStyle = `@keyframes spin { to { transform: rotate(360deg); } }`;

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
    <>
      <style>{keyframesStyle}</style>
      <div ref={containerRef} style={containerStyle}>
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
          aria-busy={isLoading}
          aria-live="polite"
        >
          {isLoading && (
            <div style={loadingStateStyle}>
              <div style={spinnerStyle} />
              <span>{statusMessage || 'Connecting...'}</span>
            </div>
          )}
          {isSuccess && (
            <div style={successStateStyle}>
              <span style={googleIconStyle}>✅</span>
              <span>Authenticated</span>
            </div>
          )}
          {!isLoading && !isSuccess && (
            <div style={buttonContentStyle}>
              <span style={googleIconStyle}>🔐</span>
              <span>Sign in with Google</span>
            </div>
          )}
        </Button>
        {state !== 'success' && statusMessage && (
          <p style={statusTextStyle} aria-live="polite">
            {statusMessage}
          </p>
        )}
        {isError && errorMessage && (
          <div style={errorCalloutStyle} role="alert">
            <p style={errorTextStyle}>{errorMessage}</p>
            {onRetry && (
              <button style={retryButtonStyle} onClick={onRetry}>
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
