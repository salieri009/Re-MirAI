'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { MagicCircle } from './MagicCircle';
import { colors, spacing, radius, typography, shadows, CSSProperties } from '@/lib/styles';

interface Persona {
  id: string;
  name: string;
  archetype: string;
  rarity?: string;
}

interface SummoningAnimationProps {
  persona: Persona;
  onComplete: () => void;
  onSkip?: () => void;
  variant?: 'fated' | 'custom';
}

type Stage = 'initial' | 'processing' | 'forming' | 'reveal';

const containerBase: CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
};

const containerFated: CSSProperties = {
  background: `radial-gradient(circle at center, ${colors.primary}20 0%, ${colors.background} 70%)`,
};

const containerCustom: CSSProperties = {
  background: `radial-gradient(circle at center, ${colors.accent}20 0%, ${colors.background} 70%)`,
};

const stageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.lg,
  textAlign: 'center',
};

const titleStyle: CSSProperties = {
  fontSize: typography.size['2xl'],
  fontWeight: typography.weight.semiBold,
  color: colors.text,
};

const sparklesStyle: CSSProperties = {
  fontSize: 64,
  animation: 'pulse 2s ease-in-out infinite',
};

const particlesStyle: CSSProperties = {
  position: 'absolute',
  width: 200,
  height: 200,
};

const particleStyle: CSSProperties = {
  position: 'absolute',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: colors.accent,
  top: '50%',
  left: '50%',
};

const silhouetteStyle: CSSProperties = {
  width: 150,
  height: 200,
  background: `linear-gradient(to top, ${colors.primary}60, transparent)`,
  borderRadius: `${radius.xl}px ${radius.xl}px 0 0`,
  animation: 'pulse 1.5s ease-in-out infinite',
};

const personaCardStyle: CSSProperties = {
  padding: spacing.xxl,
  background: colors.surface,
  borderRadius: radius.xl,
  border: `2px solid ${colors.accent}`,
  boxShadow: `0 0 40px ${colors.accent}40`,
  animation: 'scaleIn 0.5s ease-out',
};

const personaNameStyle: CSSProperties = {
  fontSize: typography.size['3xl'],
  fontWeight: typography.weight.bold,
  color: colors.text,
  marginBottom: spacing.sm,
};

const personaBadgeStyle: CSSProperties = {
  fontSize: typography.size.lg,
  color: colors.accent,
  marginBottom: spacing.md,
};

const celebrationStyle: CSSProperties = {
  fontSize: typography.size.xl,
  color: colors.highlight,
  fontWeight: typography.weight.bold,
};

const skipButtonStyle: CSSProperties = {
  position: 'absolute',
  bottom: spacing.xl,
  right: spacing.xl,
  padding: `${spacing.sm}px ${spacing.lg}px`,
  background: 'transparent',
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  color: colors.textMuted,
  fontSize: typography.size.sm,
  cursor: 'pointer',
  fontFamily: typography.fontSans,
};

const keyframesStyle = `
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
}
@keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}
`;

export function SummoningAnimation({
  persona,
  onComplete,
  onSkip,
  variant = 'fated'
}: SummoningAnimationProps) {
  const [stage, setStage] = useState<Stage>('initial');
  const completionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const particleConfigs = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        dx: Math.random() * 120 - 60,
        dy: Math.random() * 120 - 60,
        delay: index * 0.08,
        duration: 1.6 + Math.random() * 0.8,
      })),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage('reveal');
      completionTimeout.current = setTimeout(onComplete, 500);
      return () => {
        if (completionTimeout.current) clearTimeout(completionTimeout.current);
      };
    }

    const timeline: Array<{ stage: Stage; delay: number }> = [
      { stage: 'initial', delay: 0 },
      { stage: 'processing', delay: 2000 },
      { stage: 'forming', delay: 5000 },
      { stage: 'reveal', delay: 8000 },
    ];

    const timers = timeline.map(({ stage: nextStage, delay }) =>
      setTimeout(() => {
        setStage(nextStage);
        if (nextStage === 'reveal') {
          completionTimeout.current = setTimeout(onComplete, 2000);
        }
      }, delay)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      if (completionTimeout.current) clearTimeout(completionTimeout.current);
    };
  }, [onComplete, prefersReducedMotion]);

  const containerStyleFinal = {
    ...containerBase,
    ...(variant === 'custom' ? containerCustom : containerFated),
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyleFinal}>
        {stage === 'initial' && (
          <div style={stageStyle}>
            <div style={sparklesStyle}>✨</div>
            <h2 style={titleStyle}>Gathering your Echoes...</h2>
            <div style={particlesStyle} aria-hidden="true">
              {particleConfigs.map((particle) => (
                <span
                  key={particle.id}
                  style={{
                    ...particleStyle,
                    animation: `pulse ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div style={stageStyle}>
            <MagicCircle />
            <h2 style={titleStyle}>Weaving your reflection...</h2>
          </div>
        )}

        {stage === 'forming' && (
          <div style={stageStyle}>
            <div style={silhouetteStyle} />
            <h2 style={titleStyle}>Generating personality...</h2>
          </div>
        )}

        {stage === 'reveal' && (
          <div style={stageStyle}>
            <div style={personaCardStyle}>
              <h1 style={personaNameStyle}>{persona.name}</h1>
              <div style={personaBadgeStyle}>
                {persona.archetype} {persona.rarity && `★ ${persona.rarity}`}
              </div>
              <div style={celebrationStyle}>✨ PERSONA REVEALED ✨</div>
            </div>
          </div>
        )}

        {onSkip && stage !== 'reveal' && (
          <button
            onClick={onSkip}
            style={skipButtonStyle}
            aria-label="Skip animation"
          >
            Skip
          </button>
        )}
      </div>
    </>
  );
}
