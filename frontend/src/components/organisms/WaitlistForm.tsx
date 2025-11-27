'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import styles from './WaitlistForm.module.css';

interface WaitlistFormProps {
    campaign: string;
    source?: string;
}

export function WaitlistForm({ campaign, source = 'landing' }: WaitlistFormProps) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call for now - replace with actual KickoffLabs endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Waitlist submission:', {
                campaign,
                email,
                source,
                referral: localStorage.getItem('referral_code'),
            });

            setSubmitted(true);
        } catch (error) {
            console.error('Waitlist submission failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center animate-fade-in">
                <h3 className="text-xl font-bold text-primary mb-2">🎉 You're on the list!</h3>
                <p className="text-text-secondary mb-4">Share with friends to unlock early access:</p>
                <Button
                    onClick={() => {
                        const referralCode = `re-mirai-${email.split('@')[0]}`;
                        const shareUrl = `${window.location.origin}?ref=${referralCode}`;
                        navigator.clipboard.writeText(shareUrl);
                        alert('Referral link copied!');
                    }}
                    variant="outline"
                    className="w-full"
                >
                    Copy Your Referral Link
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-label="Email address"
                    className="flex-1 bg-white/5 border-white/10 focus:border-primary"
                />
                <Button
                    type="submit"
                    disabled={loading || !email}
                    className="bg-primary hover:bg-primary-light text-white font-bold whitespace-nowrap"
                >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                </Button>
            </div>
            <p className="text-xs text-text-muted mt-3 text-center">
                🔒 Your email stays private. Unsubscribe anytime.
            </p>
        </form>
    );
}
