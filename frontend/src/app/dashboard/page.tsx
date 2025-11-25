'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { QuestCard } from '@/components/molecules/QuestCard';
import { StatusCard } from '@/components/molecules/StatusCard';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { Button } from '@/components/atoms/Button';
import { SurveyStatus } from '@/lib/mock-data/surveys';
import { Persona } from '@/lib/mock-data/personas';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [surveyUrl, setSurveyUrl] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Fetch survey status
  const { data: statusData } = useQuery({
    queryKey: ['survey-status'],
    queryFn: () => surveyApi.getStatus('550e8400-e29b-41d4-a716-446655440000'),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (statusData) {
      setSurveyStatus(statusData);
      // Set default survey URL if status exists
      if (statusData.id && !surveyUrl) {
        setSurveyUrl(`https://remirai.app/s/${statusData.id}`);
      }
    }
  }, [statusData, surveyUrl]);

  // Fetch persona if exists
  const { data: personas } = useQuery({
    queryKey: ['personas'],
    queryFn: () => personaApi.list(),
    enabled: isAuthenticated && surveyStatus?.canCreatePersona === true,
    onSuccess: (data) => {
      if (data.length > 0) {
        setPersona(data[0]);
      }
    }
  });

  // Fetch quests
  const { data: quests } = useQuery({
    queryKey: ['quests'],
    queryFn: () => questApi.getActive(),
    enabled: isAuthenticated
  });

  const [surveyLink, setSurveyLink] = useState<string | null>(null);

  const handleCreateSurvey = async () => {
    try {
      const survey = await surveyApi.create();
      setSurveyUrl(survey.url);
      // Refresh status
      window.location.reload();
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  };

  const handleCreatePersona = () => {
    router.push('/dashboard/synthesize');
  };

  const handleChat = () => {
    if (persona) {
      router.push(`/chat/${persona.id}`);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  // State 1: Awaiting Responses
  if (surveyStatus && !surveyStatus.canCreatePersona && !persona) {
    const progressPercentage = Math.round(
      (surveyStatus.responsesCount / surveyStatus.threshold) * 100
    );
    
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Welcome back ✨</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <StatusCard
          status="collecting"
          progress={{
            current: surveyStatus.responsesCount,
            target: surveyStatus.threshold,
            percentage: progressPercentage
          }}
          message={
            surveyStatus.responsesCount < surveyStatus.threshold
              ? `One more Echo needed...`
              : undefined
          }
        />

        {surveyUrl && (
          <SurveyLinkCard
            link={surveyUrl}
            shareCount={0}
            lastShared={undefined}
          />
        )}

        {!surveyUrl && (
          <div className={styles.actions}>
            <Button variant="primary" onClick={handleCreateSurvey}>
              Create Survey Link
            </Button>
          </div>
        )}

        {quests && quests.length > 0 && (
          <div className={styles.quests}>
            <h2>Active Quests</h2>
            <div className={styles.questList}>
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onClaim={async (id) => {
                    await questApi.claim(id);
                    window.location.reload();
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // State 2: Ready for Synthesis
  if (surveyStatus && surveyStatus.canCreatePersona && !persona) {
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>The time has come ✨🌟</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <StatusCard
          status="ready"
          progress={{
            current: surveyStatus.responsesCount,
            target: surveyStatus.threshold,
            percentage: 100
          }}
          onAction={handleCreatePersona}
          actionLabel="SUMMON PERSONA NOW!"
        />
      </div>
    );
  }

  // State 3: Active Persona
  if (persona) {
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Welcome back. {persona.name} awaits... ✨</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <StatusCard
          status="active"
          onAction={handleChat}
          actionLabel={`💬 Chat with ${persona.name}`}
        />

        <div className={styles.personaSection}>
          <PersonaCard persona={persona} />
        </div>
      </div>
    );
  }

  // Empty State
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome, Seeker ✨</h1>
        <Button variant="ghost" onClick={logout}>Logout</Button>
      </header>

      <StatusCard
        status="empty"
        onAction={handleCreateSurvey}
        actionLabel="🌟 Create First Survey"
        message="1. Create Survey | 2. Share with friends | 3. Collect 3 Echoes | 4. Summon your Persona"
      />
    </div>
  );
}


