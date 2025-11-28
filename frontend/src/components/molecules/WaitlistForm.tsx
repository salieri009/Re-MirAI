'use client';

import React, { useState } from 'react';
import { Button } from '../atoms/Button';

export const WaitlistForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="p-6 rounded-xl bg-surface backdrop-blur-md border border-accent/20 text-center animate-fade-in">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-text-muted">We'll notify you when the portal opens.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
            <div className="relative flex items-center">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-full bg-surface backdrop-blur-md border border-white/10 text-white placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all pr-36"
                    disabled={status === 'loading'}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="rounded-full px-6 py-2 bg-accent hover:bg-accent-light text-background-dark font-bold shadow-glow-accent"
                    >
                        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                    </Button>
                </div>
            </div>
            <p className="mt-3 text-sm text-text-muted text-center">
                Join 2,000+ others waiting to discover their true persona.
            </p>
        </form>
    );
};
