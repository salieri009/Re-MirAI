'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import styles from './DashboardSidebar.module.css';

interface Channel {
    id: string;
    name: string;
    icon: string;
    href: string;
}

const channels: Channel[] = [
    { id: 'dashboard', name: 'Overview', icon: '#', href: '/dashboard' },
    { id: 'survey', name: 'Daily Check-in', icon: '#', href: '/dashboard/survey' },
    { id: 'synthesis', name: 'Persona Sync', icon: '#', href: '/dashboard/synthesize' },
    { id: 'settings', name: 'Settings', icon: '#', href: '/settings' },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user } = useAuthStore();

    return (
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
            </nav>

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
    );
}
