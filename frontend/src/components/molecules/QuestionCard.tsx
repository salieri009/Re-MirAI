'use client';

import React, { useState } from 'react';
import { SurveyQuestion } from '@/lib/api/survey';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

interface QuestionCardProps {
  question: SurveyQuestion;
  value?: number;
  onChange: (value: number) => void;
}

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
  padding: spacing.lg,
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
};

const questionStyle: CSSProperties = {
  fontSize: typography.size.lg,
  fontWeight: typography.weight.medium,
  color: colors.text,
  margin: 0,
  lineHeight: 1.5,
};

const scaleStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.sm,
};

const labelStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  whiteSpace: 'nowrap',
};

const optionsStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.xs,
  flex: 1,
  justifyContent: 'center',
};

const optionBase: CSSProperties = {
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.textSecondary,
  background: colors.surfaceElevated,
  border: `2px solid ${colors.border}`,
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: transitions.normal,
  fontFamily: typography.fontSans,
};

const optionHover: CSSProperties = {
  borderColor: colors.highlight,
  color: colors.text,
};

const optionSelected: CSSProperties = {
  background: colors.primary,
  borderColor: colors.primary,
  color: colors.text,
};

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const scale = question.scale ?? { min: 1, max: 5, labels: {} };
  const options = Array.from(
    { length: scale.max - scale.min + 1 },
    (_, i) => scale.min + i
  );

  return (
    <div style={cardStyle}>
      <h3 style={questionStyle}>{question.text}</h3>
      <div style={scaleStyle}>
        <span style={labelStyle}>전혀 아니다</span>
        <div style={optionsStyle}>
          {options.map((option) => (
            <button
              key={option}
              style={mergeStyles(
                optionBase,
                hoveredOption === option ? optionHover : undefined,
                value === option ? optionSelected : undefined
              )}
              onClick={() => onChange(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {option}
            </button>
          ))}
        </div>
        <span style={labelStyle}>매우 그렇다</span>
      </div>
    </div>
  );
}
