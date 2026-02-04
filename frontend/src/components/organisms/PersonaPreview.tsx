'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, radius, typography, shadows, CSSProperties } from '@/lib/styles';

interface PersonaPreviewProps {
  isVisible: boolean;
}

const previewContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: spacing.xl,
};

const cardStyle: CSSProperties = {
  width: 320,
  background: colors.surface,
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
  boxShadow: shadows.xl,
  overflow: 'hidden',
};

const headerStyleCard: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: spacing.lg,
  borderBottom: `1px solid ${colors.border}`,
};

const nameStyle: CSSProperties = {
  fontSize: typography.size.xl,
  fontWeight: typography.weight.bold,
  color: colors.text,
  margin: 0,
};

const badgeStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.accent,
  background: `${colors.accent}20`,
  padding: `${spacing.xxs}px ${spacing.sm}px`,
  borderRadius: radius.sm,
};

const visualStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 80,
  padding: spacing.xl,
  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
};

const statsStyle: CSSProperties = {
  padding: spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
};

const statRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
};

const statLabelStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textSecondary,
  width: 80,
};

const statBarStyle: CSSProperties = {
  flex: 1,
  height: 8,
  background: colors.border,
  borderRadius: radius.full,
  overflow: 'hidden',
};

const statFillStyle: CSSProperties = {
  height: '100%',
  background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
  borderRadius: radius.full,
  width: 0,
};

const footerStyleCard: CSSProperties = {
  padding: spacing.lg,
  borderTop: `1px solid ${colors.border}`,
  textAlign: 'center',
  fontSize: typography.size.sm,
  color: colors.textMuted,
  fontStyle: 'italic',
};

const stats = [
  { label: 'Charisma', value: 85 },
  { label: 'Intellect', value: 92 },
  { label: 'Empathy', value: 78 },
];

export function PersonaPreview({ isVisible }: PersonaPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      if (reducedMotion) {
        timeline.to(containerRef.current, { opacity: 1, duration: 0.3 });
        return;
      }

      // Reveal container
      timeline.fromTo(containerRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 }
      );

      // Fill stat bars
      const statFills = containerRef.current?.querySelectorAll('[data-stat-fill]');
      statFills?.forEach((fill, i) => {
        const value = stats[i]?.value || 0;
        timeline.to(fill, {
          width: `${value}%`,
          duration: 1,
          ease: 'power2.out',
        }, i === 0 ? '-=0.4' : '-=0.8');
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, reducedMotion]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} style={previewContainerStyle}>
      <div style={cardStyle}>
        <div style={headerStyleCard}>
          <h3 style={nameStyle}>The Mystic</h3>
          <span style={badgeStyle}>SSR ★★★</span>
        </div>

        <div style={visualStyle}>
          🔮
        </div>

        <div style={statsStyle}>
          {stats.map((stat) => (
            <div key={stat.label} style={statRowStyle}>
              <span style={statLabelStyle}>{stat.label}</span>
              <div style={statBarStyle}>
                <div style={statFillStyle} data-stat-fill data-value={stat.value} />
              </div>
            </div>
          ))}
        </div>

        <div style={footerStyleCard}>
          This could be you...
        </div>
      </div>
    </div>
  );
}
