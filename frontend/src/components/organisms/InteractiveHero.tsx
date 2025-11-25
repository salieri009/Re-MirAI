'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { conversionInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import { trackEvent } from '@/lib/analytics';
import { PersonaPreview } from './PersonaPreview';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';
import styles from './InteractiveHero.module.css';

interface InteractiveHeroProps {
  onStartDiscovery: () => void;
  onSkipAnimation?: () => void;
}

// New component for accessibility announcements
const HeroAnnouncement = ({ message }: { message: string }) => (
  <div className={styles.heroAnnouncement} role="status" aria-live="polite">
    {message}
  </div>
);

export function InteractiveHero({ onStartDiscovery, onSkipAnimation }: InteractiveHeroProps) {
  const [stage, setStage] = useState<'idle' | 'hover' | 'active' | 'reveal'>('idle');
  const [isHeroReady, setHeroReady] = useState(false);
  const [liveMessage, setLiveMessage] = useState('Preparing interactive mirror experience.');

  const mirrorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), reducedMotion ? 150 : 400);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Announce stage transitions for screen reader users
  const stageMessages = useMemo<Record<typeof stage, { message: string; priority?: 'polite' | 'assertive' }>>(() => ({
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
  }), []);

  useEffect(() => {
    const { message, priority } = stageMessages[stage];
    setLiveMessage(message);
    if (message) {
      announce(message, priority);
    }
  }, [announce, stage, stageMessages]);

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
      trackEvent('hero.mirror.hover');
      if (!reducedMotion && mirrorRef.current) {
        conversionInteractions.mirrorHover(mirrorRef.current);
      }
    }
  };

  const handleMirrorLeave = () => {
    if (stage === 'hover') {
      setStage('idle');
      trackEvent('hero.mirror.leave');
    }
  };

  const handleMirrorClick = async () => {
    if (stage === 'active' || stage === 'reveal' || !isHeroReady) return;

    setStage('active');
    trackEvent('hero.mirror.break');

    if (!reducedMotion && mirrorRef.current) {
      // Trigger mirror shatter animation
      const tl = conversionInteractions.mirrorShatter(mirrorRef.current);
      timelineRef.current = tl;
      await tl;
    }

    setStage('reveal');
  };

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setStage('reveal');
    if (onSkipAnimation) onSkipAnimation();
  };

  const handleCTAHover = () => {
    if (!reducedMotion && ctaRef.current) {
      conversionInteractions.ctaPulse(ctaRef.current);
    }
  };

  const handleStartDiscovery = () => {
    trackEvent('hero.cta.startDiscovery', { stage });
    onStartDiscovery();
  };

  return (
    <section className={styles.hero}>
      {/* Particle background canvas */}
      <MirrorCanvas variant="background" intensity={0.8} />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heroAnnouncement} role="status" aria-live="polite">
            {liveMessage}
          </div>
          <h1 className={styles.headline}>
            Discover How Your Friends Actually See You
          </h1>
          <p className={styles.subtext}>
            Tap the mirror. An AI persona blooms from anonymous echoes. Short flow, instant anime vibe.
          </p>

          <div className={styles.mirrorContainer}>
            {!isHeroReady && (
              <div className={styles.skeleton} aria-hidden="true">
                <div className={styles.skeletonGlow} />
              </div>
            )}
            <div className={styles.mirrorShell}>
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
                  <MirrorCanvas variant="mirror" intensity={0.5} />
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
                  <PersonaPreview isVisible={stage === 'reveal'} />
                </div>

                {/* Mirror fragments for shatter effect */}
                <div className={styles.mirrorFragments}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`${styles.fragment} fragment-${i}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <Button
              ref={ctaRef}
              variant="primary"
              size="lg"
              onClick={handleStartDiscovery}
              onMouseEnter={handleCTAHover}
              className={`${styles.ctaButton} ${stage === 'reveal' ? styles.glowing : ''}`}
            >
              Create Your AI Mirror (Free)
            </Button>
            <p className={styles.trustText}>
              Free start • Anonymous • No card
            </p>
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
