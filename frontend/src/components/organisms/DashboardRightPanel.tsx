'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { Button } from '@/components/atoms/Button';
import { StageBadge, type RitualStage } from '@/components/molecules/StageBadge';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/primitives';

const QUESTS = [
    { name: 'Daily Ritual', progress: '2 / 3', status: 'In progress' },
    { name: 'Alchemic Mode', progress: 'Select archetype', status: 'Waiting' },
    { name: 'Reveal Ceremony', progress: 'Locked', status: 'Pending ritual data' },
];

const ACTIONS = [
    { label: 'Open Ritual Hub', href: '/dashboard/ritual' },
    { label: 'Resume Summoning', href: '/dashboard/synthesize' },
];

export function DashboardRightPanel() {
    const router = useRouter();
    const { user } = useAuthStore();
    const ritualStage: RitualStage = 'COLLECTING' as RitualStage;

    return (
        <aside className="flex w-80 flex-col gap-6 overflow-y-auto border-l border-slate-700/25 bg-surface p-6">
            <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.1em] text-text-muted">persona resonance</p>
                <Card variant="elevated" padding="md">
                    <div>
                        <p className="mb-1 text-lg font-semibold text-text-primary">{user?.name ?? 'Summoner'}</p>
                        <p className="mb-4 text-sm text-text-muted">Phase 1 · Ritual Build 2.0</p>
                    </div>
                    <ProgressBar value={58} label="Bonding meter" />
                </Card>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.1em] text-text-muted">ritual readiness</p>
                <Card variant="elevated" padding="md">
                    <div className="mb-2 flex items-center justify-between text-sm text-text-secondary">
                        <span>Active constellation</span>
                        <div className="flex items-center gap-2">
                            <span className="rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-text-primary">12 / 14</span>
                            <StageBadge stage={ritualStage} />
                        </div>
                    </div>
                    <ProgressBar value={86} showValue accent={(ritualStage as string) === 'READY'} />
                    <p className="mt-2 text-sm text-text-muted">
                        {ritualStage === 'READY'
                            ? 'Ready to begin synthesis!'
                            : 'Collect 2 more echoes to unlock reveal.'}
                    </p>
                </Card>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.1em] text-text-muted">quests</p>
                <div className="flex flex-col gap-2">
                    {QUESTS.map((quest) => (
                        <Card key={quest.name} variant="default" padding="sm" className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-text-primary">{quest.name}</p>
                                <p className="text-xs text-text-muted">{quest.progress}</p>
                            </div>
                            <span className="text-xs text-accent">{quest.status}</span>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.1em] text-text-muted">shortcuts</p>
                <div className="flex flex-col gap-1">
                    {ACTIONS.map((action) => (
                        <Link key={action.label} href={action.href} className="text-sm text-accent no-underline hover:text-accent-light">
                            {action.label}
                        </Link>
                    ))}
                </div>
                <div className="mt-2">
                    <Button onClick={() => router.push('/dashboard/synthesize')}>
                    Launch Summoning
                    </Button>
                </div>
            </div>
        </aside>
    );
}
