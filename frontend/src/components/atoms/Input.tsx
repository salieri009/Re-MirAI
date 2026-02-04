'use client';

import React, { forwardRef, useState } from 'react';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
};

const labelStyle: CSSProperties = {
  fontSize: typography.size.sm,
  fontWeight: typography.weight.medium,
  color: colors.text,
};

const inputBaseStyle: CSSProperties = {
  width: '100%',
  padding: spacing.md,
  fontSize: typography.size.base,
  fontFamily: typography.fontSans,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  backgroundColor: colors.surface,
  color: colors.text,
  transition: transitions.colors,
  outline: 'none',
};

const inputFocusStyle: CSSProperties = {
  borderColor: colors.accent,
  boxShadow: `0 0 0 3px rgba(0, 201, 167, 0.2)`,
};

const inputErrorStyle: CSSProperties = {
  borderColor: '#EF4444',
};

const errorTextStyle: CSSProperties = {
  fontSize: typography.size.sm,
  color: '#EF4444',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, style, onFocus, onBlur, ...props },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputStyle = mergeStyles(
    inputBaseStyle,
    isFocused ? inputFocusStyle : undefined,
    error ? inputErrorStyle : undefined,
    style
  );

  return (
    <div style={wrapperStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <span style={errorTextStyle}>{error}</span>}
    </div>
  );
});
