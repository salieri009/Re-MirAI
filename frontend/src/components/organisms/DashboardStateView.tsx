'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { QuestCard } from '@/components/molecules/QuestCard';
import { SurveyLinkCard } from '@/components/molecules/SurveyLinkCard';
import { guidanceInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import type { SurveyStatus } from '@/lib/api/survey';
import type { Persona } from '@/lib/api/persona';
import type { Quest } from '@/lib/api/quest';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

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

const stateRootStyle: CSSProperties = {
  padding: spacing.lg,
};

const stateContentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
};

const cardBase: CSSProperties = {
  padding: spacing.xl,
  background: colors.surface,
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
  boxShadow: shadows.md,
};

const cardEmpty: CSSProperties = {
  textAlign: 'center',
};

const cardReady: CSSProperties = {
  background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)`,
  borderColor: colors.accent,
};

const headingStyle: CSSProperties = {
  fontSize: typography.size['2xl'],
  fontWeight: typography.weight.bold,
  color: colors.text,
  marginBottom: spacing.sm,
};

const labelStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.accent,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: spacing.xs,
};

const journeyMapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  margin: `${spacing.xl}px 0`,
};

const journeyStepBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.xs,
  opacity: 0.5,
};

const journeyStepActive: CSSProperties = {
  opacity: 1,
};

const stepIconStyle: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: colors.surfaceElevated,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
};

const connectorStyle: CSSProperties = {
  width: 40,
  height: 2,
  background: colors.border,
};

const tipCardStyle: CSSProperties = {
  padding: spacing.md,
  background: colors.surfaceElevated,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  marginBottom: spacing.lg,
};

const tipLabelStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.accent,
  fontWeight: typography.weight.medium,
  marginBottom: spacing.xs,
};

const collectingHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.md,
};

const counterStyle: CSSProperties = {
  fontSize: typography.size['3xl'],
  fontWeight: typography.weight.bold,
  color: colors.text,
};

const thresholdStyle: CSSProperties = {
  fontSize: typography.size.xl,
  color: colors.textMuted,
};

const badgeStyleMsg: CSSProperties = {
  padding: `${spacing.xs}px ${spacing.md}px`,
  background: colors.accent,
  borderRadius: radius.full,
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.text,
};

const progressTrackStyle: CSSProperties = {
  height: 8,
  background: colors.border,
  borderRadius: radius.full,
  overflow: 'hidden',
  marginBottom: spacing.md,
};

const progressFillStyle: CSSProperties = {
  height: '100%',
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
  borderRadius: radius.full,
  transition: 'width 0.5s ease',
};

const helperTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  marginBottom: spacing.lg,
};

const questsStyle: CSSProperties = {
  marginTop: spacing.lg,
};

const questListStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: spacing.md,
  marginTop: spacing.md,
};

const activeGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.lg,
};

const personaPanelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
};

const quickActionsStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.md,
};

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
    <div style={mergeStyles(cardBase, cardEmpty)}>
      <h2 style={headingStyle}>Your journey begins</h2>
      <p>Create your first perception ritual to start gathering anonymous echoes.</p>
      <div style={journeyMapStyle}>
        <div style={mergeStyles(journeyStepBase, journeyStepActive)}>
          <div style={stepIconStyle}>🔗</div>
          <p>Create Ritual</p>
        </div>
        <div style={connectorStyle} />
        <div style={journeyStepBase}>
          <div style={stepIconStyle}>📤</div>
          <p>Share Link</p>
        </div>
        <div style={connectorStyle} />
        <div style={journeyStepBase}>
          <div style={stepIconStyle}>🔮</div>
          <p>Collect Echoes</p>
        </div>
        <div style={connectorStyle} />
        <div style={journeyStepBase}>
          <div style={stepIconStyle}>⚡</div>
          <p>Summon</p>
        </div>
      </div>
      <div style={tipCardStyle}>
        <p style={tipLabelStyle}>Tip</p>
        <p>People respond 2× faster when you add a personal note to the link.</p>
      </div>
      <Button variant="primary" size="lg" onClick={onCreateSurvey}>🌟 Create First Survey</Button>
    </div>
  );

  const renderCollectingState = () => (
    <>
      <div style={cardBase}>
        <div style={collectingHeaderStyle}>
          <div>
            <p style={labelStyle}>Echoes collected</p>
            <span ref={echoCountRef} style={counterStyle}>{surveyStatus?.responsesCount ?? 0}</span>
            <span style={thresholdStyle}> / {surveyStatus?.threshold ?? '?'}</span>
          </div>
          <span style={badgeStyleMsg}>Need {responsesNeeded || 0} more</span>
        </div>
        <div style={progressTrackStyle} role="progressbar" aria-label={`Survey progress: ${progressPercentage}%`} aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
          <div ref={progressFillRef} style={{ ...progressFillStyle, width: `${progressPercentage}%` }} />
        </div>
        <p style={helperTextStyle}>Every echo is anonymous. Keep sharing your ritual link to reach the summoning threshold.</p>
        {surveyUrl ? (
          <Button ref={state === 'collecting' ? primaryActionRef : undefined} variant="primary" size="lg" onClick={() => { onCopySurveyLink?.(); announce('Survey link copied to clipboard', 'polite'); }}>📤 Share Survey Link</Button>
        ) : (
          <Button variant="secondary" onClick={onCreateSurvey}>Create Survey Link</Button>
        )}
      </div>
      {surveyUrl && <SurveyLinkCard link={surveyUrl} shareCount={shareCount} lastShared={lastShared} onCopy={() => { onCopySurveyLink?.(); announce('Survey link copied to clipboard', 'polite'); }} />}
      {quests && quests.length > 0 && (
        <div style={questsStyle}>
          <h3>Active Quests</h3>
          <div style={questListStyle}>{quests.map((quest) => <QuestCard key={quest.id} quest={quest} onClaim={onClaimQuest ?? (() => Promise.resolve())} />)}</div>
        </div>
      )}
    </>
  );

  const renderReadyState = () => (
    <div style={mergeStyles(cardBase, cardReady)}>
      <p style={labelStyle}>SUMMON READY ⚡</p>
      <h2 style={headingStyle}>All echoes gathered</h2>
      <p>Your persona is waiting to be born. Begin the ritual to reveal them.</p>
      <Button ref={state === 'ready' ? primaryActionRef : undefined} variant="primary" size="lg" onClick={onSummon}>Summon Persona Now!</Button>
    </div>
  );

  const renderActiveState = () => (
    <div style={activeGridStyle}>
      {persona && (
        <div style={personaPanelStyle}>
          <PersonaCard persona={persona} />
          <div style={quickActionsStyle}>
            {onChat && <Button variant="primary" size="lg" onClick={onChat}>💬 Chat with {persona.name}</Button>}
            {onViewPersona && <Button variant="secondary" onClick={onViewPersona}>Enter Persona Room</Button>}
          </div>
        </div>
      )}
      {quests && quests.length > 0 && (
        <div style={questsStyle}>
          <h3>Continue your journey</h3>
          <div style={questListStyle}>{quests.map((quest) => <QuestCard key={quest.id} quest={quest} onClaim={onClaimQuest ?? (() => Promise.resolve())} />)}</div>
        </div>
      )}
    </div>
  );

  return (
    <section style={stateRootStyle}>
      <div ref={containerRef} style={stateContentStyle}>
        {state === 'empty' && renderEmptyState()}
        {state === 'collecting' && renderCollectingState()}
        {state === 'ready' && renderReadyState()}
        {state === 'active' && renderActiveState()}
      </div>
    </section>
  );
}
