'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { DashboardChatArea } from '@/components/organisms/DashboardChatArea';
import { DashboardRightPanel } from '@/components/organisms/DashboardRightPanel';
import { SkipToContent } from '@/hooks/useAccessibility';
import styles from './page.module.css';

// Lazy load heavy canvas component
const MirrorCanvas = dynamic(() => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then(mod => ({ default: mod.MirrorCanvas })), {
  loading: () => null, // Background canvas doesn't need loading indicator
  ssr: false,
});

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SkipToContent targetId="dashboard-main" />
      <div id="dashboard-main" className={styles.dashboard} role="main" aria-label="Dashboard">
        {/* Ambient background for "Digital Mirror" vibe */}
        <div className={styles.background} aria-hidden="true">
          <MirrorCanvas variant="background" intensity={0.3} />
        </div>
        <DashboardSidebar />
        <DashboardChatArea />
        <DashboardRightPanel />
      </div>
    </>
  );
}
