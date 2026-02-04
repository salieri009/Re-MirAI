'use client';

import { useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { Button } from '@/components/atoms/Button';
import { StageBadge, type SurveyStage } from '@/components/molecules/StageBadge';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { guidanceInteractions } from '@/lib/micro-interactions';

const SURVEY_TEMPLATES = [
  {
    id: 'foundations',
    title: 'Foundations Ritual',
    description: '10 cinematic questions that map core motivations.',
    length: '6 min',
  },
  {
    id: 'bonding',
    title: 'Bonding Sprint',
    description: 'Fast 5-question pulse to deepen the persona bond.',
    length: '3 min',
  },
  {
    id: 'archetype',
    title: 'Archetype Focus',
    description: 'Guide respondents toward a specific archetypal vibe.',
    length: '8 min',
  },
];

// Styles
const pageStyles = {
  container: {
    minHeight: '100vh',
    padding: 'var(--space-2xl) var(--space-xl)',
    background: 'var(--color-bg-secondary)',
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,
  rhub: {
    width: 'min(1200px, 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xl)',
  } as CSSProperties,
  header: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(147, 51, 234, 0.12))',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-xl)',
  } as CSSProperties,
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  subtitle: {
    color: 'var(--color-text-secondary)',
    maxWidth: '600px',
  } as CSSProperties,
  progressSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 'var(--space-xl)',
  } as CSSProperties,
  progressCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: 'var(--space-xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 'var(--space-md)',
  } as CSSProperties,
  label: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
  } as CSSProperties,
  progressTrack: {
    width: '100%',
    height: '10px',
    borderRadius: 'var(--radius-full)',
    background: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  } as CSSProperties,
  progressFill: {
    height: '100%',
    borderRadius: 'inherit',
    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
    transition: 'width 0.3s ease',
  } as CSSProperties,
  helper: {
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 'var(--space-md)',
  } as CSSProperties,
  metric: {
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.02)',
  } as CSSProperties,
  metricLabel: {
    fontSize: 'var(--font-size-xs)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  metricValue: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-semibold)',
  } as CSSProperties,
  metricHint: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
  sharePanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  reminderSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    borderRadius: 'var(--radius-xl)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  } as CSSProperties,
  reminderActions: {
    display: 'flex',
    gap: 'var(--space-md)',
    flexWrap: 'wrap',
  } as CSSProperties,
  practiceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    borderRadius: 'var(--radius-xl)',
    background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08), rgba(59, 130, 246, 0.08))',
    border: '1px solid rgba(217, 70, 239, 0.2)',
  } as CSSProperties,
  practiceH2: {
    marginBottom: 'var(--space-xs)',
  } as CSSProperties,
  practiceP: {
    color: 'var(--color-text-secondary)',
    maxWidth: '500px',
  } as CSSProperties,
  templateSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  templateCard: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: 'var(--space-lg)',
    background: 'rgba(255, 255, 255, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    justifyContent: 'space-between',
  } as CSSProperties,
  templateLabel: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: 'var(--color-text-secondary)',
  } as CSSProperties,
};

