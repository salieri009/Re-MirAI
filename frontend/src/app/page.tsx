'use client';

import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { InteractiveHero } from '@/components/organisms/InteractiveHero';
import { HowItWorks } from '@/components/organisms/HowItWorks';
import { Features } from '@/components/organisms/Features';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import styles from './page.module.css';

export default function LandingPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const handleGoogleLogin = async () => {
    try {
      // Demo Mode: Skip actual Google OAuth, use mock
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
      <Header />
      <InteractiveHero />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}
