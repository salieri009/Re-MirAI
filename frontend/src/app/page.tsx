'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { InteractiveHero } from '@/components/organisms/InteractiveHero';
import { FeatureShowcase } from '@/components/organisms/FeatureShowcase';
import styles from './page.module.css';

export default function LandingPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const handleGoogleLogin = async () => {
    try {
      // Demo Mode: Skip actual Google OAuth, use mock
      // TODO: Replace with actual Google OAuth when backend is ready
      const response = await authApi.googleLogin('mock-id-token');
      login(response.accessToken, response.refreshToken, response.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <main className={styles.main}>
      {/* Minimal Header per KickoffLabs: Reduced Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>
            Re:MirAI
          </Link>
          {isAuthenticated ? (
            <Link href="/dashboard" className={styles.loginLink}>
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Log In
            </Link>
          )}
        </div>
      </header>

      <InteractiveHero onStartDiscovery={handleGoogleLogin} />
      <FeatureShowcase />
    </main>
  );
}
