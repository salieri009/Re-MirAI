'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import type { Persona } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { AppState } from '@/components/molecules/AppState';
import { FlowStepper } from '@/components/molecules/FlowStepper';
import { Card, Grid, Section } from '@/components/primitives';
import { SummoningAnimation } from '@/components/organisms/SummoningAnimation';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';
import { useRitualStatus } from '@/features/ritual';
import { useSummonPersona } from '@/features/summon';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function SynthesizePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('surveyId');
  const synthesizeFlow = ['Login', 'Ritual', 'Summon', 'Bond'];
  const [showAnimation, setShowAnimation] = useState(false);
  const [createdPersona, setCreatedPersona] = useState<Persona | null>(null);
  const [mode, setMode] = useState<'FATED' | 'ALCHEMIC'>('FATED');
  const ritualStatusQuery = useRitualStatus(surveyId);
  const summonMutation = useSummonPersona();
  const isRedirecting = useProtectedRoute(isAuthenticated);

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

  const handleSynthesize = async () => {
    if (!surveyId) {
      toast.error('Missing ritual context. Choose a ritual from the Ritual Hub first.');
      return;
    }

    if (!ritualStatusQuery.data?.canSummon) {
      toast.error('This ritual is not ready yet. Collect enough responses before summoning.');
      return;
    }

    try {
      const execution = await summonMutation.mutateAsync({
        surveyId,
        mode,
      });
      setCreatedPersona(execution.persona);
      setShowAnimation(true);
    } catch (_error) {
      toast.error('Failed to generate persona. Please try again.');
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

  if (isRedirecting) {
    return (
      <DashboardScaffold title="Awaken The Echo" subtitle="Checking your session before summoning.">
        <AppState
          type="loading"
          title="Redirecting to login"
          description="You need an active session before summoning a persona."
        />
      </DashboardScaffold>
    );
  }

  return (
    <DashboardScaffold
      title="Awaken The Echo"
      subtitle="Choose your synthesis mode, initiate summoning, and enter the persona bond room."
    >
      <Section width="full" spacing="md" surface="card" className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Flow Position</p>
        <FlowStepper steps={synthesizeFlow} activeIndex={2} ariaLabel="Summon user flow" variant="compact" />
      </Section>

      <Grid cols="dashboard" gap="lg">
        <Card variant="glass" padding="lg">
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
                <Card
                  key={option}
                  role="button"
                  tabIndex={0}
                  onClick={() => setMode(option)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setMode(option);
                    }
                  }}
                  className={`cursor-pointer px-5 py-5 text-left ${
                    selected
                      ? 'border-fuchsia-500/40 bg-fuchsia-100/50 shadow-[0_14px_28px_-16px_rgba(217,70,239,0.65)] ring-2 ring-fuchsia-300/35'
                      : 'border-slate-500/20 bg-white/60 hover:bg-white'
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
                </Card>
              );
            })}
          </div>
        </Card>

        <Card variant="glass" padding="lg">
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

          <div className="mt-4">
            {!surveyId ? (
              <AppState
                type="empty"
                title="No ritual selected"
                description="Open this page from Ritual Hub so surveyId is attached in the URL."
                actionLabel="Go To Ritual Hub"
                onAction={() => router.push('/dashboard/ritual')}
              />
            ) : ritualStatusQuery.isLoading ? (
              <AppState type="loading" title="Checking ritual readiness" description="Loading ritual status before summon." />
            ) : ritualStatusQuery.isError ? (
              <AppState
                type="error"
                title="Failed to load ritual status"
                description="Retry or go back to Ritual Hub and pick the ritual again."
                actionLabel="Retry"
                onAction={() => ritualStatusQuery.refetch()}
              />
            ) : ritualStatusQuery.data ? (
              <Card variant="default" padding="sm" className="border-slate-500/20 bg-white/70">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Ritual Readiness</p>
                <p className="mt-1 text-sm text-slate-700">
                  Status: <span className="font-semibold">{ritualStatusQuery.data.status}</span>
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Responses: {ritualStatusQuery.data.responsesCount}/{ritualStatusQuery.data.threshold}
                </p>
              </Card>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={handleSynthesize}
              disabled={summonMutation.isPending || !surveyId || !ritualStatusQuery.data?.canSummon}
            >
              {summonMutation.isPending ? 'Initiating Summon...' : 'Begin Summoning'}
            </Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard/ritual')} disabled={summonMutation.isPending}>
              Back to Ritual Hub
            </Button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            After synthesis, you will be redirected to your persona room for first contact.
          </p>
        </Card>
      </Grid>
    </DashboardScaffold>
  );
}