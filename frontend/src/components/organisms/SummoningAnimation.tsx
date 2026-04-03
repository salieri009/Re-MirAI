'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { MagicCircle } from './MagicCircle';

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

  const particleConfigs = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, index) => ({ id: index })),
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
      <div
        className={clsx(
          'summoning-overlay',
          variant === 'custom' ? 'summoning-overlay-custom' : 'summoning-overlay-fated'
        )}
      >
        {stage === 'initial' && (
          <div className="summoning-stage">
            <div className="summoning-sparkles">✨</div>
            <h2 className="summoning-title">Gathering your Echoes...</h2>
            <div className="summoning-particles" aria-hidden="true">
              {particleConfigs.map((particle) => (
                <span key={particle.id} className="summoning-particle" />
              ))}
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div className="summoning-stage">
            <MagicCircle />
            <h2 className="summoning-title">Weaving your reflection...</h2>
          </div>
        )}

        {stage === 'forming' && (
          <div className="summoning-stage">
            <div className="summoning-silhouette" />
            <h2 className="summoning-title">Generating personality...</h2>
          </div>
        )}

        {stage === 'reveal' && (
          <div className="summoning-stage">
            <div className="summoning-persona-card">
              <h1 className="summoning-persona-name">{persona.name}</h1>
              <div className="summoning-persona-badge">
                {persona.archetype} {persona.rarity && `★ ${persona.rarity}`}
              </div>
              <div className="summoning-celebration">✨ PERSONA REVEALED ✨</div>
            </div>
          </div>
        )}

        {onSkip && stage !== 'reveal' && (
          <button
            onClick={onSkip}
            className="summoning-skip"
            aria-label="Skip animation"
          >
            Skip
          </button>
        )}
      </div>
  );
}
