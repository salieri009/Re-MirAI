'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${styles.card} ${styles[status]}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{config.title}</h2>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      {progress && status === 'collecting' && (
        <div className={styles.progressSection}>
          <ProgressBar
            current={progress.current}
            total={progress.target}
            label={`${progress.percentage}% Complete`}
          />
        </div>
      )}

      {status === 'ready' && progress && (
        <div className={styles.progressSection}>
          <ProgressBar
            current={progress.target}
            total={progress.target}
            label="100% Complete ✓"
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
    </motion.div>
  );
}

