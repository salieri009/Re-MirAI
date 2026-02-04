'use client';

import React from 'react';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

type ProgressStep = 'authenticate' | 'verify' | 'welcome';

interface ProgressTrackerProps {
    currentStep: ProgressStep;
    style?: CSSProperties;
}

const STEPS: { id: ProgressStep; label: string }[] = [
    { id: 'authenticate', label: 'Authenticate' },
    { id: 'verify', label: 'Verify' },
    { id: 'welcome', label: 'Welcome' },
];

const trackerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    position: 'relative',
};

const stepsStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
};

const stepStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    zIndex: 1,
};

const circleBase: CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.surface,
    border: `2px solid ${colors.border}`,
    transition: 'all 0.3s ease',
};

const circleActive: CSSProperties = {
    background: colors.primary,
    borderColor: colors.primary,
    color: colors.text,
};

const circleCurrent: CSSProperties = {
    boxShadow: `0 0 0 4px ${colors.primary}30`,
};

const checkmarkStyle: CSSProperties = {
    width: 16,
    height: 16,
    color: colors.text,
};

const numberStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textMuted,
};

const labelBase: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

const labelActive: CSSProperties = {
    color: colors.text,
    fontWeight: typography.weight.medium,
};

const lineStyle: CSSProperties = {
    position: 'absolute',
    top: 16,
    left: 48,
    right: 48,
    height: 2,
    background: colors.border,
};

const progressLineStyle: CSSProperties = {
    height: '100%',
    background: colors.primary,
    transition: 'width 0.5s ease',
};

export function ProgressTracker({ currentStep, style }: ProgressTrackerProps) {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);

    return (
        <div style={mergeStyles(trackerStyle, style)} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={3}>
            <div style={stepsStyle}>
                {STEPS.map((step, index) => {
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={step.id} style={stepStyle}>
                            <div
                                style={mergeStyles(
                                    circleBase,
                                    isActive && circleActive,
                                    isCurrent && circleCurrent
                                )}
                                aria-label={step.label}
                            >
                                {isActive && index < currentIndex ? (
                                    <svg style={checkmarkStyle} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span style={mergeStyles(numberStyle, isActive && { color: colors.text })}>{index + 1}</span>
                                )}
                            </div>
                            <span style={mergeStyles(labelBase, isActive && labelActive)}>{step.label}</span>
                        </div>
                    );
                })}
            </div>
            <div style={lineStyle}>
                <div
                    style={{ ...progressLineStyle, width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
}
