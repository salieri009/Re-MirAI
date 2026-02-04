'use client';

import { ReactNode } from 'react';
import { colors, spacing, typography, CSSProperties } from '@/lib/styles';

type SynthesisSpinnerProps = {
  size?: number;
  icon?: ReactNode;
  caption?: string;
};

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.lg,
};

const spinnerStyle = (size: number): CSSProperties => ({
  position: 'relative',
  width: size,
  height: size,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ringStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: `3px solid transparent`,
  borderTopColor: colors.primary,
  borderRightColor: colors.highlight,
  animation: 'spin 2s linear infinite',
};

const ringInnerStyle: CSSProperties = {
  ...ringStyle,
  width: '70%',
  height: '70%',
  borderTopColor: colors.accent,
  borderRightColor: colors.primary,
  animationDuration: '1.5s',
  animationDirection: 'reverse',
};

const coreStyle: CSSProperties = {
  fontSize: typography.size['3xl'],
  zIndex: 1,
};

const captionStyle: CSSProperties = {
  fontSize: typography.size.base,
  color: colors.textSecondary,
  textAlign: 'center',
  margin: 0,
};

// Add keyframes via style tag injection
const keyframesStyle = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

export function SynthesisSpinner({
  size = 224,
  icon = '⟳',
  caption,
}: SynthesisSpinnerProps) {
  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={wrapperStyle}>
        <div style={spinnerStyle(size)}>
          <div style={ringStyle} />
          <div style={ringInnerStyle} />
          <div style={coreStyle} aria-hidden="true">
            {icon}
          </div>
        </div>

        {caption ? <p style={captionStyle}>{caption}</p> : null}
      </div>
    </>
  );
}
