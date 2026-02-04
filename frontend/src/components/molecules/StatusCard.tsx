'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ProgressBar } from './ProgressBar';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface StatusCardProps {
  status: 'empty' | 'collecting' | 'ready' | 'active';
  progress?: {
    current: number;
    target: number;
    percentage: number;
  };
  onAction?: () => void;
  actionLabel?: string;
  message?: string;
}

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: spacing.lg,
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
};

const statusStyles: Record<string, CSSProperties> = {
  empty: {
    borderColor: colors.primary,
    background: `linear-gradient(135deg, ${colors.surface}, rgba(132, 94, 194, 0.1))`,
  },
  collecting: {
    borderColor: colors.accent,
    background: `linear-gradient(135deg, ${colors.surface}, rgba(0, 201, 167, 0.1))`,
  },
  ready: {
    borderColor: colors.accent,
    background: `linear-gradient(135deg, rgba(0, 201, 167, 0.2), rgba(132, 94, 194, 0.2))`,
    boxShadow: shadows.glowAccent,
  },
  active: {
    borderColor: colors.highlight,
    background: `linear-gradient(135deg, ${colors.surface}, rgba(193, 151, 255, 0.1))`,
  },
};

const headerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
};

const titleStyle: CSSProperties = {
  fontSize: typography.size['2xl'],
  fontFamily: typography.fontDisplay,
  fontWeight: typography.weight.bold,
  color: colors.text,
  margin: 0,
};

const messageStyle: CSSProperties = {
  fontSize: typography.size.base,
  color: colors.textSecondary,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  margin: 0,
};

const progressSectionStyle: CSSProperties = {
  paddingTop: spacing.sm,
};

const actionSectionStyle: CSSProperties = {
  paddingTop: spacing.md,
  display: 'flex',
  justifyContent: 'center',
};

export function StatusCard({
  status,
  progress,
  onAction,
  actionLabel,
  message
}: StatusCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [status, prefersReducedMotion]);

  const getStatusConfig = () => {
    switch (status) {
      case 'empty':
        return {
          title: '🗺️ Your Journey Begins',
          subtitle: 'Start collecting feedback to discover your persona',
          variant: 'primary' as const,
        };
      case 'collecting':
        return {
          title: '🔮 Echoes Collected',
          subtitle: progress
            ? `${progress.current} of ${progress.target} responses received`
            : 'Collecting feedback...',
          variant: 'secondary' as const,
        };
      case 'ready':
        return {
          title: '⚡ SUMMON READY ⚡',
          subtitle: 'All responses collected! Ready to create your persona.',
          variant: 'primary' as const,
        };
      case 'active':
        return {
          title: '✨ Persona Active',
          subtitle: 'Your persona is ready to chat',
          variant: 'primary' as const,
        };
      default:
        return {
          title: 'Status',
          subtitle: '',
          variant: 'primary' as const,
        };
    }
  };

  const config = getStatusConfig();
  const cardStyle = mergeStyles(cardBase, statusStyles[status]);

  return (
    <div ref={cardRef} style={cardStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{config.title}</h2>
        {message && <p style={messageStyle}>{message}</p>}
      </div>

      {progress && status === 'collecting' && (
        <div style={progressSectionStyle}>
          <ProgressBar
            value={progress.percentage}
            label={`${progress.current} of ${progress.target} responses`}
          />
        </div>
      )}

      {status === 'ready' && progress && (
        <div style={progressSectionStyle}>
          <ProgressBar
            value={100}
            label="All responses collected ✓"
            accent
          />
        </div>
      )}

      {onAction && actionLabel && (
        <div style={actionSectionStyle}>
          <Button
            variant={config.variant}
            size="lg"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}

      {config.subtitle && (
        <p style={subtitleStyle}>{config.subtitle}</p>
      )}
    </div>
  );
}
