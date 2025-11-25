'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import styles from './GoogleAuthButton.module.css';

interface GoogleAuthButtonProps {
  onAuth: () => void;
  loading?: boolean;
  disabled?: boolean;
  statusMessage?: string;
}

export function GoogleAuthButton({ 
  onAuth, 
  loading = false, 
  disabled = false,
  statusMessage 
}: GoogleAuthButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={styles.container}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={onAuth}
        disabled={disabled || loading}
        className={styles.button}
        aria-busy={loading}
        aria-live="polite"
      >
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <span>{statusMessage || 'Connecting...'}</span>
          </div>
        ) : (
          <div className={styles.buttonContent}>
            <span className={styles.googleIcon}>🔐</span>
            <span>Sign in with Google</span>
          </div>
        )}
      </Button>
      {loading && statusMessage && (
        <p className={styles.statusText} aria-live="polite">
          {statusMessage}
        </p>
      )}
    </motion.div>
  );
}

