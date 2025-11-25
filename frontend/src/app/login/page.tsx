'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { GoogleAuthButton } from '@/components/molecules/GoogleAuthButton';
import { Button } from '@/components/atoms/Button';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Connecting to Google...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      const messages = [
        'Connecting to Google...',
        'Verifying your account...',
        'Almost there...'
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % messages.length;
        setStatusMessage(messages[index]);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.googleLogin('mock-id-token');
      login(response.accessToken, response.refreshToken, response.user);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || '로그인에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleGoogleAuth();
  };

  return (
    <main className={styles.main}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={styles.card}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>✨ Re:MirAI</h1>
          <h2 className={styles.subtitle}>Ready to discover your reflection?</h2>
        </div>

        <div className={styles.content}>
          <GoogleAuthButton
            onAuth={handleGoogleAuth}
            loading={isLoading}
            disabled={isLoading}
            statusMessage={statusMessage}
          />
          
          <p className={styles.helpText}>
            Quick, secure, simple
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.error}
            >
              <p className={styles.errorMessage}>{error}</p>
              <Button variant="ghost" size="sm" onClick={handleRetry}>
                Try Again
              </Button>
            </motion.div>
          )}
        </div>

        <div className={styles.footer}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            aria-label="Return to home page"
          >
            ← Back to home
          </Button>
        </div>
      </motion.div>
    </main>
  );
}

