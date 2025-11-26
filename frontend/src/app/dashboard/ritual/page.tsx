'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { Button } from '@/components/atoms/Button';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { guidanceInteractions } from '@/lib/micro-interactions';
import styles from './page.module.css';

export default function SurveyHubPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState(0);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const { data: surveyStatus } = useQuery({
    queryKey: ['survey-status'],
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
    return Math.min(
      100,
      Math.round((surveyStatus.responsesCount / surveyStatus.threshold) * 100)
    );
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
    <div className={styles.container}>
      <div className={styles.rhub}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Survey Hub</p>
            <h1>Gather anonymous echoes</h1>
            <p className={styles.subtitle}>
              Track progress, share your survey link, and nudge friends for more feedback.
            </p>
          </div>
        </header>

        <section className={styles.progressSection}>
          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <div>
                <p className={styles.label}>Echoes collected</p>
                <h2>
                  {surveyStatus?.responsesCount ?? 0}/{surveyStatus?.threshold ?? 3}
                </h2>
              </div>
              <span className={styles.badge}>
                {surveyStatus?.canCreatePersona ? 'Ready to Summon' : 'Collecting'}
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                ref={progressFillRef}
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className={styles.helper}>
              {surveyStatus?.canCreatePersona
                ? 'Threshold reached. You can synthesize your persona now.'
                : 'Share your survey link to gather anonymous echoes.'}
            </p>
            <div className={styles.metrics}>
              {metrics.map((metric) => (
                <div key={metric.label} className={styles.metric}>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <p className={styles.metricValue}>{metric.value}</p>
                  <p className={styles.metricHint}>{metric.hint}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sharePanel}>
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

        <section className={styles.reminderSection}>
          <div>
            <h2>Need more responses?</h2>
            <p>Send yourself a reminder or ping friends directly.</p>
          </div>
          <div className={styles.reminderActions}>
            <Button variant="secondary" onClick={() => alert('Reminder scheduled!')}>
              ⏰ Remind me later
            </Button>
            <Button variant="primary" onClick={() => alert('Reminder sent!')}>
              📣 Notify friends
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

