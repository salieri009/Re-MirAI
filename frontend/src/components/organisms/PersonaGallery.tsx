'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Persona } from '@/lib/api/persona';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { spacing, CSSProperties } from '@/lib/styles';

interface PersonaGalleryProps {
    personas: Persona[];
    onPersonaClick?: (persona: Persona) => void;
}

const galleryStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: spacing.lg,
    padding: spacing.lg,
};

const galleryItemStyle: CSSProperties = {
    cursor: 'pointer',
    opacity: 0,
    transform: 'translateY(20px)',
};

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
        <div ref={containerRef} style={galleryStyle}>
            {personas.map((persona) => (
                <div
                    key={persona.id}
                    style={galleryItemStyle}
                    onClick={() => onPersonaClick?.(persona)}
                >
                    <PersonaCard persona={persona} readOnly />
                </div>
            ))}
        </div>
    );
}
