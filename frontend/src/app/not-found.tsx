'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { AppState } from '@/components/molecules/AppState';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';

export default function NotFound() {
  const router = useRouter();

  return (
    <PublicAtmosphere>
      <main className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6 py-10" role="main" aria-label="Not found page">
        <div className="w-full max-w-[560px]">
          <AppState
            type="empty"
            title="Ritual link not found"
            description="The page may be invalid, expired, or no longer available."
            actionLabel="Go Home"
            onAction={() => router.push('/')}
          />

          <div className="mt-4 flex justify-center">
            <Button variant="ghost" onClick={() => router.push('/dashboard/ritual')}>
              Go To Ritual Hub
            </Button>
          </div>
        </div>
      </main>
    </PublicAtmosphere>
  );
}
