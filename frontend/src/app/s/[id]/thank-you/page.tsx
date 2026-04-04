'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';
import { AppState } from '@/components/molecules/AppState';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <PublicAtmosphere>
      <main className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6 py-10" role="main" aria-label="Survey completion page">
        <div className="w-full max-w-[560px]">
          <AppState
            type="success"
            title="Thank you"
            description="Your response has been submitted successfully and is now shaping the mirror persona."
            actionLabel="Create Your Own Persona"
            onAction={() => router.push('/')}
          />
        </div>
      </main>
    </PublicAtmosphere>
  );
}
