'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Persona } from '@/lib/api/persona';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './PersonaGallery.module.css';

interface PersonaGalleryProps {
    personas: Persona[];
    onPersonaClick?: (persona: Persona) => void;
}

export function PersonaGallery({ personas, onPersonaClick }: PersonaGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion || !containerRef.current) return;

        const items = containerRef.current.children;

        gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all' // Clear to allow hover effects to work properly
        });
    }, [reducedMotion, personas]);

    return (
        <div ref={containerRef} className={styles.gallery}>
            {personas.map((persona) => (
                <div
                    key={persona.id}
                    className={styles.galleryItem}
                    onClick={() => onPersonaClick?.(persona)}
                >
                    <PersonaCard persona={persona} readOnly />
                </div>
            ))}
        </div>
    );
}
