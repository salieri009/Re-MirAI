'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useProtectedRoute(isAuthenticated: boolean, redirectTo = '/login') {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  return !isAuthenticated;
}
