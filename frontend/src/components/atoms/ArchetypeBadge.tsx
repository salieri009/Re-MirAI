import React from 'react';

interface ArchetypeBadgeProps {
    archetype: string;
    variant?: 'default' | 'large' | 'small';
    className?: string;
}

export function ArchetypeBadge({
    archetype,
    variant = 'default',
    className = ''
}: ArchetypeBadgeProps) {
    const sizeClasses = {
        small: 'text-xs px-2 py-0.5',
        default: 'text-sm px-3 py-1',
        large: 'text-base px-4 py-1.5',
    };

    return (
        <div
            className={`
        inline-flex items-center justify-center
        rounded-full font-display font-medium tracking-wide
        bg-primary/10 text-primary border border-primary/20
        shadow-[0_0_10px_rgba(0,201,167,0.1)]
        backdrop-blur-sm
        ${sizeClasses[variant]}
        ${className}
      `}
        >
            {archetype}
        </div>
    );
}
