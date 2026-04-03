'use client';

import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { ArchetypeCard } from '@/components/atoms/ArchetypeCard';
import { SkipToContent, useAnnouncement } from '@/hooks/useAccessibility';
import { useSummoningAnimation } from '@/hooks/useSummoningAnimation';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';

const SummoningCanvas = dynamic(
  () => import('@/components/organisms/MirrorCanvas/MirrorCanvas').then((mod) => ({ default: mod.MirrorCanvas })),
  {
    loading: () => <canvas aria-hidden="true" className="absolute inset-0" />,
    ssr: false,
  }
);

const ARCHETYPES = [
  {
    id: 'creator',
    title: 'Creator',
    description: 'Inventive, visionary, driven to craft new symbolic worlds.',
    icon: '🎨',
  },
  {
    id: 'sage',
    title: 'Sage',
    description: 'Calm, analytical, and fluent at transforming signal into wisdom.',
    icon: '📚',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Adventurous, curious, and energized by uncertainty.',
    icon: '🧭',
  },
  {
    id: 'guardian',
    title: 'Guardian',
    description: 'Protective, empathetic, and emotionally stabilizing.',
    icon: '🛡️',
  },
];

export default function SummonPage() {
  const router = useRouter();
  const announce = useAnnouncement();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [personaId] = useState('p-123');

  const { stage, progress, transitionToAlchemicMode, transitionToReveal, skipToReveal } = useSummoningAnimation({
    canvasRef,
    onStageChange: (newStage) => {
      if (newStage === 'PRE_SYNTHESIS') {
        announce('Ready to begin synthesis ritual.', 'polite');
      } else if (newStage === 'ALCHEMIC_MODE') {
        announce(`Alchemic Mode engaged${selectedArchetype ? ` with ${selectedArchetype}` : ''}`, 'polite');
      } else if (newStage === 'REVEAL') {
        announce('Persona revealed. Explore your new companion.', 'assertive');
      }
    },
    autoStart: false,
  });

  const personaSummary = useMemo(() => {
    if (!selectedArchetype) {
      return {
        name: 'Awaiting Archetype',
        synopsis: 'Select an archetype to guide the synthesis ritual.',
      };
    }

    return {
      name: `Echo of the ${selectedArchetype}`,
      synopsis: 'This persona channels your survey echoes through your selected archetypal lens.',
    };
  }, [selectedArchetype]);

  const handleArchetypeSelect = (id: string) => {
    setSelectedArchetype(id);
    setTimeout(() => transitionToReveal(), 500);
  };

  return (
    <>
      <SkipToContent targetId="summon-main" />
      <PublicAtmosphere>
        <main id="summon-main" className="mx-auto min-h-screen w-full max-w-[1160px] px-5 py-10 sm:px-8" role="main" aria-label="Summoning ritual">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
            <SummoningCanvas variant="background" intensity={0.25} />
          </div>

          <section className="relative z-10 flex flex-col gap-7">
            <header className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Summoning Ritual ver2</p>
              <h1 className="mt-2 font-display text-5xl leading-[0.92] text-slate-800 sm:text-6xl">The Ceremony That Births Your Persona</h1>
              <p className="mx-auto mt-3 max-w-[64ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                Move through anticipation, archetype selection, and final reveal in a focused ritual flow.
              </p>
            </header>

            {stage === 'PRE_SYNTHESIS' && (
              <div className="atmospheric-surface flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-10">
                <SynthesisSpinner caption="Calibrating data threads..." />
                <p className="max-w-[44ch] text-sm text-slate-600">Gathering resonance from your ritual responses and preparing summoning lattice.</p>
                <Button variant="secondary" onClick={transitionToAlchemicMode}>
                  Begin Synthesis
                </Button>
              </div>
            )}

            {stage === 'ALCHEMIC_MODE' && (
              <div className="atmospheric-surface px-6 py-8 sm:px-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-4xl text-slate-800">Choose Archetype Focus</h2>
                    <p className="mt-2 text-sm text-slate-600">Guide synthesis with a dominant personality vector.</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={skipToReveal}>
                    Skip Animation
                  </Button>
                </div>

                <div className="mb-5">
                  <ProgressBar value={progress} label="Synthesis Progress" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {ARCHETYPES.map((archetype) => (
                    <ArchetypeCard
                      key={archetype.id}
                      id={archetype.id}
                      title={archetype.title}
                      description={archetype.description}
                      icon={archetype.icon}
                      selected={selectedArchetype === archetype.id}
                      onSelect={handleArchetypeSelect}
                    />
                  ))}
                </div>
              </div>
            )}

            {stage === 'REVEAL' && (
              <div className="atmospheric-surface flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-10">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Stage 3 · Reveal</p>
                <h2 className="font-display text-5xl leading-[0.9] text-slate-800 sm:text-6xl">{personaSummary.name}</h2>
                <p className="max-w-[50ch] text-sm leading-relaxed text-slate-600 sm:text-base">{personaSummary.synopsis}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <Button size="lg" onClick={() => router.push(`/p/${personaId}`)}>
                    Explore Persona Room
                  </Button>
                  <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </section>
        </main>
      </PublicAtmosphere>
    </>
  );
}
