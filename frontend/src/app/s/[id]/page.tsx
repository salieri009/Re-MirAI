'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
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
      <SurveyWizard surveyId={id} questions={survey.questions} />
    </div>
  );
}


