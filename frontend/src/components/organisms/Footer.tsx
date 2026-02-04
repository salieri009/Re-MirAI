'use client';

import Link from 'next/link';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

const footerStyle: CSSProperties = {
    background: colors.surface,
    borderTop: `1px solid ${colors.border}`,
    padding: `${spacing.xxl}px ${spacing.xl}px`,
};

const containerStyle: CSSProperties = {
    maxWidth: 1280,
    margin: '0 auto',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.xl,
    marginBottom: spacing.xl,
};

const brandColumnStyle: CSSProperties = {
    gridColumn: 'span 1',
};

const logoStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontFamily: typography.fontDisplay,
    fontWeight: typography.weight.bold,
    color: colors.text,
    textDecoration: 'none',
    display: 'block',
    marginBottom: spacing.md,
};

const taglineStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    lineHeight: 1.6,
};

const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
};

const columnTitleStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    marginBottom: spacing.xs,
};

const linksStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
};

const linkStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    textDecoration: 'none',
};

const bottomStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
};

const copyrightStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

export function Footer() {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={gridStyle}>
                    <div style={brandColumnStyle}>
                        <Link href="/" style={logoStyle}>
                            Re:MirAI
                        </Link>
                        <p style={taglineStyle}>
                            Discover how your friends truly see you. Unlock your digital persona through the power of AI and shared perception.
                        </p>
                    </div>

                    <div style={columnStyle}>
                        <h3 style={columnTitleStyle}>Platform</h3>
                        <div style={linksStyle}>
                            <Link href="#features" style={linkStyle}>Features</Link>
                            <Link href="#how-it-works" style={linkStyle}>How it Works</Link>
                            <Link href="#pricing" style={linkStyle}>Pricing</Link>
                            <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
                        </div>
                    </div>

                    <div style={columnStyle}>
                        <h3 style={columnTitleStyle}>Company</h3>
                        <div style={linksStyle}>
                            <Link href="/about" style={linkStyle}>About Us</Link>
                            <Link href="/careers" style={linkStyle}>Careers</Link>
                            <Link href="/blog" style={linkStyle}>Blog</Link>
                            <Link href="/contact" style={linkStyle}>Contact</Link>
                        </div>
                    </div>

                    <div style={columnStyle}>
                        <h3 style={columnTitleStyle}>Legal</h3>
                        <div style={linksStyle}>
                            <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>
                            <Link href="/terms" style={linkStyle}>Terms of Service</Link>
                            <Link href="/security" style={linkStyle}>Security</Link>
                            <Link href="/cookies" style={linkStyle}>Cookie Settings</Link>
                        </div>
                    </div>
                </div>

                <div style={bottomStyle}>
                    <div style={copyrightStyle}>
                        © {new Date().getFullYear()} Re:MirAI. All rights reserved.
                    </div>
                    <div>
                        {/* Social icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
