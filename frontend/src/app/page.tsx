'use client';

import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { InteractiveHero } from '@/components/organisms/InteractiveHero';
import { FeatureShowcase } from '@/components/organisms/FeatureShowcase';
import styles from './page.module.css';

export default function LandingPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleGoogleLogin = async () => {
    try {
      // Demo Mode: Skip actual Google OAuth, use mock
      // TODO: Replace with actual Google OAuth when backend is ready
      const response = await authApi.googleLogin('mock-id-token');
      login(response.accessToken, response.refreshToken, response.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <main className={styles.main}>
      <InteractiveHero onStartDiscovery={handleGoogleLogin} />
      <FeatureShowcase />
    </main>
  );
}
