'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { Persona } from '@/lib/api/persona';
import { Badge } from '@/components/atoms/Badge';
import { QRCode } from '@/components/atoms/QRCode';
import { colors, spacing, radius, typography, shadows, CSSProperties } from '@/lib/styles';

interface PersonaCardProps {
  persona: Persona;
  readOnly?: boolean;
  /** Show QR code for public profile link (FR-004.2) */
  showQRCode?: boolean;
}

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: spacing.lg,
  background: 'radial-gradient(circle at 30% 20%, rgba(132, 94, 194, 0.3), rgba(10, 1, 18, 0.8))',
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
  boxShadow: shadows.lg,
  transformStyle: 'preserve-3d',
  willChange: 'transform',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.sm,
};

const nameStyle: CSSProperties = {
  fontSize: typography.size['2xl'],
  fontFamily: typography.fontDisplay,
  fontWeight: typography.weight.bold,
  color: colors.text,
  margin: 0,
};

const archetypeStyle: CSSProperties = {
  fontSize: typography.size.lg,
  color: colors.highlight,
  fontWeight: typography.weight.medium,
};

const statsStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
};

const statStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
};

const statLabelStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  width: 80,
};

const statBarStyle: CSSProperties = {
  flex: 1,
  height: 6,
  background: colors.surface,
  borderRadius: radius.pill,
  overflow: 'hidden',
};

const statFillStyle: CSSProperties = {
  height: '100%',
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
  borderRadius: radius.pill,
  transition: 'width 0.5s ease',
};

const statValueStyle: CSSProperties = {
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.text,
  width: 30,
  textAlign: 'right',
};

const greetingStyle: CSSProperties = {
  fontSize: typography.size.base,
  fontStyle: 'italic',
  color: colors.textSecondary,
  padding: `${spacing.sm}px ${spacing.md}px`,
  background: colors.surface,
  borderRadius: radius.md,
  borderLeft: `3px solid ${colors.highlight}`,
};

const qrSectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.xs,
  paddingTop: spacing.md,
  borderTop: `1px solid ${colors.border}`,
};

const qrLabelStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
};

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

      const rotateX = ((y - centerY) / centerY) * -10;
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
    <div ref={cardRef} style={cardStyle} data-rarity={persona.rarity}>
      <div style={headerStyle}>
        <h2 style={nameStyle}>{persona.name}</h2>
        {persona.rarity && (
          <Badge variant="primary" size="sm">
            {persona.rarity}
          </Badge>
        )}
      </div>
      <div style={archetypeStyle}>{persona.archetype}</div>

      <div style={statsStyle}>
        {Object.entries(persona.stats).map(([key, value]) => (
          <div key={key} style={statStyle}>
            <span style={statLabelStyle}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <div style={statBarStyle}>
              <div style={{ ...statFillStyle, width: `${value}%` }} />
            </div>
            <span style={statValueStyle}>{value}</span>
          </div>
        ))}
      </div>

      {persona.greeting && (
        <div style={greetingStyle}>"{persona.greeting}"</div>
      )}

      {/* FR-004.2: QR Code for shareable persona link */}
      {showQRCode && (
        <div style={qrSectionStyle}>
          <QRCode
            value={publicProfileUrl}
            size={80}
            alt={`QR code for ${persona.name}'s profile`}
          />
          <span style={qrLabelStyle}>Scan to view profile</span>
        </div>
      )}
    </div>
  );
}
