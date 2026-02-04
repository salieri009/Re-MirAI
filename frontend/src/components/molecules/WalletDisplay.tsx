'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { questApi } from '@/lib/api/quest';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

const walletStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs}px ${spacing.md}px`,
    background: colors.surface,
    borderRadius: radius.pill,
    border: `1px solid ${colors.border}`,
    cursor: 'pointer',
    transition: transitions.normal,
    fontFamily: typography.fontSans,
};

const iconStyle: CSSProperties = {
    fontSize: typography.size.lg,
};

const balanceStyle: CSSProperties = {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
};

const labelStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

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
            <div style={walletStyle}>
                <span style={iconStyle}>💎</span>
                <span style={balanceStyle}>···</span>
            </div>
        );
    }

    return (
        <button
            style={walletStyle}
            onClick={() => {
                // TODO: Open wallet/spending modal
                alert(`Memory Crystals: ${wallet?.crystals ?? 0}\n\nSpending functionality coming soon!`);
            }}
            aria-label={`Memory Crystals: ${wallet?.crystals ?? 0}`}
        >
            <span style={iconStyle}>💎</span>
            <span style={balanceStyle}>{wallet?.crystals ?? 0}</span>
            <span style={labelStyle}>Crystals</span>
        </button>
    );
}
