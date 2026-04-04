'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/primitives';
import { AppState } from '@/components/molecules/AppState';
import { QuestionCard } from '@/components/molecules/QuestionCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { surveyApi } from '@/lib/api/survey';
import { SurveyQuestion } from '@/lib/api/survey';
import { toast } from '@/lib/toast';

interface RitualWizardProps {
  surveyId: string;
  questions: SurveyQuestion[];
  onComplete?: () => void;
  isPracticeMode?: boolean;
}

export function RitualWizard({ surveyId, questions, onComplete, isPracticeMode }: RitualWizardProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (questions.length === 0) {
    return (
      <Card variant="glass" padding="lg" className="mx-auto w-full max-w-[600px]">
        <AppState
          type="empty"
          title="No ritual questions yet"
          description="This ritual does not have any questions configured."
        />
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${currentQuestion.id}`]: value,
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

      if (isPracticeMode && onComplete) {
        onComplete();
      } else {
        toast.success('Ritual submitted successfully. Thank you!');
        router.push(`/s/${surveyId}/thank-you`);
      }
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = answers[`q${currentQuestion.id}`] !== undefined;

  return (
    <Card variant="glass" padding="lg" className="mx-auto w-full max-w-[600px]">
      <div className="flex flex-col gap-6">
        <ProgressBar value={progress} label={`Question ${currentIndex + 1} of ${questions.length}`} />

        <div className="min-h-[200px]">
          <QuestionCard question={currentQuestion} value={answers[`q${currentQuestion.id}`]} onChange={handleAnswer} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}>
            Previous
          </Button>

          {isLastQuestion ? (
            <Button variant="primary" onClick={handleSubmit} disabled={!hasAnswer || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext} disabled={!hasAnswer}>
              Next
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
