'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';

// Register ScrollTrigger plugin
let isScrollTriggerRegistered = false;

if (typeof window !== 'undefined' && !isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
}

interface Step {
    number: number;
    title: string;
    description: string;
    icon: string;
}

const steps: Step[] = [
    { number: 1, title: 'Launch the Link', description: 'One tap. Your ritual survey is live.', icon: '🔗' },
    { number: 2, title: 'Collect Echoes', description: 'Friends drop anonymous notes in under 2 min.', icon: '🗳️' },
    { number: 3, title: 'Summon the Persona', description: 'AI weaves the echoes into an anime twin.', icon: '✨' },
];

const trustBadges = [
    { title: 'Privacy First', description: 'Only you see the echoes.', icon: '🛡️' },
    { title: '1-Minute Setup', description: 'Link, copy, share. Done.', icon: '⚡' },
    { title: 'Guided Journey', description: 'Dashboard tracks the summon bar.', icon: '🧭' }
];


export function FeatureShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();
    const router = useRouter();

    useEffect(() => {
        if (reducedMotion || !sectionRef.current) return;

        const stepElements = sectionRef.current.querySelectorAll('[data-step]');

        gsap.from(stepElements, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [reducedMotion]);

    return (
        <section ref={sectionRef} className="bg-background-dark px-6 py-24">
            <div className="mx-auto w-full max-w-[1200px]">
                <p className="mb-2 text-center text-sm uppercase tracking-[0.1em] text-accent">How It Works</p>
                <h2 className="mb-2 text-center font-display text-4xl font-bold text-text-primary">3 Steps. Zero Filler.</h2>
                <p className="mb-8 text-center text-lg text-text-muted">
                    Short flow built for anime-style reveals. Tap, collect, summon.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.number} className="atmospheric-surface flex flex-col items-center p-8 text-center shadow-md" data-step>
                            <div className="mb-4 text-5xl">{step.icon}</div>
                            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-text-primary">
                                <span>{step.number}</span>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-text-primary">{step.title}</h3>
                            <p className="text-base text-text-muted">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <div className="mb-6 text-center">
                        <h3 className="mb-2 font-display text-4xl font-bold text-text-primary">Fast. Private. Otaku-friendly.</h3>
                        <p className="text-lg text-text-muted">Clear UX, short copy, WCAG-safe.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {trustBadges.map((badge) => (
                            <div key={badge.title} className="flex items-center gap-4 rounded-lg border border-slate-700/25 bg-surface p-4">
                                <div className="text-3xl">{badge.icon}</div>
                                <div>
                                    <p className="mb-0.5 text-base font-medium text-text-primary">{badge.title}</p>
                                    <p className="text-sm text-text-muted">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="primary" size="lg" onClick={() => router.push('/login')}>
                        Create Your AI Mirror (Free)
                    </Button>
                </div>
            </div>
        </section>
    );
}
