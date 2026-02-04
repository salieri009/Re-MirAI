'use client';

import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: spacing.lg,
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
};

const badgeStyleMain: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.sm}px ${spacing.md}px`,
  background: `${colors.accent}15`,
  borderRadius: radius.md,
  width: 'fit-content',
};

const iconMainStyle: CSSProperties = {
  fontSize: typography.size.xl,
};

const textStyle: CSSProperties = {
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.accent,
};

const messageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xxs,
};

const messageTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: colors.textMuted,
  margin: 0,
};

const trustSignalsStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.md,
  flexWrap: 'wrap',
};

const signalStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.size.xs,
  color: colors.textSecondary,
};

const signalIconStyle: CSSProperties = {
  fontSize: typography.size.sm,
};

export function PrivacyNotice() {
  return (
    <div style={containerStyle} role="banner" aria-label="Privacy assurance">
      <div style={badgeStyleMain}>
        <span style={iconMainStyle}>🔒</span>
        <span style={textStyle}>Your responses are 100% anonymous</span>
      </div>
      <div style={messageStyle}>
        <p style={messageTextStyle}>Your responses are encrypted and cannot be traced back to you.</p>
        <p style={messageTextStyle}>We don&apos;t collect any personal information.</p>
      </div>
      <div style={trustSignalsStyle}>
        <div style={signalStyle}>
          <span style={signalIconStyle}>🛡️</span>
          <span>Encrypted</span>
        </div>
        <div style={signalStyle}>
          <span style={signalIconStyle}>👁️‍🗨️</span>
          <span>No Tracking</span>
        </div>
        <div style={signalStyle}>
          <span style={signalIconStyle}>🔐</span>
          <span>Secure</span>
        </div>
      </div>
    </div>
  );
}
