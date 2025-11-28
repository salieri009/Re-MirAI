import React from 'react';

interface FeatureCardProps {
    icon: string; // Material Symbol name
    title: string;
    description: string;
    delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
    return (
        <div
            className="group relative flex flex-1 gap-4 rounded-lg border border-highlight/20 bg-white/5 p-6 flex-col"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="text-highlight">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg font-bold leading-tight">
                    {title}
                </h3>
                <p className="text-highlight/70 text-sm font-normal leading-normal">
                    {description}
                </p>
            </div>
        </div>
    );
};
