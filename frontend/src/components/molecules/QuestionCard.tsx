import React from 'react';
import styles from './QuestionCard.module.css';
import { SurveyQuestion } from '@/lib/mock-data/surveys';

interface QuestionCardProps {
  question: SurveyQuestion;
  value?: number;
  onChange: (value: number) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const scale = question.scale;
  const options = Array.from(
    { length: scale.max - scale.min + 1 },
    (_, i) => scale.min + i
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.question}>{question.text}</h3>
      <div className={styles.scale}>
        <span className={styles.label}>전혀 아니다</span>
        <div className={styles.options}>
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.option} ${value === option ? styles.selected : ''}`}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <span className={styles.label}>매우 그렇다</span>
      </div>
    </div>
  );
}


