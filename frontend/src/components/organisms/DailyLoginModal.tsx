'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface DailyLoginReward {
    day: number;
    crystals: number;
    claimed: boolean;
    isToday: boolean;
    isBonus: boolean;
}

interface DailyLoginState {
    currentStreak: number;
    maxStreak: number;
    lastLoginDate: string | null;
    rewards: DailyLoginReward[];
    todayClaimable: boolean;
}

// Mock API function
async function getDailyLoginState(): Promise<DailyLoginState> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const today = new Date().toISOString().split('T')[0];
    const rewards: DailyLoginReward[] = [];

    for (let i = 1; i <= 7; i++) {
        const isBonus = i === 7;
        rewards.push({
            day: i,
            crystals: isBonus ? 50 : i * 5,
            claimed: i < 3, // Mock: first 2 days already claimed
            isToday: i === 3, // Mock: today is day 3
            isBonus,
        });
    }

    return {
        currentStreak: 2,
        maxStreak: 14,
        lastLoginDate: today,
        rewards,
        todayClaimable: true,
    };
}

async function claimDailyReward(): Promise<{ crystals: number }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { crystals: 15 };
}

interface DailyLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
};

const modalStyle: CSSProperties = {
    background: colors.surface,
    borderRadius: radius.xl,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.xl,
    maxWidth: 480,
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
};

const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
};

const headerTitleStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.text,
    margin: 0,
};

const closeBtnStyle: CSSProperties = {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: colors.textMuted,
    fontSize: typography.size['2xl'],
    cursor: 'pointer',
    borderRadius: radius.sm,
};

const streakInfoStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
};

const streakCircleStyle: CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const streakCountStyle: CSSProperties = {
    fontSize: typography.size['2xl'],
    fontWeight: typography.weight.bold,
    color: colors.text,
};

const streakLabelStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.text,
    opacity: 0.8,
};

const maxStreakStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
};

const rewardsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing.xs,
    padding: `0 ${spacing.lg}px`,
};

const rewardCardBase: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xxs,
    padding: spacing.sm,
    background: colors.surfaceElevated,
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
};

const rewardCardClaimed: CSSProperties = {
    opacity: 0.5,
};

const rewardCardToday: CSSProperties = {
    borderColor: colors.accent,
    boxShadow: `0 0 10px ${colors.accent}40`,
};

const rewardCardBonus: CSSProperties = {
    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}20)`,
};

const dayLabelStyle: CSSProperties = {
    fontSize: 10,
    color: colors.textMuted,
};

const rewardIconStyle: CSSProperties = {
    fontSize: typography.size.lg,
};

const crystalAmountStyle: CSSProperties = {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    color: colors.text,
};

const actionsStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: spacing.lg,
};

const claimedViewStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.md,
};

const claimedIconStyle: CSSProperties = {
    fontSize: 64,
};

const claimedAmountStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.accent,
};

const loadingStyle: CSSProperties = {
    padding: spacing.xxl,
    textAlign: 'center',
    color: colors.textMuted,
};

const alreadyClaimedStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
};

/**
 * Daily Login Modal (FR-006.3)
 * 
 * Displays daily login rewards and streak tracking.
 * Users can claim daily rewards to earn Memory Crystals.
 */
export function DailyLoginModal({ isOpen, onClose }: DailyLoginModalProps) {
    const queryClient = useQueryClient();
    const [showClaimed, setShowClaimed] = useState(false);
    const [claimedAmount, setClaimedAmount] = useState(0);

    const { data: loginState, isLoading } = useQuery({
        queryKey: ['daily-login'],
        queryFn: getDailyLoginState,
        enabled: isOpen,
    });

    const claimMutation = useMutation({
        mutationFn: claimDailyReward,
        onSuccess: (data) => {
            setClaimedAmount(data.crystals);
            setShowClaimed(true);
            queryClient.invalidateQueries({ queryKey: ['daily-login'] });
            queryClient.invalidateQueries({ queryKey: ['wallet'] });

            setTimeout(() => {
                setShowClaimed(false);
                onClose();
            }, 2000);
        },
    });

    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                {showClaimed ? (
                    <div style={claimedViewStyle}>
                        <div style={claimedIconStyle}>💎</div>
                        <h2>Reward Claimed!</h2>
                        <p style={claimedAmountStyle}>+{claimedAmount} Memory Crystals</p>
                    </div>
                ) : isLoading ? (
                    <div style={loadingStyle}>Loading...</div>
                ) : loginState ? (
                    <>
                        <header style={headerStyle}>
                            <h2 style={headerTitleStyle}>Daily Login Rewards</h2>
                            <button style={closeBtnStyle} onClick={onClose}>×</button>
                        </header>

                        <div style={streakInfoStyle}>
                            <div style={streakCircleStyle}>
                                <span style={streakCountStyle}>{loginState.currentStreak}</span>
                                <span style={streakLabelStyle}>Day Streak</span>
                            </div>
                            <p style={maxStreakStyle}>Best: {loginState.maxStreak} days</p>
                        </div>

                        <div style={rewardsGridStyle}>
                            {loginState.rewards.map((reward) => (
                                <div
                                    key={reward.day}
                                    style={mergeStyles(
                                        rewardCardBase,
                                        reward.claimed && rewardCardClaimed,
                                        reward.isToday && rewardCardToday,
                                        reward.isBonus && rewardCardBonus
                                    )}
                                >
                                    <span style={dayLabelStyle}>Day {reward.day}</span>
                                    <div style={rewardIconStyle}>
                                        {reward.claimed ? '✓' : reward.isBonus ? '🎁' : '💎'}
                                    </div>
                                    <span style={crystalAmountStyle}>
                                        {reward.crystals} {reward.isBonus && '✨'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={actionsStyle}>
                            {loginState.todayClaimable ? (
                                <Button
                                    variant="primary"
                                    onClick={() => claimMutation.mutate()}
                                    disabled={claimMutation.isPending}
                                >
                                    {claimMutation.isPending ? 'Claiming...' : 'Claim Today\'s Reward'}
                                </Button>
                            ) : (
                                <p style={alreadyClaimedStyle}>Today&apos;s reward already claimed!</p>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
