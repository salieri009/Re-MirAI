'use client';

import { useState } from 'react';
import styles from './ReactionButton.module.css';

const REACTION_SET = ['❤️', '😂', '😮', '😢', '👍'];

interface ReactionButtonProps {
  messageId: string;
  reactions?: Record<string, number>;
  onReact: (messageId: string, emoji: string) => void;
}

export function ReactionButton({ messageId, reactions = {}, onReact }: ReactionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleReact = (emoji: string) => {
    onReact(messageId, emoji);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        😊 React
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          {REACTION_SET.map((emoji) => (
            <button
              type="button"
              key={emoji}
              className={styles.emoji}
              onClick={() => handleReact(emoji)}
              role="menuitem"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {!!Object.keys(reactions).length && (
        <div className={styles.summary} aria-label="Reactions summary">
          {Object.entries(reactions).map(([emoji, count]) => (
            <span key={emoji} className={styles.summaryItem}>
              {emoji} {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

