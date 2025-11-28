'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ProgressBar } from './ProgressBar';
import styles from './StatusCard.module.css';

interface StatusCardProps {
  status: 'empty' | 'collecting' | 'ready' | 'active';
  progress?: {
    current: number;
    target: number;
    percentage: number;
  };
  onAction?: () => void;
  actionLabel?: string;
  message?: string;
}

export function StatusCard({
  status,
  progress,
  onAction,
  actionLabel,
  message
}: StatusCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [status, prefersReducedMotion]);
  const getStatusConfig = () => {
    switch (status) {
      case 'empty':
        return {
          title: '🗺️ Your Journey Begins',
          subtitle: 'Start collecting feedback to discover your persona',
          variant: 'primary' as const,
          pulse: true
        };
      case 'collecting':
        return {
          title: '🔮 Echoes Collected',
          subtitle: progress
            ? `${progress.current} of ${progress.target} responses received`
            : 'Collecting feedback...',
          variant: 'secondary' as const,
          shimmer: true
        };
      case 'ready':
        return {
          title: '⚡ SUMMON READY ⚡',
          subtitle: 'All responses collected! Ready to create your persona.',
          variant: 'primary' as const,
          glow: true
        };
      case 'active':
        return {
          title: '✨ Persona Active',
          subtitle: 'Your persona is ready to chat',
          variant: 'primary' as const
        };
      default:
        return {
          title: 'Status',
          subtitle: '',
          variant: 'primary' as const
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div ref={cardRef} className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{config.title}</h2>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      {progress && status === 'collecting' && (
        <div className={styles.progressSection}>
          <ProgressBar
            value={progress.percentage}
            label={`${progress.current} of ${progress.target} responses`}
          />
        </div>
      )}

      {status === 'ready' && progress && (
        <div className={styles.progressSection}>
          <ProgressBar
            value={100}
            label="All responses collected ✓"
            className={styles.completeBar}
          />
        </div>
      )}

      {onAction && actionLabel && (
        <div className={styles.actionSection}>
          <Button
            variant={config.variant}
            size="lg"
            onClick={onAction}
            className={config.glow ? styles.glowButton : ''}
          >
            {actionLabel}
          </Button>
        </div>
      )}

      {config.subtitle && (
        <p className={styles.subtitle}>{config.subtitle}</p>
      )}
    </div>
  );
}

