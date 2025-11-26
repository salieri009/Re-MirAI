'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { delightInteractions } from '@/lib/micro-interactions';
import { tokens } from '@/design-tokens';
import styles from './MirrorCanvas.module.css';

interface MirrorCanvasProps {
    variant?: 'background' | 'mirror';
    intensity?: number;
    interactionMode?: 'default' | 'converge';
}

export function MirrorCanvas({ variant = 'background', intensity = 1, interactionMode = 'default' }: MirrorCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reducedMotion = useReducedMotion();
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!canvasRef.current || reducedMotion) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create enhanced graphic particle system with mirror effect
        if (variant === 'background') {
            cleanupRef.current = delightInteractions.particleSystem(canvas, ctx, {
                count: 100 * intensity,
                color: '#845ec2', // Purple fire
                speed: 1.5 * intensity,
                connectDistance: 180,
                showConnections: true,
                interactionMode: 'default'
            });
        } else {
            // Mirror specific effects with reflection and fire-like connections
            cleanupRef.current = delightInteractions.particleSystem(canvas, ctx, {
                count: 80 * intensity,
                color: '#f3c5ff', // Light pink fire glow
                speed: 2.0 * intensity,
                connectDistance: 140,
                showConnections: true,
                interactionMode: interactionMode
            });
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, [reducedMotion, variant, intensity, interactionMode]);

    if (reducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className={variant === 'background' ? styles.canvas : styles.mirrorCanvas}
        />
    );
}
