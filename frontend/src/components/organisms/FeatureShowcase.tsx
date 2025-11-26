'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './FeatureShowcase.module.css';

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
    {
        number: 1,
        title: 'Launch the Link',
        description: 'One tap. Your survey is live.',
        icon: '🔗',
    },
    {
        number: 2,
        title: 'Collect Echoes',
        description: 'Friends drop anonymous notes in under 2 min.',
        icon: '🗳️',
    },
    {
        number: 3,
        title: 'Summon the Persona',
        description: 'AI weaves the echoes into an anime twin.',
        icon: '✨',
    },
];

const trustBadges = [
    {
        title: 'Privacy First',
        description: 'Only you see the echoes.',
        icon: '🛡️'
    },
    {
        title: '1-Minute Setup',
        description: 'Link, copy, share. Done.',
        icon: '⚡'
    },
    {
        title: 'Guided Journey',
        description: 'Dashboard tracks the summon bar.',
        icon: '🧭'
    }
];

export function FeatureShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();
    const router = useRouter();

    useEffect(() => {
        if (reducedMotion || !sectionRef.current) return;

        const stepElements = sectionRef.current.querySelectorAll(`.${styles.step}`);

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

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [reducedMotion]);

    return (
        <section ref={sectionRef} className={styles.showcase}>
            <div className={styles.container}>
                <p className={styles.kicker}>How It Works</p>
                <h2 className={styles.heading}>3 Steps. Zero Filler.</h2>
                <p className={styles.subheading}>
                    Short flow built for anime-style reveals. Tap, collect, summon.
                </p>

                <div className={styles.steps}>
                    {steps.map((step) => (
                        <div key={step.number} className={styles.step}>
                            <div className={styles.stepIcon}>{step.icon}</div>
                            <div className={styles.stepNumber}>
                                <span>{step.number}</span>
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.trustSection}>
                    <div className={styles.trustHeader}>
                        <h3>Fast. Private. Otaku-friendly.</h3>
                        <p>Clear UX, short copy, WCAG-safe.</p>
                    </div>
                    <div className={styles.trustGrid}>
                        {trustBadges.map((badge) => (
                            <div key={badge.title} className={styles.trustCard}>
                                <div className={styles.trustIcon}>{badge.icon}</div>
                                <div>
                                    <p className={styles.trustTitle}>{badge.title}</p>
                                    <p className={styles.trustDescription}>{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.ctaRow}>
                    <Button variant="primary" size="lg" onClick={() => router.push('/login')}>
                        Create Your AI Mirror (Free)
                    </Button>
                </div>
            </div>
        </section>
    );
}
