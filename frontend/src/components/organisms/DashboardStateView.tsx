'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { QuestCard } from '@/components/molecules/QuestCard';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { guidanceInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import type { SurveyStatus } from '@/lib/mock-data/surveys';
import type { Persona } from '@/lib/mock-data/personas';
import type { Quest } from '@/lib/mock-data/quests';
import styles from './DashboardStateView.module.css';

export type DashboardState = 'empty' | 'collecting' | 'ready' | 'active';

interface DashboardStateViewProps {
  state: DashboardState;
  surveyStatus?: SurveyStatus | null;
  persona?: Persona | null;
  surveyUrl?: string | null;
  quests?: Quest[] | null;
  onCreateSurvey: () => void;
  onSummon?: () => void;
  onChat?: () => void;
  onViewPersona?: () => void;
  onClaimQuest?: (questId: string) => Promise<void>;
}

export function DashboardStateView({
  state,
  surveyStatus,
  persona,
  surveyUrl,
  quests,
  onCreateSurvey,
  onSummon,
  onChat,
  onViewPersona,
  onClaimQuest,
}: DashboardStateViewProps) {
  const progressFillRef = useRef<HTMLDivElement>(null);
  const primaryActionRef = useRef<HTMLButtonElement>(null);
  const echoCountRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  const progressPercentage = useMemo(() => {
    if (!surveyStatus || surveyStatus.threshold === 0) return 0;
    return Math.min(
      100,
      Math.round((surveyStatus.responsesCount / surveyStatus.threshold) * 100)
    );
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
    if (
      reducedMotion ||
      state !== 'collecting' ||
      !echoCountRef.current ||
      !surveyStatus
    )
      return;

    guidanceInteractions.echoCountUp(
      echoCountRef.current,
      0,
      surveyStatus.responsesCount
    );
  }, [reducedMotion, state, surveyStatus]);

  useEffect(() => {
    if (
      reducedMotion ||
      !primaryActionRef.current ||
      (state !== 'collecting' && state !== 'ready')
    )
      return;

    guidanceInteractions.actionPulse(primaryActionRef.current);
  }, [reducedMotion, state]);

  const responsesNeeded =
    surveyStatus && surveyStatus.responsesCount < surveyStatus.threshold
      ? surveyStatus.threshold - surveyStatus.responsesCount
      : 0;

  const renderEmptyState = () => (
    <div className={`${styles.card} ${styles.empty}`}>
      <h2>Your journey begins</h2>
      <p>Collect echoes from friends to reveal who they believe you are.</p>
      <ol className={styles.stepList}>
        <li>Create a perception ritual (survey)</li>
        <li>Share it with friends</li>
        <li>Collect the required echoes</li>
        <li>Summon your persona</li>
      </ol>
      <Button variant="primary" size="lg" onClick={onCreateSurvey}>
        🌟 Create First Survey
      </Button>
    </div>
  );

  const renderCollectingState = () => (
    <>
      <div className={`${styles.card} ${styles.collecting}`}>
        <div className={styles.collectingHeader}>
          <div>
            <p className={styles.label}>Echoes collected</p>
            <span ref={echoCountRef} className={styles.counter}>
              {surveyStatus?.responsesCount ?? 0}
            </span>
            <span className={styles.threshold}>
              / {surveyStatus?.threshold ?? '?'}
            </span>
          </div>
          <span className={styles.badge}>Need {responsesNeeded || 0} more</span>
        </div>

        <div className={styles.progressTrack} aria-label="Survey progress">
          <div
            ref={progressFillRef}
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <p className={styles.helperText}>
          Every echo is anonymous. Keep sharing your ritual link to reach the summoning
          threshold.
        </p>

        {surveyUrl ? (
          <Button
            ref={state === 'collecting' ? primaryActionRef : undefined}
            variant="primary"
            size="lg"
            onClick={() => {
              navigator.clipboard.writeText(surveyUrl);
              announce('Survey link copied to clipboard', 'polite');
            }}
          >
            📤 Share Survey Link
          </Button>
        ) : (
          <Button variant="secondary" onClick={onCreateSurvey}>
            Create Survey Link
          </Button>
        )}
      </div>

      {surveyUrl && (
        <SurveyLinkCard
          link={surveyUrl}
          shareCount={0}
          lastShared={undefined}
          onCopy={() => announce('Survey link copied to clipboard', 'polite')}
        />
      )}

      {quests && quests.length > 0 && (
        <div className={styles.quests}>
          <h3>Active Quests</h3>
          <div className={styles.questList}>
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClaim={onClaimQuest ?? (() => Promise.resolve())}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );

  const renderReadyState = () => (
    <div className={`${styles.card} ${styles.ready}`}>
      <p className={styles.label}>SUMMON READY ⚡</p>
      <h2>All echoes gathered</h2>
      <p>Your persona is waiting to be born. Begin the ritual to reveal them.</p>
      <Button
        ref={state === 'ready' ? primaryActionRef : undefined}
        variant="primary"
        size="lg"
        onClick={onSummon}
      >
        Summon Persona Now!
      </Button>
    </div>
  );

  const renderActiveState = () => (
    <div className={styles.activeGrid}>
      {persona && (
        <div className={styles.personaPanel}>
          <PersonaCard persona={persona} />
          <div className={styles.quickActions}>
            {onChat && (
              <Button variant="primary" size="lg" onClick={onChat}>
                💬 Chat with {persona.name}
              </Button>
            )}
            {onViewPersona && (
              <Button variant="secondary" onClick={onViewPersona}>
                Enter Persona Room
              </Button>
            )}
          </div>
        </div>
      )}

      {quests && quests.length > 0 && (
        <div className={styles.quests}>
          <h3>Continue your journey</h3>
          <div className={styles.questList}>
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClaim={onClaimQuest ?? (() => Promise.resolve())}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className={`${styles.stateRoot} ${styles[state]}`}>
      <div className={styles.stateContent}>
        {state === 'empty' && renderEmptyState()}
        {state === 'collecting' && renderCollectingState()}
        {state === 'ready' && renderReadyState()}
        {state === 'active' && renderActiveState()}
      </div>
    </section>
  );
}

