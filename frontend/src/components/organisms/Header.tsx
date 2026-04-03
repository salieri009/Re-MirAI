'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useAuthStore } from '@/stores/authStore';

export function Header() {
    const { isAuthenticated } = useAuthStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                'fixed left-0 right-0 top-0 z-[100] px-6 py-4 transition-all duration-300',
                isScrolled && 'border-b border-slate-700/25 bg-background-dark/90 backdrop-blur-md'
            )}
        >
            <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-display text-xl font-bold text-text-primary no-underline">
                        Re:MirAI
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="#features" className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary">Features</Link>
                        <Link href="#solutions" className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary">Solutions</Link>
                        <Link href="#resources" className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary">Resources</Link>
                        <Link href="#pricing" className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary">Pricing</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {mounted && isAuthenticated ? (
                        <Link href="/dashboard" className="rounded-md bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-medium text-text-primary no-underline transition-transform duration-200 hover:-translate-y-0.5">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="hidden text-sm text-text-secondary no-underline transition-colors hover:text-text-primary sm:inline">
                                Log In
                            </Link>
                            <Link href="/login" className="rounded-md bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-medium text-text-primary no-underline transition-transform duration-200 hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
