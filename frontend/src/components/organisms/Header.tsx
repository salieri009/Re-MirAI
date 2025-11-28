'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import styles from './Header.module.css';

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
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <Link href="/" className={styles.logo}>
                        Re:MirAI
                    </Link>
                    <nav className={styles.nav}>
                        <Link href="#features" className={styles.navLink}>Features</Link>
                        <Link href="#solutions" className={styles.navLink}>Solutions</Link>
                        <Link href="#resources" className={styles.navLink}>Resources</Link>
                        <Link href="#pricing" className={styles.navLink}>Pricing</Link>
                    </nav>
                </div>

                <div className={styles.rightSection}>
                    {mounted && isAuthenticated ? (
                        <Link href="/dashboard" className={styles.ctaButton}>
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className={styles.loginLink}>
                                Log In
                            </Link>
                            <Link href="/login" className={styles.ctaButton}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
