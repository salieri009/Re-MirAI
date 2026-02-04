'use client';

import Link from 'next/link';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

const heroStyle: CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const heroContentStyle: CSSProperties = {
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: spacing.xl,
  maxWidth: 800,
};

const titleStyle: CSSProperties = {
  fontSize: '4rem',
  fontFamily: typography.fontDisplay,
  fontWeight: typography.weight.bold,
  color: colors.text,
  marginBottom: spacing.md,
  background: `linear-gradient(135deg, ${colors.text}, ${colors.accent})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const taglineStyle: CSSProperties = {
  fontSize: typography.size.xl,
  color: colors.textSecondary,
  marginBottom: spacing.sm,
};

const descriptionStyle: CSSProperties = {
  fontSize: typography.size.lg,
  color: colors.textMuted,
  marginBottom: spacing.xl,
  lineHeight: 1.6,
};

const ctaButtonStyle: CSSProperties = {
  display: 'inline-block',
  padding: `${spacing.md}px ${spacing.xl}px`,
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
  color: colors.text,
  fontSize: typography.size.lg,
  fontWeight: typography.weight.semiBold,
  borderRadius: radius.lg,
  textDecoration: 'none',
  boxShadow: `0 4px 20px ${colors.primary}40`,
};

export function InteractiveHero() {
  return (
    <section style={heroStyle} aria-labelledby="hero-title">
      <MirrorCanvas variant="background" intensity={1} />

      <div style={heroContentStyle}>
        <h1 id="hero-title" style={titleStyle}>
          Re:MirAI
        </h1>
        <p style={taglineStyle}>
          Fast. Private. Otaku-friendly.
        </p>
        <p style={descriptionStyle}>
          Create your digital persona through AI-powered conversations and daily rituals.
        </p>
        <Link href="/login" style={ctaButtonStyle}>
          Get Started
        </Link>
      </div>
    </section>
  );
}
