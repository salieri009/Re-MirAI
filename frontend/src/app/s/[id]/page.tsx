'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { RitualWizard } from '@/components/organisms/RitualWizard';
import { PrivacyNotice } from '@/components/molecules/PrivacyNotice';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { Button } from '@/components/atoms/Button';
import { AppState } from '@/components/molecules/AppState';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { fadeIn } from '@/lib/animations';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';
import { queryKeys } from '@/lib/queryKeys';

const STAGES = ['Warm-up', 'Deep Dive', 'Reflection'];

export default function RitualPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reducedMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
  const [urlPreview, setUrlPreview] = useState<string>(`/s/${id}`);

  const { data: survey, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.surveys.detail(id),
    queryFn: () => surveyApi.get(id),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlPreview(window.location.href);
    }
  }, [id]);

  useEffect(() => {
    if (reducedMotion || !previewRef.current) return;
    fadeIn(previewRef.current);
  }, [reducedMotion]);

  if (isLoading) {
    return (
      <PublicAtmosphere>
        <div className="mx-auto flex min-h-screen w-full max-w-[1160px] items-center justify-center px-6 py-10">
          <AppState type="loading" title="Loading ritual" description="Fetching questions and ritual state." />
        </div>
      </PublicAtmosphere>
    );
  }

  if (isError) {
    return (
      <PublicAtmosphere>
        <div className="mx-auto flex min-h-screen w-full max-w-[1160px] items-center justify-center px-6 py-10">
          <AppState
            type="error"
            title="Ritual failed to load"
            description="Try reloading the ritual link."
            actionLabel="Retry"
            onAction={() => refetch()}
          />
        </div>
      </PublicAtmosphere>
    );
  }

  if (!survey) {
    return (
      <PublicAtmosphere>
        <div className="mx-auto flex min-h-screen w-full max-w-[1160px] items-center justify-center px-6 py-10">
          <AppState
            type="empty"
            title="Ritual not found"
            description="The link may be invalid or the ritual has been closed."
          />
        </div>
      </PublicAtmosphere>
    );
  }

  const progress = Math.min(100, survey.questions.length * 8);

  return (
    <PublicAtmosphere>
      <main className="mx-auto min-h-screen w-full max-w-[1240px] px-5 py-8 sm:px-8" role="main" aria-label="Ritual page">
        <div className="flex flex-col gap-6">
          <PrivacyNotice />

          <section className="atmospheric-surface rounded-2xl px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ritual · ver2</p>
                <h1 className="mt-2 font-display text-5xl leading-[0.9] text-slate-800 sm:text-6xl">Help A Friend Discover Themselves</h1>
                <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                  Your responses fuel summoning. Answer with specificity and emotional honesty.
                </p>
              </div>
              <div className="min-w-[220px]">
                <ProgressBar value={progress} label="Progress" />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <span
                  key={stage}
                  className="rounded-full border border-slate-500/25 bg-white/55 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-slate-600"
                >
                  {stage}
                </span>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2.4fr_1fr]">
            <section className="atmospheric-surface rounded-2xl px-6 py-6 sm:px-8">
              <RitualWizard surveyId={id} questions={survey.questions} />
            </section>

            <aside ref={previewRef} className="atmospheric-surface rounded-2xl px-5 py-6 text-center sm:px-6">
              <div className="rounded-xl border border-slate-500/20 bg-white/60 p-4 text-left">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Live URL Preview</p>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-slate-950/10 px-2 py-2">
                  <code className="flex-1 break-all text-[11px] text-slate-600">{urlPreview}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <SynthesisSpinner size={180} caption="Summoning energy building" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Every answer charges the ritual. Once complete, your friend can continue to the summoning reveal.
              </p>
            </aside>
          </div>
        </div>
      </main>
    </PublicAtmosphere>
  );
}
