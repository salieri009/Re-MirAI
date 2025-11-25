'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
        title: 'Create Survey',
        description: 'Generate a unique survey link to share with friends',
        icon: '🔗',
    },
    {
        number: 2,
        title: 'Friends Vote',
        description: 'Your friends answer questions anonymously',
        icon: '🗳️',
    },
    {
        number: 3,
        title: 'Reveal Persona',
        description: 'AI creates a unique persona based on their responses',
        icon: '✨',
    },
];

export function FeatureShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();

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
                <h2 className={styles.heading}>How It Works</h2>

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
            </div>
        </section>
    );
}
