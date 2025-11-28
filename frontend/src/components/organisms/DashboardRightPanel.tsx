'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { StageBadge, type SurveyStage } from '@/components/molecules/StageBadge';
import { useAuthStore } from '@/stores/authStore';
import styles from './DashboardRightPanel.module.css';

const QUESTS = [
    { name: 'Daily Ritual', progress: '2 / 3', status: 'In progress' },
    { name: 'Alchemic Mode', progress: 'Select archetype', status: 'Waiting' },
    { name: 'Reveal Ceremony', progress: 'Locked', status: 'Pending survey data' },
];

const ACTIONS = [
    { label: 'Open Survey Hub', href: '/s' },
    { label: 'Resume Summoning', href: '/summon' },
];

export function DashboardRightPanel() {
    const router = useRouter();
    const { user } = useAuthStore();
    const surveyStage: SurveyStage = 'COLLECTING' as SurveyStage; // TODO: Get from actual survey state

    return (
        <aside className={styles.rightPanel}>
            <div className={styles.section}>
                <p className={styles.sectionKicker}>persona resonance</p>
                <div className={styles.personaCard}>
                    <div>
                        <p className={styles.personaName}>{user?.name ?? 'Summoner'}</p>
                        <p className={styles.personaMeta}>Phase 1 · Ritual Build 2.0</p>
                    </div>
                    <ProgressBar value={58} label="Bonding meter" />
                </div>
            </div>

                <div className={styles.section}>
                    <p className={styles.sectionKicker}>survey readiness</p>
                    <div className={styles.surveyCard}>
                        <div className={styles.cardRow}>
                            <span>Active constellation</span>
                            <div className={styles.cardRowRight}>
                                <span className={styles.badge}>12 / 14</span>
                                <StageBadge stage={surveyStage} />
                            </div>
                        </div>
                        <ProgressBar value={86} showValue accent={(surveyStage as string) === 'READY'} />
                        <p className={styles.cardHint}>
                            {surveyStage === 'READY' 
                                ? 'Ready to begin synthesis!' 
                                : 'Collect 2 more echoes to unlock reveal.'}
                        </p>
                    </div>
                </div>

            <div className={styles.section}>
                <p className={styles.sectionKicker}>quests</p>
                <div className={styles.questList}>
                    {QUESTS.map((quest) => (
                        <div key={quest.name} className={styles.questItem}>
                            <div>
                                <p className={styles.questName}>{quest.name}</p>
                                <p className={styles.questMeta}>{quest.progress}</p>
                            </div>
                            <span className={styles.questStatus}>{quest.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <p className={styles.sectionKicker}>shortcuts</p>
                <div className={styles.links}>
                    {ACTIONS.map((action) => (
                        <Link key={action.label} href={action.href}>
                            {action.label}
                        </Link>
                    ))}
                </div>
                <Button className={styles.primaryAction} onClick={() => router.push('/summon')}>
                    Launch Summoning Page
                </Button>
            </div>
        </aside>
    );
}
