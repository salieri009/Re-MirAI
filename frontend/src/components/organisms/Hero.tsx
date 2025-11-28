'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../atoms/Button';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { staggerIn, fadeIn } from '@/lib/animations';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    // Hero text stagger animation
    useEffect(() => {
        if (reducedMotion) return;

        const timeline = gsap.timeline({ delay: 0.3 });

        if (titleRef.current) {
            const words = titleRef.current.textContent?.split(' ') || [];
            titleRef.current.innerHTML = words
                .map((word, i) => `<span style="display: inline-block;" data-word="${i}">${word}</span>`)
                .join(' ');

            const wordSpans = titleRef.current.querySelectorAll('[data-word]');
            timeline.from(wordSpans, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.05,
            });
        }

        if (subtitleRef.current) {
            timeline.from(
                subtitleRef.current,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.3'
            );
        }

        if (ctaRef.current) {
            timeline.from(
                ctaRef.current.children,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: 'power2.out',
                    stagger: 0.1,
                },
                '-=0.2'
            );
        }

        return () => {
            timeline.kill();
        };
    }, [reducedMotion]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark"
        >
            {/* Particle Background */}
            <div className="absolute inset-0 z-0">
                <MirrorCanvas variant="background" intensity={0.8} />
            </div>

            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1
                    ref={titleRef}
                    className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-[-0.033em] leading-tight"
                >
                    The mirror reflects your soul. What image do you cast in others?
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-sm md:text-base text-highlight max-w-2xl mx-auto mb-10 leading-normal"
                >
                    Summon an AI Persona forged from your relationships.
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/login">
                        <Button size="lg" className="bg-accent hover:bg-accent-dark text-background-dark font-bold min-w-[192px] shadow-glow-accent transition-all hover:scale-105">
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
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-muted/50 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};
