'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.logo}>
                            Re:MirAI
                        </Link>
                        <p className={styles.tagline}>
                            Discover how your friends truly see you. Unlock your digital persona through the power of AI and shared perception.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>Platform</h3>
                        <div className={styles.links}>
                            <Link href="#features" className={styles.link}>Features</Link>
                            <Link href="#how-it-works" className={styles.link}>How it Works</Link>
                            <Link href="#pricing" className={styles.link}>Pricing</Link>
                            <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>Company</h3>
                        <div className={styles.links}>
                            <Link href="/about" className={styles.link}>About Us</Link>
                            <Link href="/careers" className={styles.link}>Careers</Link>
                            <Link href="/blog" className={styles.link}>Blog</Link>
                            <Link href="/contact" className={styles.link}>Contact</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>Legal</h3>
                        <div className={styles.links}>
                            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                            <Link href="/terms" className={styles.link}>Terms of Service</Link>
                            <Link href="/security" className={styles.link}>Security</Link>
                            <Link href="/cookies" className={styles.link}>Cookie Settings</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} Re:MirAI. All rights reserved.
                    </div>
                    <div className={styles.socials}>
                        {/* Social icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
