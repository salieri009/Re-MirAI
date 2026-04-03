'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Button } from '@/components/atoms/Button';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="max-h-[90vh] w-[90%] max-w-[480px] overflow-auto rounded-xl border border-slate-700/25 bg-surface shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {showClaimed ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-8">
                        <div className="text-[64px]">💎</div>
                        <h2>Reward Claimed!</h2>
                        <p className="text-xl font-bold text-accent">+{claimedAmount} Memory Crystals</p>
                    </div>
                ) : isLoading ? (
                    <div className="p-8 text-center text-text-muted">Loading...</div>
                ) : loginState ? (
                    <>
                        <header className="flex items-center justify-between border-b border-slate-700/25 p-6">
                            <h2 className="m-0 text-xl font-bold text-text-primary">Daily Login Rewards</h2>
                            <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-2xl text-text-muted" onClick={onClose}>×</button>
                        </header>

                        <div className="flex flex-col items-center gap-2 p-6">
                            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
                                <span className="text-2xl font-bold text-text-primary">{loginState.currentStreak}</span>
                                <span className="text-xs text-text-primary/80">Day Streak</span>
                            </div>
                            <p className="text-sm text-text-muted">Best: {loginState.maxStreak} days</p>
                        </div>

                        <div className="grid grid-cols-7 gap-1 px-6">
                            {loginState.rewards.map((reward) => (
                                <div
                                    key={reward.day}
                                    className={clsx(
                                        'flex flex-col items-center gap-0.5 rounded-md border border-slate-700/25 bg-surface-elevated p-2',
                                        reward.claimed && 'opacity-50',
                                        reward.isToday && 'border-accent shadow-[0_0_10px_rgba(0,201,167,0.25)]',
                                        reward.isBonus && 'bg-gradient-to-br from-accent/20 to-primary/20'
                                    )}
                                >
                                    <span className="text-[10px] text-text-muted">Day {reward.day}</span>
                                    <div className="text-lg">
                                        {reward.claimed ? '✓' : reward.isBonus ? '🎁' : '💎'}
                                    </div>
                                    <span className="text-xs font-medium text-text-primary">
                                        {reward.crystals} {reward.isBonus && '✨'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center p-6">
                            {loginState.todayClaimable ? (
                                <Button
                                    variant="primary"
                                    onClick={() => claimMutation.mutate()}
                                    disabled={claimMutation.isPending}
                                >
                                    {claimMutation.isPending ? 'Claiming...' : 'Claim Today\'s Reward'}
                                </Button>
                            ) : (
                                <p className="text-sm text-text-muted">Today&apos;s reward already claimed!</p>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
