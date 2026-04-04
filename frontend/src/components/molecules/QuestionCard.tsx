'use client';

import React, { useState } from 'react';
import { SurveyQuestion } from '@/lib/api/survey';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: SurveyQuestion;
  value?: number;
  onChange: (value: number) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const scale = question.scale ?? { min: 1, max: 5, labels: {} };
  const options = Array.from(
    { length: scale.max - scale.min + 1 },
    (_, i) => scale.min + i
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.question}>{question.text}</h3>
      <div className={styles.scaleRow}>
        <span className={styles.label}>전혀 아니다</span>
        <div className={styles.options}>
          {options.map((option) => (
            <button
              key={option}
              className={[
                styles.option,
                hoveredOption === option ? styles.optionHover : '',
                value === option ? styles.optionSelected : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onChange(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
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
