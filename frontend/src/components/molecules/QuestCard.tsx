'use client';

import React from 'react';
import { Quest } from '@/lib/api/quest';
import { Button } from '@/components/atoms/Button';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface QuestCardProps {
  quest: Quest;
  onClaim: (questId: string) => Promise<void>;
}

const cardBase: CSSProperties = {
  display: 'flex',
  gap: spacing.md,
  padding: spacing.md,
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  transition: 'all 0.2s ease',
};

const cardCompleted: CSSProperties = {
  borderColor: colors.accent,
  boxShadow: shadows.glowAccent,
};

const cardLocked: CSSProperties = {
  opacity: 0.6,
};

const progressRingStyle: CSSProperties = {
  position: 'relative',
  width: 48,
  height: 48,
  flexShrink: 0,
};

const ringSvgStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  transform: 'rotate(-90deg)',
};

const ringBackgroundStyle: CSSProperties = {
  fill: 'none',
  stroke: colors.border,
  strokeWidth: 3,
};

const ringProgressStyle: CSSProperties = {
  fill: 'none',
  stroke: colors.accent,
  strokeWidth: 3,
  strokeLinecap: 'round',
  transition: 'stroke-dashoffset 0.5s ease',
};

const statusIconStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: typography.size.lg,
};

const contentStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.sm,
};

const nameStyle: CSSProperties = {
  fontSize: typography.size.base,
  fontWeight: typography.weight.semiBold,
  color: colors.text,
  margin: 0,
};

const rewardStyle: CSSProperties = {
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.highlight,
};

const descriptionStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  margin: 0,
};

export function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progressPercentage = Math.min(100, (quest.progress / quest.requirement) * 100);
  const canClaim = quest.progress >= quest.requirement && quest.status !== 'CLAIMED';
  const isLocked = quest.status === 'CLAIMED';

  const rad = 20;
  const circumference = 2 * Math.PI * rad;
  const offset = circumference - (progressPercentage / 100) * circumference;

  const cardStyle = mergeStyles(
    cardBase,
    canClaim && cardCompleted,
    isLocked && cardLocked
  );

  return (
    <div style={cardStyle}>
      <div style={progressRingStyle}>
        <svg style={ringSvgStyle} viewBox="0 0 48 48">
          <circle
            style={ringBackgroundStyle}
            cx="24"
            cy="24"
            r={rad}
          />
          <circle
            style={ringProgressStyle}
            cx="24"
            cy="24"
            r={rad}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div style={statusIconStyle}>
          {isLocked ? '🔒' : canClaim ? '✨' : '⚔️'}
        </div>
      </div>

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h3 style={nameStyle}>{quest.name}</h3>
          <span style={rewardStyle}>{quest.reward} 💎</span>
        </div>
        <p style={descriptionStyle}>{quest.description}</p>

        {canClaim && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onClaim(quest.id)}
            style={{ marginTop: spacing.xs, alignSelf: 'flex-start' }}
          >
            Claim Reward
          </Button>
        )}
      </div>
    </div>
  );
}
