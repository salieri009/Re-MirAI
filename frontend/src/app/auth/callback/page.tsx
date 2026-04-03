'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/lib/toast';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';

function StatusCard({
  status,
  errorMessage,
  onRetry,
}: {
  status: 'processing' | 'success' | 'error' | 'loading';
  errorMessage?: string | null;
  onRetry: () => void;
}) {
  const statusConfig = {
    loading: {
      icon: <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-300 border-t-fuchsia-500" />,
      title: 'Loading...',
      description: 'Please wait...',
    },
    processing: {
      icon: <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-300 border-t-fuchsia-500" />,
      title: 'Completing sign in...',
      description: 'Please wait while we verify your account.',
    },
    success: {
      icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div>,
      title: 'Welcome!',
      description: 'Redirecting to your dashboard...',
    },
    error: {
      icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-2xl text-white">✕</div>,
      title: 'Sign in failed',
      description: errorMessage || 'An error occurred during authentication.',
    },
  } as const;

  const config = statusConfig[status];

  return (
    <section className="atmospheric-surface w-full max-w-[440px] rounded-2xl px-7 py-9 text-center sm:px-10">
      <div className="flex justify-center">{config.icon}</div>
      <h1 className="mt-3 font-display text-4xl text-slate-800">{config.title}</h1>
      <p className="mt-2 text-sm text-slate-600">{config.description}</p>

      {status === 'error' ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500"
        >
          Try Again
        </button>
      ) : null}
    </section>
  );
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
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

  return <StatusCard status={status} errorMessage={errorMessage} onRetry={() => router.push('/login')} />;
}

function LoadingFallback() {
  return <StatusCard status="loading" onRetry={() => undefined} />;
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

