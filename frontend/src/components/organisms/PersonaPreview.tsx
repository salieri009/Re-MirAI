'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './PersonaPreview.module.css';

interface PersonaPreviewProps {
  isVisible: boolean;
}

export function PersonaPreview({ isVisible }: PersonaPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      if (reducedMotion) {
        timeline.to(containerRef.current, { opacity: 1, duration: 0.3 });
        return;
      }

      // Reveal container
      timeline.fromTo(containerRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 }
      );

      // Staggered element reveal
      timeline.from(`.${styles.name}`, { opacity: 0, y: 20, duration: 0.4 }, '-=0.4');
      timeline.from(`.${styles.badge}`, { opacity: 0, scale: 0, duration: 0.4 }, '-=0.3');
      timeline.from(`.${styles.visual}`, { opacity: 0, scale: 0.5, rotation: -180, duration: 0.6 }, '-=0.3');
      
      // Stats animation
      timeline.from(`.${styles.statRow}`, { 
        opacity: 0, 
        x: -20, 
        stagger: 0.1, 
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');

      // Fill stat bars
      timeline.to(`.${styles.statFill}`, {
        width: (i, target) => target.dataset.value + '%',
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2
      }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, reducedMotion]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className={styles.previewContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.name}>The Mystic</h3>
          <span className={styles.badge}>SSR ★★★</span>
        </div>

        <div className={styles.visual}>
          🔮
        </div>

        <div className={styles.stats}>
          <div className={styles.statRow}>
            <span>Charisma</span>
            <div className={styles.statBar}>
              <div className={styles.statFill} data-value="85" />
            </div>
          </div>
          <div className={styles.statRow}>
            <span>Intellect</span>
            <div className={styles.statBar}>
              <div className={styles.statFill} data-value="92" />
            </div>
          </div>
          <div className={styles.statRow}>
            <span>Empathy</span>
            <div className={styles.statBar}>
              <div className={styles.statFill} data-value="78" />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          This could be you...
        </div>
      </div>
    </div>
  );
}
