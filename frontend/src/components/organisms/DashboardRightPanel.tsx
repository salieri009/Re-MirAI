'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { StageBadge, type SurveyStage } from '@/components/molecules/StageBadge';
import { useAuthStore } from '@/stores/authStore';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

const QUESTS = [
    { name: 'Daily Ritual', progress: '2 / 3', status: 'In progress' },
    { name: 'Alchemic Mode', progress: 'Select archetype', status: 'Waiting' },
    { name: 'Reveal Ceremony', progress: 'Locked', status: 'Pending survey data' },
];

const ACTIONS = [
    { label: 'Open Survey Hub', href: '/s' },
    { label: 'Resume Summoning', href: '/summon' },
];

const rightPanelStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    padding: spacing.lg,
    width: 320,
    background: colors.surface,
    borderLeft: `1px solid ${colors.border}`,
    overflowY: 'auto',
};

const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
};

const sectionKickerStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
};

const personaCardStyle: CSSProperties = {
    padding: spacing.md,
    background: colors.surfaceElevated,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const personaNameStyle: CSSProperties = {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    marginBottom: spacing.xxs,
};

const personaMetaStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginBottom: spacing.md,
};

const surveyCardStyle: CSSProperties = {
    padding: spacing.md,
    background: colors.surfaceElevated,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const cardRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
};

const cardRowRightStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
};

const badgeStyle: CSSProperties = {
    padding: `${spacing.xxs}px ${spacing.sm}px`,
    background: colors.primary,
    borderRadius: radius.sm,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    color: colors.text,
};

const cardHintStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
};

const questListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
};

const questItemStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    background: colors.surfaceElevated,
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
};

const questNameStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
};

const questMetaStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

const questStatusStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.accent,
};

const linksStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
};

const linkStyle: CSSProperties = {
    color: colors.accent,
    fontSize: typography.size.sm,
    textDecoration: 'none',
};

const primaryActionStyle: CSSProperties = {
    marginTop: spacing.sm,
};

export function DashboardRightPanel() {
    const router = useRouter();
    const { user } = useAuthStore();
    const surveyStage: SurveyStage = 'COLLECTING' as SurveyStage;

    return (
        <aside style={rightPanelStyle}>
            <div style={sectionStyle}>
                <p style={sectionKickerStyle}>persona resonance</p>
                <div style={personaCardStyle}>
                    <div>
                        <p style={personaNameStyle}>{user?.name ?? 'Summoner'}</p>
                        <p style={personaMetaStyle}>Phase 1 · Ritual Build 2.0</p>
                    </div>
                    <ProgressBar value={58} label="Bonding meter" />
                </div>
            </div>

            <div style={sectionStyle}>
                <p style={sectionKickerStyle}>survey readiness</p>
                <div style={surveyCardStyle}>
                    <div style={cardRowStyle}>
                        <span>Active constellation</span>
                        <div style={cardRowRightStyle}>
                            <span style={badgeStyle}>12 / 14</span>
                            <StageBadge stage={surveyStage} />
                        </div>
                    </div>
                    <ProgressBar value={86} showValue accent={(surveyStage as string) === 'READY'} />
                    <p style={cardHintStyle}>
                        {surveyStage === 'READY'
                            ? 'Ready to begin synthesis!'
                            : 'Collect 2 more echoes to unlock reveal.'}
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <p style={sectionKickerStyle}>quests</p>
                <div style={questListStyle}>
                    {QUESTS.map((quest) => (
                        <div key={quest.name} style={questItemStyle}>
                            <div>
                                <p style={questNameStyle}>{quest.name}</p>
                                <p style={questMetaStyle}>{quest.progress}</p>
                            </div>
                            <span style={questStatusStyle}>{quest.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={sectionStyle}>
                <p style={sectionKickerStyle}>shortcuts</p>
                <div style={linksStyle}>
                    {ACTIONS.map((action) => (
                        <Link key={action.label} href={action.href} style={linkStyle}>
                            {action.label}
                        </Link>
                    ))}
                </div>
                <Button style={primaryActionStyle} onClick={() => router.push('/summon')}>
                    Launch Summoning Page
                </Button>
            </div>
        </aside>
    );
}
