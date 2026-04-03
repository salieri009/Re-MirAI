'use client';

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-slate-700/25 bg-surface px-6 py-16">
            <div className="mx-auto w-full max-w-[1280px]">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                        <Link href="/" className="mb-4 block font-display text-xl font-bold text-text-primary no-underline">
                            Re:MirAI
                        </Link>
                        <p className="text-sm leading-relaxed text-text-muted">
                            Discover how your friends truly see you. Unlock your digital persona through the power of AI and shared perception.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="mb-1 text-sm font-semibold text-text-primary">Platform</h3>
                        <div className="flex flex-col gap-1">
                            <Link href="#features" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Features</Link>
                            <Link href="#how-it-works" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">How it Works</Link>
                            <Link href="#pricing" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Pricing</Link>
                            <Link href="/dashboard" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Dashboard</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="mb-1 text-sm font-semibold text-text-primary">Company</h3>
                        <div className="flex flex-col gap-1">
                            <Link href="/about" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">About Us</Link>
                            <Link href="/careers" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Careers</Link>
                            <Link href="/blog" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Blog</Link>
                            <Link href="/contact" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Contact</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="mb-1 text-sm font-semibold text-text-primary">Legal</h3>
                        <div className="flex flex-col gap-1">
                            <Link href="/privacy" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Privacy Policy</Link>
                            <Link href="/terms" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Terms of Service</Link>
                            <Link href="/security" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Security</Link>
                            <Link href="/cookies" className="text-sm text-text-muted no-underline transition-colors hover:text-text-primary">Cookie Settings</Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-700/25 pt-6">
                    <div className="text-xs text-text-muted">
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
