'use client';

import dynamic from 'next/dynamic';
import { useAuthStore } from '@/stores/authStore';
import { AppState } from '@/components/molecules/AppState';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { DashboardChatArea } from '@/components/organisms/DashboardChatArea';
import { DashboardRightPanel } from '@/components/organisms/DashboardRightPanel';
import { SkipToContent } from '@/hooks/useAccessibility';
import { useProtectedRoute } from '@/features/auth/hooks/useProtectedRoute';

// Lazy load heavy canvas component
const MirrorCanvas = dynamic(
  () => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then((mod) => ({ default: mod.MirrorCanvas })),
  {
    loading: () => null, // Background canvas doesn't need loading indicator
    ssr: false,
  }
);

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();
  const isRedirecting = useProtectedRoute(isAuthenticated);

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-background-dark text-text-primary">
        <AppState
          type="loading"
          title="Redirecting to login"
          description="Your dashboard requires an authenticated session."
        />
      </div>
    );
  }

  return (
    <>
      <SkipToContent targetId="dashboard-main" />
      <div
        id="dashboard-main"
        role="main"
        aria-label="Dashboard"
        className="relative flex h-screen w-screen overflow-hidden bg-background-dark"
      >
        {/* Ambient background for "Digital Mirror" vibe */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden="true">
          <MirrorCanvas variant="background" intensity={0.3} />
        </div>
        <DashboardSidebar />
        <DashboardChatArea />
        <DashboardRightPanel />
      </div>
    </>
  );
}
