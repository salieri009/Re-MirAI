'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { surveyApi } from '@/lib/api/survey';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { Button } from '@/components/atoms/Button';
import { DashboardStateView, DashboardState } from '@/components/organisms/DashboardStateView';
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

  const handleViewPersona = () => {
    if (persona) {
      router.push(`/p/${persona.id}`);
    }
  };

  const handleClaimQuest = async (questId: string) => {
    await questApi.claim(questId);
    window.location.reload();
  };

  const dashboardState: DashboardState = (() => {
    if (persona) return 'active';
    if (surveyStatus?.canCreatePersona) return 'ready';
    if (surveyStatus && surveyStatus.responsesCount > 0) return 'collecting';
    return 'empty';
  })();

  const headerTitle =
    dashboardState === 'active' && persona
      ? `Welcome back. ${persona.name} awaits... ✨`
      : dashboardState === 'ready'
      ? 'The time has come ✨🌟'
      : dashboardState === 'collecting'
      ? 'Welcome back ✨'
      : 'Welcome, Seeker ✨';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>{headerTitle}</h1>
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </header>

      <DashboardStateView
        state={dashboardState}
        surveyStatus={surveyStatus}
        persona={persona}
        surveyUrl={surveyUrl}
        quests={quests ?? null}
        onCreateSurvey={handleCreateSurvey}
        onSummon={handleCreatePersona}
        onChat={handleChat}
        onViewPersona={handleViewPersona}
        onClaimQuest={handleClaimQuest}
      />
    </div>
  );
}


