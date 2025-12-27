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
  /** Optional callback when survey is completed (used for Practice Mode) */
  onComplete?: () => void;
  /** If true, this is Practice Mode (self-survey) */
  isPracticeMode?: boolean;
}

export function SurveyWizard({ surveyId, questions, onComplete, isPracticeMode }: SurveyWizardProps) {
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

      // Practice Mode: call onComplete callback to handle persona generation
      if (isPracticeMode && onComplete) {
        onComplete();
      } else {
        // Normal mode: redirect to thank-you page
        router.push(`/s/${surveyId}/thank-you`);
      }
    } catch (error) {
      console.error('Failed to submit survey:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = answers[`q${currentQuestion.id}`] !== undefined;

  return (
    <div className={styles.wizard}>
      <ProgressBar
        value={progress}
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




