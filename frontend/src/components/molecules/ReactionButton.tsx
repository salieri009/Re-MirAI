'use client';

import { useState } from 'react';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

const REACTION_SET = ['❤️', '😂', '😮', '😢', '👍'];

interface ReactionButtonProps {
  messageId: string;
  reactions?: Record<string, number>;
  onReact: (messageId: string, emoji: string) => void;
}

const wrapperStyle: CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
};

const triggerBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xxs,
  padding: `${spacing.xxs}px ${spacing.xs}px`,
  fontSize: typography.size.xs,
  color: colors.textMuted,
  background: 'transparent',
  border: `1px solid ${colors.border}`,
  borderRadius: radius.pill,
  cursor: 'pointer',
  transition: transitions.normal,
  fontFamily: typography.fontSans,
};

const triggerHover: CSSProperties = {
  borderColor: colors.highlight,
  color: colors.text,
  background: colors.surface,
};

const menuStyle: CSSProperties = {
  position: 'absolute',
  bottom: '100%',
  left: 0,
  marginBottom: spacing.xs,
  display: 'flex',
  gap: spacing.xxs,
  padding: spacing.xs,
  background: colors.surfaceElevated,
  borderRadius: radius.md,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  border: `1px solid ${colors.border}`,
  zIndex: 10,
};

const emojiButton: CSSProperties = {
  padding: spacing.xxs,
  fontSize: typography.size.lg,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: radius.sm,
  transition: transitions.fast,
};

const emojiButtonHover: CSSProperties = {
  background: colors.surface,
  transform: 'scale(1.2)',
};

const summaryStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.xxs,
  fontSize: typography.size.xs,
};

const summaryItemStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  padding: `${spacing.xxs}px ${spacing.xs}px`,
  background: colors.surface,
  borderRadius: radius.pill,
  color: colors.textSecondary,
};

export function ReactionButton({ messageId, reactions = {}, onReact }: ReactionButtonProps) {
  const [open, setOpen] = useState(false);
  const [hoveredTrigger, setHoveredTrigger] = useState(false);
  const [hoveredEmoji, setHoveredEmoji] = useState<number | null>(null);

  const handleReact = (emoji: string) => {
    onReact(messageId, emoji);
    setOpen(false);
  };

  return (
    <div style={wrapperStyle}>
      <button
        type="button"
        style={mergeStyles(triggerBase, hoveredTrigger && triggerHover)}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setHoveredTrigger(true)}
        onMouseLeave={() => setHoveredTrigger(false)}
        aria-expanded={open}
      >
        😊 React
      </button>

      {open && (
        <div style={menuStyle} role="menu">
          {REACTION_SET.map((emoji, index) => (
            <button
              type="button"
              key={emoji}
              style={mergeStyles(emojiButton, hoveredEmoji === index && emojiButtonHover)}
              onClick={() => handleReact(emoji)}
              onMouseEnter={() => setHoveredEmoji(index)}
              onMouseLeave={() => setHoveredEmoji(null)}
              role="menuitem"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {!!Object.keys(reactions).length && (
        <div style={summaryStyle} aria-label="Reactions summary">
          {Object.entries(reactions).map(([emoji, count]) => (
            <span key={emoji} style={summaryItemStyle}>
              {emoji} {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
