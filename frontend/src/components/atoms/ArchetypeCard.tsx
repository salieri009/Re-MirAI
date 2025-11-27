import { KeyboardEvent } from 'react';
import styles from './ArchetypeCard.module.css';

export type ArchetypeCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
};

export function ArchetypeCard({
  id,
  title,
  description,
  icon = '✨',
  badge,
  selected = false,
  disabled = false,
  onSelect,
}: ArchetypeCardProps) {
  const handleSelect = () => {
    if (disabled) return;
    onSelect?.(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      data-selected={selected}
      data-disabled={disabled}
      className={styles.card}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <p className={styles.title}>{title}</p>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

