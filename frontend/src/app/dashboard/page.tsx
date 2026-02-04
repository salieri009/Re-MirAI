'use client';

import { useEffect, CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { DashboardChatArea } from '@/components/organisms/DashboardChatArea';
import { DashboardRightPanel } from '@/components/organisms/DashboardRightPanel';
import { SkipToContent } from '@/hooks/useAccessibility';

// Lazy load heavy canvas component
const MirrorCanvas = dynamic(
  () => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then((mod) => ({ default: mod.MirrorCanvas })),
  {
    loading: () => null, // Background canvas doesn't need loading indicator
    ssr: false,
  }
);

// Styles
const styles = {
  dashboard: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    background: 'var(--color-bg-dark)',
  } as CSSProperties,
  background: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.4,
  } as CSSProperties,
};

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
      <div id="dashboard-main" style={styles.dashboard} role="main" aria-label="Dashboard">
        {/* Ambient background for "Digital Mirror" vibe */}
        <div style={styles.background} aria-hidden="true">
          <MirrorCanvas variant="background" intensity={0.3} />
        </div>
        <DashboardSidebar />
        <DashboardChatArea />
        <DashboardRightPanel />
      </div>
    </>
  );
}
