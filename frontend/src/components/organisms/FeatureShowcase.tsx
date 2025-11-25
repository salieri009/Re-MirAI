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
        title: 'Create Your Mirror Survey',
        description: 'Spin up a perception ritual in one tap—no coding or forms required.',
        icon: '🔗',
    },
    {
        number: 2,
        title: 'Invite Anonymous Echoes',
        description: 'Share the link anywhere. Friends answer privately in under 2 minutes.',
        icon: '🗳️',
    },
    {
        number: 3,
        title: 'Summon Your Persona',
        description: 'AI fuses every echo into a living persona you can chat with.',
        icon: '✨',
    },
];

const trustBadges = [
    {
        title: 'Privacy First',
        description: 'Responses are anonymous—only you see the results.',
        icon: '🛡️'
    },
    {
        title: '1-Minute Setup',
        description: 'Create, copy, and share a ritual link in sixty seconds.',
        icon: '⚡'
    },
    {
        title: 'Guided Journey',
        description: 'Dashboard shows exactly how many echoes you still need.',
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
                <p className={styles.kicker}>How the Ritual Works</p>
                <h2 className={styles.heading}>Collect echoes. Reveal who your friends believe you are.</h2>
                <p className={styles.subheading}>
                    Every page reinforces trust, clarity, and magic—from anonymous surveys to cinematic summoning.
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
                        <h3>Built for trust & speed</h3>
                        <p>Designed with Nielsen’s heuristics and WCAG-first patterns.</p>
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
                        Start Collecting Echoes
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => router.push('/docs')}>
                        See the full journey
                    </Button>
                </div>
            </div>
        </section>
    );
}
