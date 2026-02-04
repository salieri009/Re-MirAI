'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { colors, spacing, radius, typography, transitions, mergeStyles, CSSProperties } from '@/lib/styles';

const headerBase: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: `${spacing.md}px ${spacing.xl}px`,
    background: 'transparent',
    transition: transitions.normal,
};

const headerScrolled: CSSProperties = {
    background: `${colors.background}e6`,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${colors.border}`,
};

const containerStyle: CSSProperties = {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const leftSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xl,
};

const logoStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontFamily: typography.fontDisplay,
    fontWeight: typography.weight.bold,
    color: colors.text,
    textDecoration: 'none',
};

const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
};

const navLinkStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: transitions.fast,
};

const rightSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
};

const loginLinkStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: transitions.fast,
};

const ctaButtonStyle: CSSProperties = {
    padding: `${spacing.sm}px ${spacing.lg}px`,
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    color: colors.text,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    borderRadius: radius.md,
    textDecoration: 'none',
    transition: transitions.normal,
};

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

    const headerStyle = mergeStyles(headerBase, isScrolled && headerScrolled);

    return (
        <header style={headerStyle}>
            <div style={containerStyle}>
                <div style={leftSectionStyle}>
                    <Link href="/" style={logoStyle}>
                        Re:MirAI
                    </Link>
                    <nav style={navStyle}>
                        <Link href="#features" style={navLinkStyle}>Features</Link>
                        <Link href="#solutions" style={navLinkStyle}>Solutions</Link>
                        <Link href="#resources" style={navLinkStyle}>Resources</Link>
                        <Link href="#pricing" style={navLinkStyle}>Pricing</Link>
                    </nav>
                </div>

                <div style={rightSectionStyle}>
                    {mounted && isAuthenticated ? (
                        <Link href="/dashboard" style={ctaButtonStyle}>
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" style={loginLinkStyle}>
                                Log In
                            </Link>
                            <Link href="/login" style={ctaButtonStyle}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
