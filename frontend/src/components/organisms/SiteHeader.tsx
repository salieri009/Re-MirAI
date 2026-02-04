import React from 'react';
import { Logo } from '@/components/atoms/Logo';
import { NavMenu } from '@/components/molecules/NavMenu';

export const SiteHeader: React.FC = () => {
    const navLinks = [
        { label: 'How It Works', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Login', href: '#' },
    ];

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
                <Logo />
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Re:MirAI</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <NavMenu links={navLinks} className="hidden sm:flex" />
            </div>
        </header>
    );
};
