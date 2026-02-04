'use client';

import { use, useEffect, useRef, CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { SurveyWizard } from '@/components/organisms/SurveyWizard';
import { PrivacyNotice } from '@/components/molecules/PrivacyNotice';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { fadeIn } from '@/lib/animations';

const STAGES = ['Warm-up', 'Deep Dive', 'Reflection'];

// Styles
const pageStyles = {
  container: {
    minHeight: '100vh',
    padding: 'var(--space-2xl)',
    backgroundColor: 'var(--color-bg-dark)',
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,
  shell: {
    width: 'min(1200px, 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
  } as CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 'var(--space-xl)',
    alignItems: 'flex-start',
  } as CSSProperties,
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: '0.4em',
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  stageChips: {
    display: 'flex',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap',
  } as CSSProperties,
  stageChip: {
    padding: 'var(--space-xs) var(--space-md)',
    borderRadius: 'var(--radius-pill)',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    fontSize: '0.85rem',
  } as CSSProperties,
  wizardLayout: {
    display: 'grid',
    gridTemplateColumns: '2.5fr 1fr',
    gap: 'var(--space-xl)',
  } as CSSProperties,
  wizardPanel: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-xl)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  } as CSSProperties,
  preview: {
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-xl)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.02)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  previewCard: {
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.03)',
    textAlign: 'left',
  } as CSSProperties,
  previewTitle: {
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-sm)',
  } as CSSProperties,
  urlPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm)',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 'var(--radius-md)',
  } as CSSProperties,
  urlCode: {
    flex: 1,
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    wordBreak: 'break-all',
    fontFamily: 'var(--font-mono)',
  } as CSSProperties,
  previewHint: {
    marginTop: 'var(--space-md)',
    color: 'var(--color-text-secondary)',
    fontSize: '0.95rem',
  } as CSSProperties,
};

export default function SurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reducedMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);

  const { data: survey, isLoading } = useQuery({
    queryKey: ['survey', id],
    queryFn: () => surveyApi.get(id),
  });

  // Animate preview panel
  useEffect(() => {
    if (reducedMotion || !previewRef.current) return;
    fadeIn(previewRef.current);
  }, [reducedMotion]);

  if (isLoading) {
    return (
      <div style={pageStyles.container}>
        <p>Loading survey...</p>
      </div>
    );
  }

  if (!survey) {
    return (
      <div style={pageStyles.container}>
        <p>Survey not found</p>
      </div>
    );
  }

  const progress = Math.min(100, survey.questions.length * 8);

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.shell}>
        <PrivacyNotice />

        <header style={pageStyles.header}>
          <div>
            <p style={pageStyles.kicker}>Survey ritual · ver2</p>
            <h2>Helping a friend discover themselves</h2>
            <p>Responses fuel the Summoning Page. Answer with honesty and flair.</p>
          </div>
          <ProgressBar value={progress} label="Progress" />
        </header>

        <div style={pageStyles.stageChips}>
          {STAGES.map((stage) => (
            <span key={stage} style={pageStyles.stageChip}>
              {stage}
            </span>
          ))}
        </div>

        <div style={pageStyles.wizardLayout}>
          <div style={pageStyles.wizardPanel}>
            <SurveyWizard surveyId={id} questions={survey.questions} />
          </div>
          <aside ref={previewRef} style={pageStyles.preview}>
            <div style={pageStyles.previewCard}>
              <h3 style={pageStyles.previewTitle}>Live URL Preview</h3>
              <div style={pageStyles.urlPreview}>
                <code style={pageStyles.urlCode}>
                  {typeof window !== 'undefined' ? window.location.href : `/s/${id}`}
                </code>
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
            <SynthesisSpinner size={180} caption="Summoning energy building" />
            <p style={pageStyles.previewHint}>
              Every answer charges the ritual. Once complete, jump to the Summoning Page for the reveal.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
