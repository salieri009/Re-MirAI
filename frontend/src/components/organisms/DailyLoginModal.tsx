'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/atoms/Button';
import styles from './DailyLoginModal.module.css';

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
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {showClaimed ? (
                    <div className={styles.claimedView}>
                        <div className={styles.claimedIcon}>💎</div>
                        <h2>Reward Claimed!</h2>
                        <p className={styles.claimedAmount}>+{claimedAmount} Memory Crystals</p>
                    </div>
                ) : isLoading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : loginState ? (
                    <>
                        <header className={styles.header}>
                            <h2>Daily Login Rewards</h2>
                            <button className={styles.closeBtn} onClick={onClose}>×</button>
                        </header>

                        <div className={styles.streakInfo}>
                            <div className={styles.streakCircle}>
                                <span className={styles.streakCount}>{loginState.currentStreak}</span>
                                <span className={styles.streakLabel}>Day Streak</span>
                            </div>
                            <p className={styles.maxStreak}>Best: {loginState.maxStreak} days</p>
                        </div>

                        <div className={styles.rewardsGrid}>
                            {loginState.rewards.map((reward) => (
                                <div
                                    key={reward.day}
                                    className={`${styles.rewardCard} ${reward.claimed ? styles.claimed : ''} ${reward.isToday ? styles.today : ''} ${reward.isBonus ? styles.bonus : ''}`}
                                >
                                    <span className={styles.dayLabel}>Day {reward.day}</span>
                                    <div className={styles.rewardIcon}>
                                        {reward.claimed ? '✓' : reward.isBonus ? '🎁' : '💎'}
                                    </div>
                                    <span className={styles.crystalAmount}>
                                        {reward.crystals} {reward.isBonus && '✨'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.actions}>
                            {loginState.todayClaimable ? (
                                <Button
                                    variant="primary"
                                    onClick={() => claimMutation.mutate()}
                                    disabled={claimMutation.isPending}
                                >
                                    {claimMutation.isPending ? 'Claiming...' : 'Claim Today\'s Reward'}
                                </Button>
                            ) : (
                                <p className={styles.alreadyClaimed}>Today&apos;s reward already claimed!</p>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
