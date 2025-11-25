import React from 'react';
import styles from './QuestCard.module.css';
import { Quest } from '@/lib/mock-data/quests';
import { Button } from '@/components/atoms/Button';

interface QuestCardProps {
  quest: Quest;
  onClaim: (questId: string) => Promise<void>;
}

export function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progressPercentage = (quest.progress / quest.requirement) * 100;
  const canClaim = quest.progress >= quest.requirement && quest.status === 'COMPLETED';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{quest.name}</h3>
        <span className={styles.reward}>{quest.reward} 💎</span>
      </div>
      <p className={styles.description}>{quest.description}</p>
      
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        />
        <span className={styles.progressText}>
          {quest.progress} / {quest.requirement}
        </span>
      </div>

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
  );
}


