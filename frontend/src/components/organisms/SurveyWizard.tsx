'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard } from '@/components/molecules/QuestionCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { surveyApi } from '@/lib/api/survey';
import { SurveyQuestion } from '@/lib/mock-data/surveys';
import styles from './SurveyWizard.module.css';

interface SurveyWizardProps {
  surveyId: string;
  questions: SurveyQuestion[];
}

export function SurveyWizard({ surveyId, questions }: SurveyWizardProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${currentQuestion.id}`]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await surveyApi.submitResponse(surveyId, answers);
      router.push(`/s/${surveyId}/thank-you`);
    } catch (error) {
      console.error('Failed to submit survey:', error);
      alert('제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = answers[`q${currentQuestion.id}`] !== undefined;

  return (
    <div className={styles.wizard}>
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        label={`Question ${currentIndex + 1} of ${questions.length}`}
      />
      
      <div className={styles.questionContainer}>
        <QuestionCard
          question={currentQuestion}
          value={answers[`q${currentQuestion.id}`]}
          onChange={handleAnswer}
        />
      </div>

      <div className={styles.navigation}>
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!hasAnswer || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!hasAnswer}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}




