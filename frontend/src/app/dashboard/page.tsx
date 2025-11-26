'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { DashboardChatArea } from '@/components/organisms/DashboardChatArea';
import { DashboardRightPanel } from '@/components/organisms/DashboardRightPanel';
import styles from './page.module.css';

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
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <DashboardChatArea />
      <DashboardRightPanel />
    </div>
  );
}
