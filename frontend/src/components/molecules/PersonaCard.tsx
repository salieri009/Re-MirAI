import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './PersonaCard.module.css';
import { Persona } from '@/lib/api/persona';
import { Badge } from '@/components/atoms/Badge';
import { QRCode } from '@/components/atoms/QRCode';

interface PersonaCardProps {
  persona: Persona;
  readOnly?: boolean;
  /** Show QR code for public profile link (FR-004.2) */
  showQRCode?: boolean;
}

export function PersonaCard({ persona, readOnly = false, showQRCode = false }: PersonaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardRef.current || readOnly) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, readOnly]);

  // FR-004.3: Generate public profile URL
  const publicProfileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/p/${persona.id}`
    : `https://remirai.app/p/${persona.id}`;

  return (
    <div
      ref={cardRef}
      className={styles.card}
      data-rarity={persona.rarity}
    >
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
        {Object.entries(persona.stats).map(([key, value]) => (
          <div key={key} className={styles.stat}>
            <span className={styles.statLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <div className={styles.statBar}>
              <div
                className={styles.statFill}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>

      {persona.greeting && (
        <div className={styles.greeting}>"{persona.greeting}"</div>
      )}

      {/* FR-004.2: QR Code for shareable persona link */}
      {showQRCode && (
        <div className={styles.qrSection}>
          <QRCode
            value={publicProfileUrl}
            size={80}
            alt={`QR code for ${persona.name}'s profile`}
          />
          <span className={styles.qrLabel}>Scan to view profile</span>
        </div>
      )}
    </div>
  );
}