export default function RitualHubPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState(0);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const { data: surveyStatus } = useQuery({
    queryKey: ['ritual-status'],
    queryFn: () => surveyApi.getStatus('550e8400-e29b-41d4-a716-446655440000'),
    enabled: isAuthenticated,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (surveyStatus?.id) {
      setSurveyUrl(`https://remirai.app/s/${surveyStatus.id}`);
    }
  }, [surveyStatus]);

  useEffect(() => {
    if (progressFillRef.current) {
      guidanceInteractions.progressShimmer(progressFillRef.current);
    }
  }, []);

  const progressPercentage = useMemo(() => {
    if (!surveyStatus?.threshold) return 0;
    return Math.min(100, Math.round((surveyStatus.responsesCount / surveyStatus.threshold) * 100));
  }, [surveyStatus]);

  const surveyStage: SurveyStage = useMemo(() => {
    if (surveyStatus?.canCreatePersona) return 'READY';
    if (surveyStatus?.responsesCount && surveyStatus.responsesCount > 0) return 'COLLECTING';
    return 'COLLECTING';
  }, [surveyStatus]);

  const handleShare = (platform: string) => {
    if (platform === 'copy' && surveyUrl) {
      navigator.clipboard.writeText(surveyUrl);
      setShareCount((prev) => prev + 1);
    }
  };

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
      value: surveyStatus?.canCreatePersona ? 'Ready' : 'Collecting',
      hint: surveyStatus?.canCreatePersona ? 'You can synthesize now' : 'Keep sharing',
    },
  ];

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.rhub}>
        <header style={pageStyles.header}>
          <div>
            <p style={pageStyles.kicker}>Survey Hub</p>
            <h1>Gather anonymous echoes</h1>
            <p style={pageStyles.subtitle}>
              Track progress, share your ritual link, and nudge friends for more feedback.
            </p>
          </div>
        </header>

        <section style={pageStyles.progressSection}>
          <div style={pageStyles.progressCard}>
            <div style={pageStyles.progressHeader}>
              <div>
                <p style={pageStyles.label}>Echoes collected</p>
                <h2>
                  {surveyStatus?.responsesCount ?? 0}/{surveyStatus?.threshold ?? 3}
                </h2>
              </div>
              <StageBadge stage={surveyStage} />
            </div>
            <div style={pageStyles.progressTrack}>
              <div
                ref={progressFillRef}
                style={{ ...pageStyles.progressFill, width: `${progressPercentage}%` }}
              />
            </div>
            <p style={pageStyles.helper}>
              {surveyStatus?.canCreatePersona
                ? 'Threshold reached. You can synthesize your persona now.'
                : 'Share your ritual link to gather anonymous echoes.'}
            </p>
            <div style={pageStyles.metrics}>
              {metrics.map((metric) => (
                <div key={metric.label} style={pageStyles.metric}>
                  <p style={pageStyles.metricLabel}>{metric.label}</p>
                  <p style={pageStyles.metricValue}>{metric.value}</p>
                  <p style={pageStyles.metricHint}>{metric.hint}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={pageStyles.sharePanel}>
            {surveyUrl && (
              <SurveyLinkCard
                link={surveyUrl}
                shareCount={shareCount}
                onCopy={() => setShareCount((prev) => prev + 1)}
              />
            )}
            <ShareOptions
              platforms={['whatsapp', 'instagram', 'twitter', 'copy']}
              onShare={handleShare}
              link={surveyUrl ?? undefined}
            />
          </div>
        </section>

        <section style={pageStyles.reminderSection}>
          <div>
            <h2>Need more responses?</h2>
            <p>Send yourself a reminder or ping friends directly.</p>
          </div>
          <div style={pageStyles.reminderActions}>
            <Button variant="secondary" onClick={() => alert('Reminder scheduled!')}>
              ⏰ Remind me later
            </Button>
            <Button variant="primary" onClick={() => alert('Reminder sent!')}>
              📣 Notify friends
            </Button>
          </div>
        </section>

        {/* Practice Mode Section (FR-001.5) */}
        <section style={pageStyles.practiceSection}>
          <div>
            <h2 style={pageStyles.practiceH2}>🎭 Try Practice Mode</h2>
            <p style={pageStyles.practiceP}>
              Can&apos;t wait for friend responses? Answer the questions yourself to create a
              <strong> Proto-Persona</strong> based on self-perception.
            </p>
          </div>
          <Button variant="secondary" onClick={() => router.push('/dashboard/practice')}>
            Start Practice Mode
          </Button>
        </section>

        <section style={pageStyles.templateSection}>
          <div>
            <p style={pageStyles.kicker}>Templates</p>
            <h2>Choose a survey flow that matches your ritual.</h2>
          </div>
          <div style={pageStyles.templateGrid}>
            {SURVEY_TEMPLATES.map((template) => (
              <div key={template.id} style={pageStyles.templateCard}>
                <div>
                  <p style={pageStyles.templateLabel}>{template.length}</p>
                  <h3>{template.title}</h3>
                  <p>{template.description}</p>
                </div>
                <Button variant="ghost" onClick={() => alert(`Template ${template.title} selected`)}>
                  Preview
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
