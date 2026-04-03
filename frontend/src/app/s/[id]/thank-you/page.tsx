'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <PublicAtmosphere>
      <main className="mx-auto flex min-h-screen w-full max-w-[960px] items-center justify-center px-6 py-10" role="main" aria-label="Survey completion page">
        <section className="atmospheric-surface w-full max-w-[560px] rounded-2xl px-7 py-10 text-center sm:px-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ritual Complete</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.9] text-slate-800 sm:text-6xl">Thank You</h1>
          <p className="mt-4 text-base text-slate-600">Your response has been submitted successfully.</p>
          <p className="mt-2 text-sm text-slate-500">Your feedback helps shape a unique digital mirror persona.</p>
          <div className="mt-7">
            <Button variant="primary" onClick={() => router.push('/')}>
              Create Your Own Persona
            </Button>
          </div>
        </section>
      </main>
    </PublicAtmosphere>
  );
}
