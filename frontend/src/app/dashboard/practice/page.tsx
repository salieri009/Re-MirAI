'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { toast } from '@/lib/toast';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { FlowStepper } from '@/components/molecules/FlowStepper';
import { Button } from '@/components/atoms/Button';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';
import { useSummonPersona } from '@/features/summon';

export default function PracticeModePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const summonMutation = useSummonPersona();

  const practiceFlow = ['Login', 'Practice Answers', 'Proto-Persona', 'Compare & Bond'];

  const { data: survey, isLoading } = useQuery({
    queryKey: ['practice-survey'],
    queryFn: () => surveyApi.get('practice'),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSubmitComplete = async () => {
    setIsComplete(true);
    setIsGenerating(true);

    try {
      const execution = await summonMutation.mutateAsync({
        surveyId: 'practice-self',
        mode: 'FATED',
      });

      router.push(`/p/${execution.persona.id}?practice=true`);
    } catch (error) {
      toast.error('Failed to generate your Proto-Persona. Please try again.');
      setIsGenerating(false);
      setIsComplete(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <DashboardScaffold title="Practice Mode" subtitle="Loading your reflection ritual...">
        <div className="atmospheric-surface flex min-h-[50vh] items-center justify-center p-6">
          <SynthesisSpinner caption="Loading practice questions..." />
        </div>
      </DashboardScaffold>
    );
  }

  if (isComplete && isGenerating) {
    return (
      <DashboardScaffold
        title="Creating Proto-Persona"
        subtitle="We are synthesizing your self-reflection into an initial mirror profile."
      >
        <section className="atmospheric-surface mx-auto flex min-h-[58vh] w-full max-w-[720px] flex-col items-center justify-center p-8 text-center">
          <SynthesisSpinner caption="Creating your Proto-Persona..." size={200} />
          <h2 className="mt-2 font-display text-4xl text-slate-800">Synthesizing Self-Reflection</h2>
          <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-slate-600">
            Based on your own answers, we are generating a Proto-Persona that represents how you see yourself.
            You can later compare it with friend-driven ritual synthesis.
          </p>
          <div className="mt-6 w-full max-w-[420px]">
            <ProgressBar value={75} label="Generating Proto-Persona" />
          </div>
        </section>
      </DashboardScaffold>
    );
  }

  return (
    <DashboardScaffold
      title="Discover Your Self-Perception"
      subtitle="Answer your own ritual to generate a Proto-Persona before collective echoes arrive."
    >
      <section className="atmospheric-surface mb-6 p-5 sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current Flow Position</p>
        <FlowStepper steps={practiceFlow} activeIndex={1} ariaLabel="Practice user flow" variant="compact" />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="atmospheric-surface p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">About Practice</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Why This Mode Works</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-500/20 bg-white/55 px-4 py-3">
              Answer honestly from your own perspective to capture baseline identity.
            </li>
            <li className="rounded-lg border border-slate-500/20 bg-white/55 px-4 py-3">
              Generates a <strong>Proto-Persona</strong> with instant feedback loop.
            </li>
            <li className="rounded-lg border border-slate-500/20 bg-white/55 px-4 py-3">
              Later compare with friend-generated ritual persona for perception gaps.
            </li>
            <li className="rounded-lg border border-slate-500/20 bg-white/55 px-4 py-3">
              No waiting for responses, ideal for first-time onboarding momentum.
            </li>
          </ul>

          <div className="mt-6 flex">
            <Button variant="ghost" onClick={() => router.push('/dashboard/ritual')}>
              Back to Ritual Hub
            </Button>
          </div>
        </section>

        <section className="atmospheric-surface p-6 sm:p-7">
          {survey ? (
            <SurveyWizard
              surveyId="practice-mode"
              questions={survey.questions}
              onComplete={handleSubmitComplete}
              isPracticeMode
            />
          ) : (
            <p className="text-sm text-slate-600">No practice survey available right now.</p>
          )}
        </section>
      </div>
    </DashboardScaffold>
  );
}
