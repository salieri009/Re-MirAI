'use client';

import styles from './TopicSuggestion.module.css';

interface TopicSuggestionProps {
  topics: string[];
  recentTopics?: string[];
  onSelect: (topic: string) => void;
  label?: string;
}

export function TopicSuggestion({
  topics,
  recentTopics = [],
  onSelect,
  label = 'Need inspiration?',
}: TopicSuggestionProps) {
  const visibleTopics = topics.slice(0, 4);

  return (
    <div className={styles.wrapper} aria-label="Conversation starters">
      <div className={styles.header}>
        <p className={styles.label}>{label}</p>
        {recentTopics.length > 0 && (
          <span className={styles.recent}>
            Recent:{' '}
            {recentTopics.slice(0, 2).map((topic, index) => (
              <span key={`${topic}-${index}`} className={styles.recentTopic}>
                {topic}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className={styles.topicList}>
        {visibleTopics.map((topic) => (
          <button
            key={topic}
            type="button"
            className={styles.topicButton}
            onClick={() => onSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

