'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { questApi } from '@/lib/api/quest';
import styles from './WalletDisplay.module.css';

/**
 * WalletDisplay Component (FR-006.2)
 * 
 * Displays the user's Memory Crystals balance in the navigation or dashboard.
 * Shows current balance and can trigger wallet/spending modal.
 */
export function WalletDisplay() {
    const { data: wallet, isLoading } = useQuery({
        queryKey: ['wallet'],
        queryFn: () => questApi.getWallet(),
        refetchInterval: 60000, // Refresh every minute
    });

    if (isLoading) {
        return (
            <div className={styles.wallet}>
                <span className={styles.icon}>💎</span>
                <span className={styles.balance}>···</span>
            </div>
        );
    }

    return (
        <button
            className={styles.wallet}
            onClick={() => {
                // TODO: Open wallet/spending modal
                alert(`Memory Crystals: ${wallet?.balance ?? 0}\n\nSpending functionality coming soon!`);
            }}
            aria-label={`Memory Crystals: ${wallet?.balance ?? 0}`}
        >
            <span className={styles.icon}>💎</span>
            <span className={styles.balance}>{wallet?.balance ?? 0}</span>
            <span className={styles.label}>Crystals</span>
        </button>
    );
}
