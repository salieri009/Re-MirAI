'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/lib/toast';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';
import { AppState } from '@/components/molecules/AppState';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'processing' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(decodeURIComponent(error));
        return;
      }

      if (!accessToken || !refreshToken) {
        setStatus('error');
        setErrorMessage('Missing authentication tokens');
        return;
      }

      try {
        let user = {
          id: 'user-unknown',
          email: 'user@example.com',
          name: 'User',
        };

        try {
          const parts = accessToken.split('.');
          if (parts.length === 3) {
            const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            user = {
              id: decodedPayload.sub || decodedPayload.id || user.id,
              email: decodedPayload.email || user.email,
              name: decodedPayload.name || 'User',
            };
          }
        } catch (_decodeError) {
          // fallback values are acceptable when JWT payload parse fails
        }

        login(accessToken, refreshToken, user);
        setStatus('success');

        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (_err) {
        toast.error('Failed to process authentication. Please try again.');
        setStatus('error');
        setErrorMessage('Failed to process authentication');
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  if (status === 'loading' || status === 'processing') {
    return (
      <AppState
        type="loading"
        title="Completing sign in"
        description="Please wait while we verify your account."
      />
    );
  }

  if (status === 'success') {
    return <AppState type="success" title="Welcome!" description="Redirecting to your dashboard..." />;
  }

  return (
    <AppState
      type="error"
      title="Sign in failed"
      description={errorMessage || 'An error occurred during authentication.'}
      actionLabel="Try Again"
      onAction={() => router.push('/login')}
    />
  );
}

function LoadingFallback() {
  return <AppState type="loading" title="Loading callback" description="Please wait..." />;
}

export default function AuthCallbackPage() {
  return (
    <PublicAtmosphere>
      <main className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6 py-10" role="main" aria-label="Authentication callback page">
        <Suspense fallback={<LoadingFallback />}>
          <AuthCallbackContent />
        </Suspense>
      </main>
    </PublicAtmosphere>
  );
}

