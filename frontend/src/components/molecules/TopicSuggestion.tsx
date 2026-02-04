'use client';

import { useState } from 'react';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

interface TopicSuggestionProps {
  topics: string[];
  recentTopics?: string[];
  onSelect: (topic: string) => void;
  label?: string;
}

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.md,
};

const labelStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  margin: 0,
};

const recentStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
};

const recentTopicStyle: CSSProperties = {
  color: colors.highlight,
  marginLeft: spacing.xxs,
};

const topicListStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.xs,
};

const topicButtonBase: CSSProperties = {
  padding: `${spacing.xs}px ${spacing.md}px`,
  fontSize: typography.size.sm,
  color: colors.textSecondary,
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.pill,
  cursor: 'pointer',
  transition: transitions.normal,
  fontFamily: typography.fontSans,
};

const topicButtonHover: CSSProperties = {
  borderColor: colors.highlight,
  color: colors.text,
  background: colors.surfaceElevated,
};

export function TopicSuggestion({
  topics,
  recentTopics = [],
  onSelect,
  label = 'Need inspiration?',
}: TopicSuggestionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const visibleTopics = topics.slice(0, 4);

  return (
    <div style={wrapperStyle} aria-label="Conversation starters">
      <div style={headerStyle}>
        <p style={labelStyle}>{label}</p>
        {recentTopics.length > 0 && (
          <span style={recentStyle}>
            Recent:{' '}
            {recentTopics.slice(0, 2).map((topic, index) => (
              <span key={`${topic}-${index}`} style={recentTopicStyle}>
                {topic}
              </span>
            ))}
          </span>
        )}
      </div>
      <div style={topicListStyle}>
        {visibleTopics.map((topic, index) => (
          <button
            key={topic}
            type="button"
            style={mergeStyles(
              topicButtonBase,
              hoveredIndex === index && topicButtonHover
            )}
            onClick={() => onSelect(topic)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
