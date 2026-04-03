'use client';

import React from 'react';
import { Quest } from '@/lib/api/quest';
import { Button } from '@/components/atoms/Button';

interface QuestCardProps {
  quest: Quest;
  onClaim: (questId: string) => Promise<void>;
}

export function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progressPercentage = Math.min(100, (quest.progress / quest.requirement) * 100);
  const canClaim = quest.progress >= quest.requirement && quest.status !== 'CLAIMED';
  const isLocked = quest.status === 'CLAIMED';

  const rad = 20;
  const circumference = 2 * Math.PI * rad;
  const offset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className={`flex gap-4 rounded-lg border border-slate-700/25 bg-surface p-4 transition-all duration-200 ${canClaim ? 'border-accent shadow-glow-accent' : ''} ${isLocked ? 'opacity-60' : ''}`.trim()}>
      <div className="relative h-12 w-12 shrink-0">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={rad}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={3}
          />
          <circle
            cx="24"
            cy="24"
            r={rad}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
          {isLocked ? '🔒' : canClaim ? '✨' : '⚔️'}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="m-0 text-base font-semibold text-text-primary">{quest.name}</h3>
          <span className="text-sm font-medium text-highlight">{quest.reward} 💎</span>
        </div>
        <p className="m-0 text-sm text-text-muted">{quest.description}</p>

        {canClaim && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onClaim(quest.id)}
            className="mt-1 self-start"
          >
            Claim Reward
          </Button>
        )}
      </div>
    </div>
  );
}
