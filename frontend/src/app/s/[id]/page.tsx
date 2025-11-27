'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { PrivacyNotice } from '@/components/molecules/PrivacyNotice';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import styles from './page.module.css';

const STAGES = ['Warm-up', 'Deep Dive', 'Reflection'];

export default function SurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: survey, isLoading } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => surveyApi.get(id),
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading survey...</p>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className={styles.container}>
        <p>Survey not found</p>
      </div>
    );
  }

  const progress = Math.min(100, survey.questions.length * 8);

  return (
    <div className={styles.container}>
      <div className={styles.shell}>
        <PrivacyNotice />

        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Survey ritual · ver2</p>
            <h2>Helping a friend discover themselves</h2>
            <p>Responses fuel the Summoning Page. Answer with honesty and flair.</p>
          </div>
          <ProgressBar value={progress} label="Progress" />
        </header>

        <div className={styles.stageChips}>
          {STAGES.map((stage) => (
            <span key={stage}>{stage}</span>
          ))}
        </div>

        <div className={styles.wizardLayout}>
          <div className={styles.wizardPanel}>
            <SurveyWizard surveyId={id} questions={survey.questions} />
          </div>
          <aside className={styles.preview}>
            <SynthesisSpinner size={180} caption="Summoning energy building" />
            <p className={styles.previewHint}>
              Every answer charges the ritual. Once complete, jump to the Summoning Page for the
              reveal.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
