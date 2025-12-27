import React from 'react';
import styles from './QuestCard.module.css';
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

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className={`${styles.card} ${canClaim ? styles.completed : ''} ${isLocked ? styles.locked : ''}`}>
      <div className={styles.progressRing}>
        <svg className={styles.ringSvg} viewBox="0 0 48 48">
          <circle
            className={styles.ringBackground}
            cx="24"
            cy="24"
            r={radius}
          />
          <circle
            className={styles.ringProgress}
            cx="24"
            cy="24"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.statusIcon}>
          {isLocked ? '🔒' : canClaim ? '✨' : '⚔️'}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{quest.name}</h3>
          <span className={styles.reward}>{quest.reward} 💎</span>
        </div>
        <p className={styles.description}>{quest.description}</p>

        {canClaim && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onClaim(quest.id)}
            className={styles.claimButton}
          >
            Claim Reward
          </Button>
        )}
      </div>
    </div>
  );
}




