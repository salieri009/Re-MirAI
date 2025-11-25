import React from 'react';
import styles from './PersonaCard.module.css';
import { Persona } from '@/lib/mock-data/personas';
import { Badge } from '@/components/atoms/Badge';

interface PersonaCardProps {
  persona: Persona;
  readOnly?: boolean;
}

export function PersonaCard({ persona, readOnly = false }: PersonaCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{persona.name}</h2>
        {persona.rarity && (
          <Badge variant="primary" size="sm">
            {persona.rarity}
          </Badge>
        )}
      </div>
      <div className={styles.archetype}>{persona.archetype}</div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Charisma</span>
          <div className={styles.statBar}>
            <div
              className={styles.statFill}
              style={{ width: `${persona.stats.charisma}%` }}
            />
          </div>
          <span className={styles.statValue}>{persona.stats.charisma}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Intellect</span>
          <div className={styles.statBar}>
            <div
              className={styles.statFill}
              style={{ width: `${persona.stats.intellect}%` }}
            />
          </div>
          <span className={styles.statValue}>{persona.stats.intellect}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Kindness</span>
          <div className={styles.statBar}>
            <div
              className={styles.statFill}
              style={{ width: `${persona.stats.kindness}%` }}
            />
          </div>
          <span className={styles.statValue}>{persona.stats.kindness}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Energy</span>
          <div className={styles.statBar}>
            <div
              className={styles.statFill}
              style={{ width: `${persona.stats.energy}%` }}
            />
          </div>
          <span className={styles.statValue}>{persona.stats.energy}</span>
        </div>
      </div>
      
      {persona.greeting && (
        <div className={styles.greeting}>"{persona.greeting}"</div>
      )}
    </div>
  );
}




