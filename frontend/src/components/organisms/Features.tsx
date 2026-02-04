'use client';

import { colors, spacing, radius, typography, shadows, CSSProperties } from '@/lib/styles';

const sectionStyle: CSSProperties = {
    padding: `${spacing.xxl * 2}px ${spacing.xl}px`,
    background: colors.background,
};

const sectionTitleStyle: CSSProperties = {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xxl,
};

const featuresGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: spacing.lg,
    maxWidth: 1200,
    margin: '0 auto',
};

const featureStyle: CSSProperties = {
    padding: spacing.xl,
    background: colors.surface,
    borderRadius: radius.xl,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.md,
    textAlign: 'center',
};

const featureTitleStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
};

const featureDescriptionStyle: CSSProperties = {
    fontSize: typography.size.base,
    color: colors.textMuted,
    lineHeight: 1.6,
};

export function Features() {
    const features = [
        {
            title: 'Privacy First',
            description: 'Only you see the echoes.'
        },
        {
            title: '1-Minute Setup',
            description: 'Link, copy, share. Done.'
        },
        {
            title: 'Guided Journey',
            description: 'Dashboard tracks the summon bar.'
        }
    ];

    return (
        <section style={sectionStyle} aria-labelledby="features-title">
            <h2 id="features-title" style={sectionTitleStyle}>
                Features
            </h2>

            <div style={featuresGridStyle}>
                {features.map((feature) => (
                    <div key={feature.title} style={featureStyle}>
                        <h3 style={featureTitleStyle}>{feature.title}</h3>
                        <p style={featureDescriptionStyle}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
