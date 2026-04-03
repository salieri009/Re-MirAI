'use client';

import Link from 'next/link';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';

export function InteractiveHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <MirrorCanvas variant="background" intensity={1} />

      <div className="relative z-10 flex w-full max-w-[800px] flex-col items-center px-8 text-center">
        <h1 id="hero-title" className="mb-4 bg-gradient-to-br from-text-primary to-accent bg-clip-text font-display text-6xl font-bold text-transparent">
          Re:MirAI
        </h1>
        <p className="mb-2 text-xl text-text-secondary">
          Fast. Private. Otaku-friendly.
        </p>
        <p className="mb-8 text-lg leading-relaxed text-text-muted">
          Create your digital persona through AI-powered conversations and daily rituals.
        </p>
        <Link href="/login" className="inline-block rounded-lg bg-gradient-to-br from-primary to-accent px-8 py-4 text-lg font-semibold text-text-primary no-underline shadow-[0_4px_20px_rgba(132,94,194,0.35)] transition-transform duration-200 hover:-translate-y-0.5">
          Get Started
        </Link>
      </div>
    </section>
  );
}
