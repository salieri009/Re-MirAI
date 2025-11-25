'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './SummoningAnimation.module.css';

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

export function SummoningAnimation({
  persona,
  onComplete,
  onSkip,
  variant = 'fated'
}: SummoningAnimationProps) {
  const [stage, setStage] = useState<Stage>('initial');
  const completionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const containerVariantClass =
    variant === 'custom' ? styles.containerCustom : styles.containerFated;

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

  return (
    <div className={`${styles.container} ${containerVariantClass}`}>
      {stage === 'initial' && (
        <div className={`${styles.stage} ${styles.stageInitial}`}>
          <div className={styles.sparkles}>✨</div>
          <h2 className={styles.title}>Gathering your Echoes...</h2>
          <div className={styles.particles} aria-hidden="true">
            {particleConfigs.map((particle) => (
              <span
                key={particle.id}
                className={styles.particle}
                style={
                  {
                    '--dx': `${particle.dx}px`,
                    '--dy': `${particle.dy}px`,
                    '--delay': `${particle.delay}s`,
                    '--duration': `${particle.duration}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      )}

      {stage === 'processing' && (
        <div className={`${styles.stage} ${styles.stageProcessing}`}>
          <div className={styles.magicCircle} />
          <h2 className={styles.title}>Weaving your reflection...</h2>
        </div>
      )}

      {stage === 'forming' && (
        <div className={`${styles.stage} ${styles.stageForming}`}>
          <div className={styles.silhouette} />
          <h2 className={styles.title}>Generating personality...</h2>
        </div>
      )}

      {stage === 'reveal' && (
        <div className={`${styles.stage} ${styles.stageReveal}`}>
          <div className={styles.personaCard}>
            <h1 className={styles.personaName}>{persona.name}</h1>
            <div className={styles.personaBadge}>
              {persona.archetype} {persona.rarity && `★ ${persona.rarity}`}
            </div>
            <div className={styles.celebration}>✨ PERSONA REVEALED ✨</div>
          </div>
        </div>
      )}

      {onSkip && stage !== 'reveal' && (
        <button
          onClick={onSkip}
          className={styles.skipButton}
          aria-label="Skip animation"
        >
          Skip
        </button>
      )}
    </div>
  );
}

