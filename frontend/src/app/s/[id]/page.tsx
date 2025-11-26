'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { PrivacyNotice } from '@/components/molecules/PrivacyNotice';
import styles from './page.module.css';

export default function SurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: survey, isLoading } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => surveyApi.get(id)
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

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2>Help your friend see themselves through your eyes</h2>
        <div className={styles.valueProps}>
          <div className={styles.valueProp}>
            <span className={styles.icon}>🔒</span>
            <span>100% anonymous - your friend won't know who said what</span>
          </div>
          <div className={styles.valueProp}>
            <span className={styles.icon}>⏱️</span>
            <span>Takes 2 minutes - just {survey.questions.length} honest questions</span>
          </div>
          <div className={styles.valueProp}>
            <span className={styles.icon}>✨</span>
            <span>You'll help create their AI persona - a unique digital reflection</span>
          </div>
        </div>
      </div>
      <PrivacyNotice />
      <SurveyWizard surveyId={id} questions={survey.questions} />
    </div>
  );
}


