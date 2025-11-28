import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
    return (
        <div
            className="group relative p-8 rounded-2xl bg-surface backdrop-blur-md border border-white/10 hover:border-accent/50 transition-all duration-500 hover:shadow-glow-accent hover:-translate-y-2"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                <h3 className="font-display text-2xl font-bold mb-3 text-text-primary group-hover:text-accent transition-colors">
                    {title}
                </h3>

                <p className="text-text-muted leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};
