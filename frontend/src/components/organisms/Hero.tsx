import React from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent-purple mb-6 tracking-tight">
                    Discover the You <br />
                    That Others See
                </h1>

                <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                    Re:MirAI uses advanced AI to analyze your social footprint and reveal the persona you project to the world.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/login">
                        <Button size="lg" className="bg-primary hover:bg-primary-light text-background-dark font-bold min-w-[200px] shadow-glow-primary transition-all hover:scale-105">
                            Start Discovery
                        </Button>
                    </Link>
                    <Link href="#how-it-works">
                        <Button variant="ghost" size="lg" className="text-text-secondary hover:text-white hover:bg-white/5">
                            How it Works
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-muted/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};
