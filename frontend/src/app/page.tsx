'use client';

import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { InteractiveHero } from '@/components/organisms/InteractiveHero';
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
      
      <section className={styles.socialProof}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create Survey</h3>
            <p>Generate a unique survey link to share with friends</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Friends Vote</h3>
            <p>Your friends answer questions anonymously</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Reveal Persona</h3>
            <p>AI creates a unique persona based on their responses</p>
          </div>
        </div>
      </section>
    </main>
  );
}
