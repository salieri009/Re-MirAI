import React from 'react';
import { Button } from '@/components/atoms/Button';
import { GradientCard } from '@/components/molecules/GradientCard';

export const HeroSection: React.FC = () => {
    const scrollToJoin = () => {
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <GradientCard
            className="min-h-[480px] gap-6 @[480px]:gap-8 rounded-[2.5rem] border border-white/10 shadow-2xl"
            backgroundImage="linear-gradient(to right, var(--color-primary), var(--color-highlight)), linear-gradient(rgba(51, 65, 85, 0.58) 0%, rgba(51, 65, 85, 0.88) 100%)"
            backgroundBlendMode="multiply, normal"
        >
            <div className="flex flex-col gap-2 relative z-10 max-w-4xl mx-auto">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    The mirror reflects your soul. What image do you cast in others?
                </h1>
                <h2 className="text-accent text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Summon an AI Persona forged from your relationships.
                </h2>
            </div>
            <div className="relative z-10 w-full flex justify-center pt-4">
                <Button
                    onClick={scrollToJoin}
                    className="h-10 px-4 @[480px]:h-12 @[480px]:px-5 text-sm @[480px]:text-base"
                >
                    <span className="truncate">Start Discovery</span>
                </Button>
            </div>
        </GradientCard>
    );
};
