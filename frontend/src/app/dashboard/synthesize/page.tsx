'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { personaApi } from '@/lib/api/persona';
import type { Persona } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { FlowStepper } from '@/components/molecules/FlowStepper';
import { SummoningAnimation } from '@/components/organisms/SummoningAnimation';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';

export default function SynthesizePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const synthesizeFlow = ['Login', 'Ritual', 'Summon', 'Bond'];
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [createdPersona, setCreatedPersona] = useState<Persona | null>(null);
  const [mode, setMode] = useState<'FATED' | 'ALCHEMIC'>('FATED');

  const modeDetails = useMemo(
    () => ({
      FATED: {
        title: 'Fated Resonance',
        icon: '🎲',
        tagline: 'Collective archetype discovery',
        description:
          'Let the system blend signal patterns from your ritual and surface an unexpected but coherent mirror archetype.',
        badge: 'Free',
      },
      ALCHEMIC: {
        title: 'Alchemic Shaping',
        icon: '✨',
        tagline: 'Intentional mirror crafting',
        description:
          'Steer synthesis with stronger intent. This mode keeps the ritual core while amplifying your directional preferences.',
        badge: 'Premium',
      },
    }),
    []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSynthesize = async () => {
    setIsGenerating(true);
    try {
      const persona = await personaApi.synthesize({
        surveyId: '550e8400-e29b-41d4-a716-446655440000',
        mode,
      });
      setCreatedPersona(persona);
      setShowAnimation(true);
    } catch (_error) {
      toast.error('Failed to generate persona. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleAnimationComplete = () => {
    if (createdPersona) {
      router.push(`/p/${createdPersona.id}`);
    }
  };

  if (showAnimation && createdPersona) {
    return (
      <SummoningAnimation
        persona={createdPersona}
        onComplete={handleAnimationComplete}
        onSkip={handleAnimationComplete}
        variant={mode === 'FATED' ? 'fated' : 'custom'}
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardScaffold
      title="Awaken The Echo"
      subtitle="Choose your synthesis mode, initiate summoning, and enter the persona bond room."
    >
      <section className="atmospheric-surface mb-6 p-5 sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Flow Position</p>
        <FlowStepper steps={synthesizeFlow} activeIndex={2} ariaLabel="Summon user flow" variant="compact" />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="atmospheric-surface p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Ritual Mode</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Select Summoning Pattern</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Both modes preserve your ritual foundation. The difference is how strongly the synthesis engine responds to
            deterministic direction.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {(['FATED', 'ALCHEMIC'] as const).map((option) => {
              const selected = mode === option;
              const detail = modeDetails[option];
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className={`rounded-2xl border px-5 py-5 text-left transition ${
                    selected
                      ? 'border-fuchsia-500/40 bg-fuchsia-100/50 shadow-[0_14px_28px_-16px_rgba(217,70,239,0.65)]'
                      : 'border-slate-500/20 bg-white/60 hover:-translate-y-0.5 hover:bg-white'
                  }`}
                >
                  <p className="text-2xl" aria-hidden="true">
                    {detail.icon}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-800">{detail.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{detail.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{detail.description}</p>
                  <span
                    className={`mt-4 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      option === 'FATED'
                        ? 'border-emerald-500/30 bg-emerald-100/60 text-emerald-700'
                        : 'border-fuchsia-500/30 bg-fuchsia-100/60 text-fuchsia-700'
                    }`}
                  >
                    {detail.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="atmospheric-surface p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Invocation</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Begin Summoning</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {mode === 'FATED'
              ? 'Fated mode emphasizes emergent pattern detection from your ritual signal.'
              : 'Alchemic mode applies stronger directional weighting before final persona emergence.'}
          </p>

          <div className="mt-5 rounded-xl border border-slate-500/20 bg-white/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Selected Mode</p>
            <p className="mt-1 text-xl font-semibold text-slate-800">{modeDetails[mode].title}</p>
            <p className="mt-2 text-sm text-slate-600">{modeDetails[mode].description}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" onClick={handleSynthesize} disabled={isGenerating}>
              {isGenerating ? 'Initiating Summon...' : 'Begin Summoning'}
            </Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard/ritual')} disabled={isGenerating}>
              Back to Ritual Hub
            </Button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            After synthesis, you will be redirected to your persona room for first contact.
          </p>
        </section>
      </div>
    </DashboardScaffold>
  );
}