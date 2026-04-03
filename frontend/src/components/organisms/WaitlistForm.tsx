'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { toast } from '@/lib/toast';

interface WaitlistFormProps {
    campaign: string;
    source?: string;
    className?: string;
}

export function WaitlistForm({ campaign, source = 'landing', className = '' }: WaitlistFormProps) {
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
        } catch {
            toast.error('Waitlist submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className={`bg-primary/10 border border-primary/20 rounded-xl p-4 text-center animate-fade-in ${className}`}>
                <h3 className="text-lg font-bold text-primary mb-1">🎉 You're on the list!</h3>
                <p className="text-text-secondary text-sm mb-3">Share with friends to check your bond:</p>
                <Button
                    onClick={() => {
                        const referralCode = `re-mirai-${email.split('@')[0]}`;
                        const shareUrl = `${window.location.origin}?ref=${referralCode}`;
                        navigator.clipboard.writeText(shareUrl);
                        toast.success('Referral link copied!');
                    }}
                    variant="ghost"
                    className="w-full text-sm h-9"
                >
                    Copy Referral Link
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-[480px] flex gap-2 ${className}`}>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to start..."
                required
                aria-label="Email address"
                className="flex-1 h-10 sm:h-12 bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/40"
            />
            <Button
                type="submit"
                disabled={loading || !email}
                className="h-10 sm:h-12 px-6 bg-accent hover:bg-accent-light text-background-dark font-bold whitespace-nowrap transition-all shadow-[0_0_20px_rgba(0,201,167,0.3)] hover:shadow-[0_0_30px_rgba(0,201,167,0.5)]"
            >
                {loading ? '...' : 'Start Discovery'}
            </Button>
        </form>
    );
}
