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
import { Button } from '@/components/atoms/Button';
import { SurveyStatus } from '@/lib/mock-data/surveys';
import { Persona } from '@/lib/mock-data/personas';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);

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
    onSuccess: (data) => {
      setSurveyStatus(data);
    }
  });

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

  const handleCreateSurvey = async () => {
    try {
      const survey = await surveyApi.create();
      alert(`Survey created! URL: ${survey.url}`);
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
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <div className={styles.statusSection}>
          <h2>Waiting for Responses</h2>
          <ProgressBar
            current={surveyStatus.responsesCount}
            total={surveyStatus.threshold}
            label={`${surveyStatus.responsesCount} out of ${surveyStatus.threshold} responses received`}
          />
        </div>

        <div className={styles.actions}>
          <div className={styles.card}>
            <h3>Share Survey</h3>
            <p>Share your survey link with friends</p>
            <Button variant="primary" onClick={handleCreateSurvey}>
              Create Survey
            </Button>
          </div>
        </div>

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
          <h1>Dashboard</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <div className={styles.statusSection}>
          <h2>Ready to Create Persona!</h2>
          <p>You have received {surveyStatus.responsesCount} responses.</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={handleCreatePersona}>
            Create Persona
          </Button>
        </div>
      </div>
    );
  }

  // State 3: Active Persona
  if (persona) {
    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </header>

        <div className={styles.personaSection}>
          <PersonaCard persona={persona} />
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={handleChat}>
            Chat with {persona.name}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <Button variant="ghost" onClick={logout}>Logout</Button>
      </header>
      <p>Loading...</p>
    </div>
  );
}


