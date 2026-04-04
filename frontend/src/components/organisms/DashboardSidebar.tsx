'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuthStore } from '@/stores/authStore';
import { WalletDisplay } from '@/components/molecules/WalletDisplay';
import { DailyLoginModal } from '@/components/organisms/DailyLoginModal';
import { Card } from '@/components/primitives';

interface Channel {
    id: string;
    name: string;
    icon: string;
    href: string;
}

const channels: Channel[] = [
    { id: 'dashboard', name: 'Overview', icon: '#', href: '/dashboard' },
    { id: 'ritual', name: 'Daily Ritual', icon: '#', href: '/dashboard/ritual' },
    { id: 'practice', name: 'Practice Mode', icon: '🎭', href: '/dashboard/practice' },
    { id: 'synthesis', name: 'Persona Sync', icon: '#', href: '/dashboard/synthesize' },
];

const socialChannels: Channel[] = [
    { id: 'compatibility', name: 'Compatibility', icon: '💕', href: '/social/compatibility' },
    { id: 'settings', name: 'Profile Settings', icon: '⚙️', href: '/profile/settings' },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const [showDailyLogin, setShowDailyLogin] = useState(false);

    return (
        <>
            <aside className="flex h-screen w-60 flex-col border-r border-slate-700/25 bg-surface p-4">
                <Card variant="default" padding="md" className="mb-4 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent font-bold text-text-primary">R</div>
                    <h2 className="m-0 text-lg font-semibold text-text-primary">Re:MirAI</h2>
                </Card>

                <nav className="flex flex-1 flex-col gap-4 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        <span className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">CHANNELS</span>
                        {channels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    className={clsx(
                                        'flex items-center gap-2 rounded-md px-2 py-2 text-sm text-text-secondary transition-colors duration-150',
                                        isActive && 'bg-surface-elevated text-text-primary'
                                    )}
                                >
                                    <span className="w-5 text-center text-base">{channel.icon}</span>
                                    <span>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Social Features (FR-005) */}
                    <div className="flex flex-col gap-1">
                        <span className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">SOCIAL</span>
                        {socialChannels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    className={clsx(
                                        'flex items-center gap-2 rounded-md px-2 py-2 text-sm text-text-secondary transition-colors duration-150',
                                        isActive && 'bg-surface-elevated text-text-primary'
                                    )}
                                >
                                    <span className="w-5 text-center text-base">{channel.icon}</span>
                                    <span>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Daily Login Button (FR-006.3) */}
                <button
                    className="mt-4 flex items-center justify-center gap-2 rounded-md border border-accent/30 bg-gradient-to-br from-accent/15 to-primary/15 p-4 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-accent/50"
                    onClick={() => setShowDailyLogin(true)}
                >
                    🎁 Daily Reward
                </button>

                {/* FR-006.2: Memory Crystals Wallet */}
                <div className="mt-4 border-t border-slate-700/25 pt-4">
                    <WalletDisplay />
                </div>

                <Card variant="default" padding="md" className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-text-primary">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm font-medium text-text-primary">{user?.name || 'User'}</div>
                        <div className="text-xs text-accent">Online</div>
                    </div>
                </Card>
            </aside>

            {/* Daily Login Modal */}
            <DailyLoginModal
                isOpen={showDailyLogin}
                onClose={() => setShowDailyLogin(false)}
            />
        </>
    );
}
