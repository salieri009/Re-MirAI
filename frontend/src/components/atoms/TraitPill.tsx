import React from 'react';

interface TraitPillProps {
    trait: string;
    value?: number | string;
    variant?: 'neutral' | 'accent' | 'highlight';
    className?: string;
}

export function TraitPill({
    trait,
    value,
    variant = 'neutral',
    className = ''
}: TraitPillProps) {
    const variantClasses = {
        neutral: 'bg-white/5 text-text-secondary border-white/10',
        accent: 'bg-accent/10 text-accent border-accent/20',
        highlight: 'bg-highlight/10 text-highlight border-highlight/20',
    };

    return (
        <div
            className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-md text-sm font-medium
        border backdrop-blur-sm
        transition-all duration-200 hover:bg-white/10
        ${variantClasses[variant]}
        ${className}
      `}
        >
            <span>{trait}</span>
            {value && (
                <>
                    <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                    <span className="opacity-90">{value}</span>
                </>
            )}
        </div>
    );
}
