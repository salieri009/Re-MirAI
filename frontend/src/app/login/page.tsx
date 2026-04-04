'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { trackEvent } from '@/lib/analytics';
import { useAuthStore } from '@/stores/authStore';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import { MirrorCanvas } from '@/components/organisms/MirrorCanvas/MirrorCanvas';
import { AuthShell } from '@/components/layouts/AuthShell';
import { Card } from '@/components/primitives';
import { Button } from '@/components/atoms/Button';

const TRUST_BADGES = [
  {
    label: 'Secure OAuth',
    description: 'Google-verified authentication with token refresh.',
  },
  {
    label: 'Privacy First',
    description: 'Anonymous ritual responses are kept separated by design.',
  },
  {
    label: 'Fast Onboarding',
    description: 'Move from login to ritual creation in one guided flow.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();
  const panelRef = useRef<HTMLDivElement>(null);

  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    []
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
      return;
    }

    if (!panelRef.current) {
      return;
    }

    if (reducedMotion) {
      gsap.set(panelRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 24, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' }
    );
  }, [isAuthenticated, reducedMotion, router]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    trackEvent('click_google_login', { category: 'auth' });
    announce('Redirecting to Google login');
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    trackEvent('click_demo_login', { category: 'auth' });
    announce('Redirecting to demo login');
    window.location.href = `${apiBaseUrl}/auth/demo`;
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthShell
      visual={
        <>
          <div className="ornament-ring mb-auto w-fit bg-white/75 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-slate-700">
            RE:MIRAI ACCESS
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10">
            <MirrorCanvas variant="background" intensity={0.36} />
            <div className="auth-visual-wash absolute inset-0" />
          </div>

          <div className="mt-auto max-w-[560px]">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-slate-500">Threshold</p>
            <h1 className="font-display text-5xl leading-[0.95] text-slate-800 xl:text-6xl">
              Step Through The Looking Glass.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-slate-700">
              Continue your ritual, gather peer echoes, and summon a persona that reflects what others
              truly notice in you.
            </p>
          </div>
        </>
      }
      form={
        <div ref={panelRef} className="mx-auto w-full max-w-[540px]">
          <Card variant="glass" padding="lg">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Welcome Back</p>
            <h2 className="mt-2 font-display text-5xl leading-[0.9] text-slate-800 sm:text-6xl">Enter</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Authenticate once and we will return you directly to your dashboard ritual flow.
            </p>

            <div className="mt-7 space-y-3">
              <Button variant="primary" size="lg" onClick={handleGoogleLogin} disabled={isLoading} className="w-full">
                {isLoading ? 'Authenticating...' : 'Continue with Google'}
              </Button>

              <Button variant="secondary" size="lg" onClick={handleDemoLogin} disabled={isLoading} className="w-full">
                Continue with Demo Access
              </Button>
            </div>

            <div className="mt-7 grid gap-3">
              {TRUST_BADGES.map((badge) => (
                <Card key={badge.label} variant="default" padding="sm">
                  <h3 className="text-sm font-semibold text-slate-700">{badge.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{badge.description}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      }
    />
  );
}
