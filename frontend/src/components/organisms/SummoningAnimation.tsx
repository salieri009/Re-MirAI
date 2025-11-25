'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export function SummoningAnimation({ 
  persona, 
  onComplete, 
  onSkip,
  variant = 'fated' 
}: SummoningAnimationProps) {
  const [stage, setStage] = useState<'initial' | 'processing' | 'forming' | 'reveal'>('initial');

  useEffect(() => {
    const timeline = [
      { stage: 'initial', delay: 0 },
      { stage: 'processing', delay: 2000 },
      { stage: 'forming', delay: 5000 },
      { stage: 'reveal', delay: 8000 }
    ];

    timeline.forEach(({ stage: nextStage, delay }) => {
      const timer = setTimeout(() => {
        setStage(nextStage);
        if (nextStage === 'reveal') {
          setTimeout(() => onComplete(), 2000);
        }
      }, delay);

      return () => clearTimeout(timer);
    });
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {stage === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.stage}
          >
            <div className={styles.sparkles}>✨</div>
            <h2 className={styles.title}>Gathering your Echoes...</h2>
            <div className={styles.particles}>
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.particle}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={styles.stage}
          >
            <motion.div
              className={styles.magicCircle}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <h2 className={styles.title}>Weaving your reflection...</h2>
          </motion.div>
        )}

        {stage === 'forming' && (
          <motion.div
            key="forming"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={styles.stage}
          >
            <motion.div
              className={styles.silhouette}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
            />
            <h2 className={styles.title}>Generating personality...</h2>
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.stage}
          >
            <motion.div
              className={styles.personaCard}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.personaName}>{persona.name}</h1>
              <div className={styles.personaBadge}>
                {persona.archetype} {persona.rarity && `★ ${persona.rarity}`}
              </div>
              <div className={styles.celebration}>✨ PERSONA REVEALED ✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

