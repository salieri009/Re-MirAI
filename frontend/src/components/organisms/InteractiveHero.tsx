'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import styles from './InteractiveHero.module.css';

interface InteractiveHeroProps {
  onStartDiscovery: () => void;
  onSkipAnimation?: () => void;
}

export function InteractiveHero({ onStartDiscovery, onSkipAnimation }: InteractiveHeroProps) {
  const [stage, setStage] = useState<'idle' | 'hover' | 'active' | 'reveal'>('idle');
  const [isHovering, setIsHovering] = useState(false);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (stage === 'active') {
      controls.start({
        scale: [1, 1.1, 0.9, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.3 }
      });
    }
  }, [stage, controls]);

  const handleMirrorClick = () => {
    setStage('active');
    
    // Trigger reveal animation
    setTimeout(() => {
      setStage('reveal');
    }, 500);
  };

  const handleMirrorHover = () => {
    setIsHovering(true);
    if (stage === 'idle') {
      setStage('hover');
    }
  };

  const handleMirrorLeave = () => {
    setIsHovering(false);
    if (stage === 'hover') {
      setStage('idle');
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={styles.content}
        >
          <h1 className={styles.headline}>
            Who do others believe I am?
          </h1>
          <p className={styles.subtext}>
            Discover your reflection through AI
          </p>

          <div className={styles.mirrorContainer}>
            <motion.div
              ref={mirrorRef}
              className={`${styles.mirror} ${styles[stage]}`}
              onMouseEnter={handleMirrorHover}
              onMouseLeave={handleMirrorLeave}
              onClick={handleMirrorClick}
              animate={controls}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.mirrorGlass}>
                {stage === 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.mirrorText}
                  >
                    🪞
                  </motion.div>
                )}
                {stage === 'hover' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.mirrorText}
                  >
                    Who am I?
                  </motion.div>
                )}
                {stage === 'active' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.mirrorText}
                  >
                    ✨
                  </motion.div>
                )}
                {stage === 'reveal' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.personaPreview}
                  >
                    <div className={styles.personaCard}>
                      <div className={styles.personaName}>The Mystic</div>
                      <div className={styles.personaBadge}>SSR ★★★</div>
                      <div className={styles.personaStats}>
                        <div className={styles.stat}>Charisma: ████</div>
                        <div className={styles.stat}>Intellect: ████</div>
                      </div>
                      <p className={styles.previewText}>This could be you</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {isHovering && stage === 'hover' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.ripple}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: stage === 'reveal' ? 1 : 0.7,
              y: 0 
            }}
            transition={{ delay: stage === 'reveal' ? 0.5 : 0, duration: 0.6 }}
            className={styles.ctaContainer}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onStartDiscovery}
              className={styles.ctaButton}
            >
              ✨ Summon Your Reflection ✨
            </Button>
          </motion.div>

          {onSkipAnimation && stage !== 'idle' && (
            <button
              onClick={onSkipAnimation}
              className={styles.skipButton}
              aria-label="Skip animation"
            >
              Skip
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

