'use client';

import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

const sectionStyle: CSSProperties = {
    padding: `${spacing.xxl * 2}px ${spacing.xl}px`,
    background: colors.surface,
};

const sectionTitleStyle: CSSProperties = {
    fontSize: typography.size['3xl'],
    fontWeight: typography.weight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xxl,
};

const stepsGridStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    maxWidth: 800,
    margin: '0 auto',
};

const stepStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.lg,
};

const stepNumberStyle: CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text,
    flexShrink: 0,
};

const stepContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
};

const stepTitleStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
};

const stepDescriptionStyle: CSSProperties = {
    fontSize: typography.size.base,
    color: colors.textMuted,
    lineHeight: 1.6,
};

export function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'One tap. Your ritual survey is live.'
        },
        {
            number: '2',
            title: 'Collect Echoes',
            description: 'Friends drop anonymous notes in under 2 min.'
        },
        {
            number: '3',
            title: 'Summon the Persona',
            description: 'AI weaves the echoes into an anime twin.'
        }
    ];

    return (
        <section style={sectionStyle} aria-labelledby="how-it-works-title">
            <h2 id="how-it-works-title" style={sectionTitleStyle}>
                How It Works
            </h2>

            <div style={stepsGridStyle}>
                {steps.map((step) => (
                    <div key={step.number} style={stepStyle}>
                        <div style={stepNumberStyle}>{step.number}</div>
                        <div style={stepContentStyle}>
                            <h3 style={stepTitleStyle}>{step.title}</h3>
                            {step.description && (
                                <p style={stepDescriptionStyle}>{step.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
