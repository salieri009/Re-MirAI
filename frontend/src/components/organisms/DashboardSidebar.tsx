'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { WalletDisplay } from '@/components/molecules/WalletDisplay';
import { DailyLoginModal } from '@/components/organisms/DailyLoginModal';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

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

const sidebarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 240,
    height: '100vh',
    background: colors.surface,
    borderRight: `1px solid ${colors.border}`,
    padding: spacing.md,
};

const serverInfoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
};

const serverIconStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.weight.bold,
    color: colors.text,
};

const serverNameStyle: CSSProperties = {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    margin: 0,
};

const channelsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    flex: 1,
    overflowY: 'auto',
};

const channelCategoryStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xxs,
};

const categoryLabelStyle: CSSProperties = {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semiBold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: `${spacing.sm}px ${spacing.sm}px`,
};

const channelBase: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm}px ${spacing.sm}px`,
    borderRadius: radius.md,
    color: colors.textSecondary,
    textDecoration: 'none',
    fontSize: typography.size.sm,
    transition: transitions.fast,
};

const channelActive: CSSProperties = {
    background: colors.surfaceElevated,
    color: colors.text,
};

const channelIconStyle: CSSProperties = {
    fontSize: typography.size.base,
    width: 20,
    textAlign: 'center',
};

const dailyLoginBtnStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginTop: spacing.md,
    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}20)`,
    border: `1px solid ${colors.accent}40`,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    cursor: 'pointer',
    transition: transitions.normal,
    fontFamily: typography.fontSans,
};

const walletSectionStyle: CSSProperties = {
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
    marginTop: spacing.md,
};

const userPanelStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginTop: spacing.md,
    borderTop: `1px solid ${colors.border}`,
};

const userAvatarStyle: CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text,
};

const userInfoStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};

const userNameStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.text,
};

const userStatusStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.accent,
};

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const [showDailyLogin, setShowDailyLogin] = useState(false);

    return (
        <>
            <aside style={sidebarStyle}>
                <div style={serverInfoStyle}>
                    <div style={serverIconStyle}>R</div>
                    <h2 style={serverNameStyle}>Re:MirAI</h2>
                </div>

                <nav style={channelsStyle}>
                    <div style={channelCategoryStyle}>
                        <span style={categoryLabelStyle}>CHANNELS</span>
                        {channels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    style={mergeStyles(channelBase, isActive && channelActive)}
                                >
                                    <span style={channelIconStyle}>{channel.icon}</span>
                                    <span>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Social Features (FR-005) */}
                    <div style={channelCategoryStyle}>
                        <span style={categoryLabelStyle}>SOCIAL</span>
                        {socialChannels.map((channel) => {
                            const isActive = pathname === channel.href;
                            return (
                                <Link
                                    key={channel.id}
                                    href={channel.href}
                                    style={mergeStyles(channelBase, isActive && channelActive)}
                                >
                                    <span style={channelIconStyle}>{channel.icon}</span>
                                    <span>{channel.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Daily Login Button (FR-006.3) */}
                <button
                    style={dailyLoginBtnStyle}
                    onClick={() => setShowDailyLogin(true)}
                >
                    🎁 Daily Reward
                </button>

                {/* FR-006.2: Memory Crystals Wallet */}
                <div style={walletSectionStyle}>
                    <WalletDisplay />
                </div>

                <div style={userPanelStyle}>
                    <div style={userAvatarStyle}>
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div style={userInfoStyle}>
                        <div style={userNameStyle}>{user?.name || 'User'}</div>
                        <div style={userStatusStyle}>Online</div>
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
