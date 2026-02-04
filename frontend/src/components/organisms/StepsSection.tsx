import React from 'react';
import { StepCard } from '@/components/molecules/StepCard';

export const StepsSection: React.FC = () => {
    const steps = [
        {
            icon: 'link',
            title: '1. Connect',
            description: 'Grant Re:MirAI access to analyze your digital interactions and relationships securely and privately.',
        },
        {
            icon: 'neurology',
            title: '2. Analyze',
            description: 'Our AI processes the data, identifying patterns and traits to construct a comprehensive personality profile.',
        },
        {
            icon: 'auto_awesome',
            title: '3. Reveal',
            description: 'Receive your AI-forged persona, a reflection of how others perceive you, and gain profound insights.',
        },
    ];

    return (
        <>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10 sm:pt-16 text-center">
                Unveil Your Reflection in Three Steps
            </h2>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-0">
                    {steps.map((step) => (
                        <StepCard key={step.title} {...step} />
                    ))}
                </div>
            </div>
        </>
    );
};
