'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { conversionInteractions, delightInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import { tokens } from '@/design-tokens';
import styles from './InteractiveHero.module.css';

interface InteractiveHeroProps {
  onStartDiscovery: () => void;
  onSkipAnimation?: () => void;
}

export function InteractiveHero({ onStartDiscovery, onSkipAnimation }: InteractiveHeroProps) {
  const [stage, setStage] = useState<'idle' | 'hover' | 'active' | 'reveal'>('idle');

  const mirrorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCleanup = useRef<(() => void) | null>(null);

  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  // Initialize particle system
  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create particle system
    const cleanup = delightInteractions.particleSystem(canvas, ctx, {
      count: 30,
      color: tokens.emotions.curiosity.primary,
      speed: 0.5,
    });

    particleCleanup.current = cleanup;

    return () => {
      if (particleCleanup.current) {
        particleCleanup.current();
      }
    };
  }, [reducedMotion]);

  // Announce stage transitions for screen reader users
  useEffect(() => {
    const stageMessages: Record<typeof stage, { message: string; priority?: 'polite' | 'assertive' }> = {
      idle: {
        message: 'Interactive mirror ready. Hover or focus to explore.',
      },
      hover: {
        message: 'Mirror reacting to your presence. Click to reveal your persona.',
      },
      active: {
        message: 'Summoning your reflection. Please wait.',
        priority: 'assertive',
      },
      reveal: {
        message: 'Persona preview unlocked. Use the Summon Your Reflection button to continue.',
      },
    };

    const { message, priority } = stageMessages[stage];
    if (message) {
      announce(message, priority);
    }
  }, [announce, stage]);

  // Initial entrance animation
  useEffect(() => {
    if (reducedMotion) return;

    gsap.from(`.${styles.content}`, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from(`.${styles.headline}`, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    });

    gsap.from(`.${styles.subtext}`, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  const handleMirrorHover = () => {
    if (stage === 'idle') {
      setStage('hover');
      if (!reducedMotion && mirrorRef.current) {
        conversionInteractions.mirrorHover(mirrorRef.current);
      }
    }
  };

  const handleMirrorLeave = () => {
    if (stage === 'hover') {
      setStage('idle');
    }
  };

  const handleMirrorClick = async () => {
    if (stage === 'active' || stage === 'reveal') return;

    setStage('active');

    if (!reducedMotion && mirrorRef.current) {
      // Trigger mirror shatter animation
      await conversionInteractions.mirrorShatter(mirrorRef.current);
    }

    setStage('reveal');
  };

  const handleCTAHover = () => {
    if (!reducedMotion && ctaRef.current) {
      conversionInteractions.ctaPulse(ctaRef.current);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Particle background canvas */}
      <canvas ref={canvasRef} className={styles.particleCanvas} />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Who do others believe I am?
          </h1>
          <p className={styles.subtext}>
            Discover your reflection through AI
          </p>

          <div className={styles.mirrorContainer}>
            <div
              ref={mirrorRef}
              className={`${styles.mirror} ${styles[stage]}`}
              onMouseEnter={handleMirrorHover}
              onMouseLeave={handleMirrorLeave}
              onClick={handleMirrorClick}
              role="button"
              tabIndex={0}
              aria-label="Interactive mirror - click to reveal your persona"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMirrorClick();
                }
              }}
            >
              <div className={styles.mirrorGlass}>
                {stage === 'idle' && (
                  <div className={styles.mirrorText}>
                    🪞
                  </div>
                )}
                {stage === 'hover' && (
                  <div className={styles.mirrorText}>
                    Who am I?
                  </div>
                )}
                {stage === 'active' && (
                  <div className={styles.mirrorText}>
                    ✨
                  </div>
                )}
                {stage === 'reveal' && (
                  <div className={styles.personaPreview}>
                    <div className={styles.personaCard}>
                      <div className={styles.personaName}>The Mystic</div>
                      <div className={styles.personaBadge}>SSR ★★★</div>
                      <div className={styles.personaStats}>
                        <div className={styles.stat}>Charisma: ████</div>
                        <div className={styles.stat}>Intellect: ████</div>
                      </div>
                      <p className={styles.previewText}>This could be you</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mirror fragments for shatter effect */}
              <div className={styles.mirrorFragments}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`${styles.fragment} fragment-${i}`} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <Button
              ref={ctaRef}
              variant="primary"
              size="lg"
              onClick={onStartDiscovery}
              onMouseEnter={handleCTAHover}
              className={`${styles.ctaButton} ${stage === 'reveal' ? styles.glowing : ''}`}
            >
              ✨ Summon Your Reflection ✨
            </Button>
          </div>

          {onSkipAnimation && stage !== 'idle' && (
            <button
              onClick={onSkipAnimation}
              className={styles.skipButton}
              aria-label="Skip animation"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
