'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { AppState } from '@/components/molecules/AppState';
import { FlowStepper } from '@/components/molecules/FlowStepper';
import { StageBadge, type RitualStage } from '@/components/molecules/StageBadge';
import { RitualLinkCard } from '@/components/molecules/RitualLinkCard';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';
import { useMyRituals, useRitualStatus } from '@/features/ritual';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const RITUAL_TEMPLATES = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: '10 cinematic questions mapping core motivations.',
    length: '6 min',
  },
  {
    id: 'bonding',
    title: 'Bonding Sprint',
    description: 'Fast pulse to deepen the persona bond.',
    length: '3 min',
  },
  {
    id: 'archetype',
    title: 'Archetype Focus',
    description: 'Guide respondents toward a specific archetypal vibe.',
    length: '8 min',
  },
];

export default function RitualHubPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const isRedirecting = useProtectedRoute(isAuthenticated);
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState(0);

  const flowSteps = ['Login', 'Create Ritual', 'Collect Responses', 'Summon Persona', 'Bond'];

  const ritualsQuery = useMyRituals();
  const activeRitualId = ritualsQuery.data?.[0]?.id ?? null;
  const surveyStatusQuery = useRitualStatus(activeRitualId);
  const surveyStatus = surveyStatusQuery.data;
  const activeRitual = ritualsQuery.data?.[0] ?? null;

  useEffect(() => {
    if (activeRitual?.shareableLink) {
      setSurveyUrl(activeRitual.shareableLink);
      return;
    }

    if (surveyStatus?.id) {
      setSurveyUrl(`/s/${surveyStatus.id}`);
    }
  }, [activeRitual?.shareableLink, surveyStatus?.id]);

  const progressPercentage = useMemo(() => {
    if (!surveyStatus?.threshold) {
      return 0;
    }
    return Math.min(100, Math.round((surveyStatus.responsesCount / surveyStatus.threshold) * 100));
  }, [surveyStatus]);

  const ritualStage: RitualStage = useMemo(() => {
    if (surveyStatus?.canSummon) {
      return 'READY';
    }
    return 'COLLECTING';
  }, [surveyStatus]);

  const metrics = [
    {
      label: 'Link Shares',
      value: `${shareCount}`,
      hint: 'Total copies/downloads',
    },
    {
      label: 'Responses',
      value: `${surveyStatus?.responsesCount ?? 0}/${surveyStatus?.threshold ?? 3}`,
      hint: 'Echoes collected',
    },
    {
      label: 'Status',
      value: surveyStatus?.canSummon ? 'Ready' : 'Collecting',
      hint: surveyStatus?.canSummon ? 'You can synthesize now' : 'Keep sharing',
    },
  ];

  const handleShare = (platform: string) => {
    if (platform === 'copy' && surveyUrl) {
      navigator.clipboard.writeText(surveyUrl);
      setShareCount((prev) => prev + 1);
    }
  };

  if (isRedirecting) {
    return (
      <DashboardScaffold
        title="Gather Anonymous Echoes"
        subtitle="Track ritual momentum, distribute your share link, and summon once resonance crosses threshold."
      >
        <AppState
          type="loading"
          title="Redirecting to login"
          description="You need an authenticated session to access Ritual Hub."
        />
      </DashboardScaffold>
    );
  }

  if (ritualsQuery.isLoading) {
    return (
      <DashboardScaffold
        title="Gather Anonymous Echoes"
        subtitle="Track ritual momentum, distribute your share link, and summon once resonance crosses threshold."
      >
        <AppState type="loading" title="Loading your rituals" description="Preparing your active ritual board." />
      </DashboardScaffold>
    );
  }

  if (ritualsQuery.isError) {
    return (
      <DashboardScaffold
        title="Gather Anonymous Echoes"
        subtitle="Track ritual momentum, distribute your share link, and summon once resonance crosses threshold."
      >
        <AppState
          type="error"
          title="Failed to load rituals"
          description="Please retry, or refresh the page if this continues."
          actionLabel="Retry"
          onAction={() => ritualsQuery.refetch()}
        />
      </DashboardScaffold>
    );
  }

  if (!activeRitual) {
    return (
      <DashboardScaffold
        title="Gather Anonymous Echoes"
        subtitle="Track ritual momentum, distribute your share link, and summon once resonance crosses threshold."
      >
        <AppState
          type="empty"
          title="No ritual found"
          description="Create your first ritual before collecting responses and summoning a persona."
        />
      </DashboardScaffold>
    );
  }

  return (
    <DashboardScaffold
      title="Gather Anonymous Echoes"
      subtitle="Track ritual momentum, distribute your share link, and summon once resonance crosses threshold."
    >
      <section className="atmospheric-surface mb-6 p-5 sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Flow Position</p>
        <FlowStepper steps={flowSteps} activeIndex={2} ariaLabel="Ritual user flow" variant="compact" />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-6">
          <section className="atmospheric-surface p-6 sm:p-7">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl text-slate-800">Resonance Status</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {surveyStatus?.canSummon
                    ? 'Threshold reached. You can synthesize your persona now.'
                    : 'Share your ritual link to gather more anonymous echoes.'}
                </p>
              </div>
              <StageBadge stage={ritualStage} />
            </div>

            <ProgressBar value={progressPercentage} label="Resonance Progress" />

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-500/20 bg-white/55 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-700">{metric.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{metric.hint}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="atmospheric-surface p-6 sm:p-7">
            <h2 className="font-display text-3xl text-slate-800">Distribution Hub</h2>
            <p className="mt-2 text-sm text-slate-600">Spread your ritual link across channels and maintain completion pace.</p>

            <div className="mt-5 space-y-4">
              {surveyUrl ? (
                <RitualLinkCard
                  link={surveyUrl}
                  shareCount={shareCount}
                  onCopy={() => setShareCount((prev) => prev + 1)}
                />
              ) : null}

              <ShareOptions
                platforms={['whatsapp', 'instagram', 'twitter', 'copy']}
                onShare={handleShare}
                link={surveyUrl ?? undefined}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-500/20 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Need more responses?</p>
                <p className="text-xs text-slate-500">Schedule a reminder or trigger a quick social ping.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => toast.success('Reminder scheduled!')}>
                  Remind me
                </Button>
                <Button variant="ghost" onClick={() => toast.success('Reminder sent!')}>
                  Notify friends
                </Button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="atmospheric-surface p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Synthesis</p>
            <h2 className="mt-1 font-display text-3xl text-slate-800">Summon Persona</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {surveyStatus?.canSummon
                ? 'Enough echoes collected. Your digital mirror is ready to be synthesized.'
                : `Collect ${Math.max(0, (surveyStatus?.threshold ?? 3) - (surveyStatus?.responsesCount ?? 0))} more responses to unlock synthesis.`}
            </p>
            <div className="mt-5">
              <Button
                variant="primary"
                onClick={() => router.push(`/dashboard/synthesize?surveyId=${activeRitual.id}`)}
                disabled={!surveyStatus?.canSummon}
              >
                {surveyStatus?.canSummon ? 'Synthesize Now' : 'Gather More Echoes'}
              </Button>
            </div>
          </section>

          <section className="atmospheric-surface p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Fallback</p>
            <h2 className="mt-1 font-display text-3xl text-slate-800">Practice Mode</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Build a Proto-Persona instantly from self-reflection while your ritual responses are still gathering.
            </p>
            <div className="mt-5">
              <Button variant="secondary" onClick={() => router.push('/dashboard/practice')}>
                Start Practice Mode
              </Button>
            </div>
          </section>

          <section className="atmospheric-surface p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Explore</p>
            <h2 className="mt-1 font-display text-3xl text-slate-800">Ritual Templates</h2>
            <div className="mt-4 space-y-3">
              {RITUAL_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => toast.info(`Template ${template.title} selected`)}
                  className="w-full rounded-xl border border-slate-500/20 bg-white/55 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{template.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{template.description}</p>
                    </div>
                    <span className="rounded-md bg-slate-200/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600">
                      {template.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardScaffold>
  );
}
