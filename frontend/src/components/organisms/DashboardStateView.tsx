'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { QuestCard } from '@/components/molecules/QuestCard';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { guidanceInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import type { SurveyStatus } from '@/lib/api/survey';
import type { Persona } from '@/lib/api/persona';
import type { Quest } from '@/lib/api/quest';

export type DashboardState = 'empty' | 'collecting' | 'ready' | 'active';

interface DashboardStateViewProps {
  state: DashboardState;
  surveyStatus?: SurveyStatus | null;
  persona?: Persona | null;
  surveyUrl?: string | null;
  shareCount?: number;
  lastShared?: string;
  quests?: Quest[] | null;
  onCreateSurvey: () => void;
  onSummon?: () => void;
  onChat?: () => void;
  onViewPersona?: () => void;
  onClaimQuest?: (questId: string) => Promise<void>;
  onCopySurveyLink?: () => void;
}

export function DashboardStateView({
  state,
  surveyStatus,
  persona,
  surveyUrl,
  shareCount,
  lastShared,
  quests,
  onCreateSurvey,
  onSummon,
  onChat,
  onViewPersona,
  onClaimQuest,
  onCopySurveyLink,
}: DashboardStateViewProps) {
  const progressFillRef = useRef<HTMLDivElement>(null);
  const primaryActionRef = useRef<HTMLButtonElement>(null);
  const echoCountRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  const progressPercentage = useMemo(() => {
    if (!surveyStatus || surveyStatus.threshold === 0) return 0;
    return Math.min(100, Math.round((surveyStatus.responsesCount / surveyStatus.threshold) * 100));
  }, [surveyStatus]);

  useEffect(() => {
    const messages: Record<DashboardState, string> = {
      empty: 'No survey detected. Create your first ritual link to begin.',
      collecting: 'Collecting anonymous echoes. Share your survey link to progress.',
      ready: 'Required echoes gathered. Summon your persona when ready.',
      active: 'Persona active. Continue bonding or explore new quests.',
    };
    announce(messages[state], state === 'ready' ? 'assertive' : 'polite');
  }, [announce, state]);

  useEffect(() => {
    if (reducedMotion || state !== 'collecting' || !progressFillRef.current) return;
    guidanceInteractions.progressShimmer(progressFillRef.current);
  }, [reducedMotion, state]);

  useEffect(() => {
    if (!progressFillRef.current) return;
    progressFillRef.current.style.width = `${progressPercentage}%`;
  }, [progressPercentage]);

  useEffect(() => {
    if (reducedMotion || state !== 'collecting' || !echoCountRef.current || !surveyStatus) return;
    guidanceInteractions.echoCountUp(echoCountRef.current, 0, surveyStatus.responsesCount);
  }, [reducedMotion, state, surveyStatus]);

  useEffect(() => {
    if (reducedMotion || !primaryActionRef.current || (state !== 'collecting' && state !== 'ready')) return;
    guidanceInteractions.actionPulse(primaryActionRef.current);
  }, [reducedMotion, state]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    gsap.fromTo(containerRef.current, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
  }, [state, reducedMotion]);

  const responsesNeeded = surveyStatus && surveyStatus.responsesCount < surveyStatus.threshold
    ? surveyStatus.threshold - surveyStatus.responsesCount
    : 0;

  const renderEmptyState = () => (
    <div className="rounded-xl border border-slate-700/25 bg-surface p-8 text-center shadow-md">
      <h2 className="mb-2 text-2xl font-bold text-text-primary">Your journey begins</h2>
      <p className="text-text-secondary">Create your first perception ritual to start gathering anonymous echoes.</p>
      <div className="my-8 flex items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-1 opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-2xl">🔗</div>
          <p>Create Ritual</p>
        </div>
        <div className="h-0.5 w-10 bg-slate-700/35" />
        <div className="flex flex-col items-center gap-1 opacity-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-2xl">📤</div>
          <p>Share Link</p>
        </div>
        <div className="h-0.5 w-10 bg-slate-700/35" />
        <div className="flex flex-col items-center gap-1 opacity-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-2xl">🔮</div>
          <p>Collect Echoes</p>
        </div>
        <div className="h-0.5 w-10 bg-slate-700/35" />
        <div className="flex flex-col items-center gap-1 opacity-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated text-2xl">⚡</div>
          <p>Summon</p>
        </div>
      </div>
      <div className="mb-6 rounded-md border border-slate-700/25 bg-surface-elevated p-4 text-left">
        <p className="mb-1 text-xs font-medium text-accent">Tip</p>
        <p>People respond 2× faster when you add a personal note to the link.</p>
      </div>
      <Button variant="primary" size="lg" onClick={onCreateSurvey}>🌟 Create First Survey</Button>
    </div>
  );

  const renderCollectingState = () => (
    <>
      <div className="rounded-xl border border-slate-700/25 bg-surface p-8 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm uppercase tracking-[0.1em] text-accent">Echoes collected</p>
            <span ref={echoCountRef} className="text-3xl font-bold text-text-primary">{surveyStatus?.responsesCount ?? 0}</span>
            <span className="text-xl text-text-muted"> / {surveyStatus?.threshold ?? '?'}</span>
          </div>
          <span className="rounded-full bg-accent px-4 py-1 text-sm font-medium text-text-primary">Need {responsesNeeded || 0} more</span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-700/30" role="progressbar" aria-label={`Survey progress: ${progressPercentage}%`}>
          <div ref={progressFillRef} className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500" />
        </div>
        <p className="mb-6 text-sm text-text-muted">Every echo is anonymous. Keep sharing your ritual link to reach the summoning threshold.</p>
        {surveyUrl ? (
          <Button ref={state === 'collecting' ? primaryActionRef : undefined} variant="primary" size="lg" onClick={() => { onCopySurveyLink?.(); announce('Survey link copied to clipboard', 'polite'); }}>📤 Share Survey Link</Button>
        ) : (
          <Button variant="secondary" onClick={onCreateSurvey}>Create Survey Link</Button>
        )}
      </div>
      {surveyUrl && <SurveyLinkCard link={surveyUrl} shareCount={shareCount} lastShared={lastShared} onCopy={() => { onCopySurveyLink?.(); announce('Survey link copied to clipboard', 'polite'); }} />}
      {quests && quests.length > 0 && (
        <div className="mt-6">
          <h3>Active Quests</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} onClaim={onClaimQuest ?? (() => Promise.resolve())} />)}</div>
        </div>
      )}
    </>
  );

  const renderReadyState = () => (
    <div className="rounded-xl border border-accent/70 bg-gradient-to-br from-primary/10 to-accent/10 p-8 shadow-md">
      <p className="mb-1 text-sm uppercase tracking-[0.1em] text-accent">SUMMON READY ⚡</p>
      <h2 className="mb-2 text-2xl font-bold text-text-primary">All echoes gathered</h2>
      <p className="mb-4 text-text-secondary">Your persona is waiting to be born. Begin the ritual to reveal them.</p>
      <Button ref={state === 'ready' ? primaryActionRef : undefined} variant="primary" size="lg" onClick={onSummon}>Summon Persona Now!</Button>
    </div>
  );

  const renderActiveState = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {persona && (
        <div className="flex flex-col gap-6">
          <PersonaCard persona={persona} />
          <div className="flex gap-4">
            {onChat && <Button variant="primary" size="lg" onClick={onChat}>💬 Chat with {persona.name}</Button>}
            {onViewPersona && <Button variant="secondary" onClick={onViewPersona}>Enter Persona Room</Button>}
          </div>
        </div>
      )}
      {quests && quests.length > 0 && (
        <div className="mt-6 xl:mt-0">
          <h3>Continue your journey</h3>
          <div className="mt-4 grid grid-cols-1 gap-4">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} onClaim={onClaimQuest ?? (() => Promise.resolve())} />)}</div>
        </div>
      )}
    </div>
  );

  return (
    <section className="p-6">
      <div ref={containerRef} className={clsx('flex flex-col gap-6')}>
        {state === 'empty' && renderEmptyState()}
        {state === 'collecting' && renderCollectingState()}
        {state === 'ready' && renderReadyState()}
        {state === 'active' && renderActiveState()}
      </div>
    </section>
  );
}
