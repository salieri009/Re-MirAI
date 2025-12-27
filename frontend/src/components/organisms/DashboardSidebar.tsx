'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { WalletDisplay } from '@/components/molecules/WalletDisplay';
import { DailyLoginModal } from '@/components/organisms/DailyLoginModal';
import styles from './DashboardSidebar.module.css';

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
            <aside className={styles.sidebar}>
                <div className={styles.serverInfo}>
                    <div className={styles.serverIcon}>R</div>
                    <h2 className={styles.serverName}>Re:MirAI</h2>
                </div>

                <nav className={styles.channels}>
                    <div className={styles.channelCategory}>
                        <span className={styles.categoryLabel}>CHANNELS</span>
                        {channels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    className={`${styles.channel} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.channelIcon}>{channel.icon}</span>
                                    <span className={styles.channelName}>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Social Features (FR-005) */}
                    <div className={styles.channelCategory}>
                        <span className={styles.categoryLabel}>SOCIAL</span>
                        {socialChannels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    className={`${styles.channel} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.channelIcon}>{channel.icon}</span>
                                    <span className={styles.channelName}>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Daily Login Button (FR-006.3) */}
                <button
                    className={styles.dailyLoginBtn}
                    onClick={() => setShowDailyLogin(true)}
                >
                    🎁 Daily Reward
                </button>

                {/* FR-006.2: Memory Crystals Wallet */}
                <div className={styles.walletSection}>
                    <WalletDisplay />
                </div>

                <div className={styles.userPanel}>
                    <div className={styles.userAvatar}>
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{user?.name || 'User'}</div>
                        <div className={styles.userStatus}>Online</div>
                    </div>
                </div>
            </aside>

            {/* Daily Login Modal */}
            <DailyLoginModal
                isOpen={showDailyLogin}
                onClose={() => setShowDailyLogin(false)}
            />
        </>
    );
}
