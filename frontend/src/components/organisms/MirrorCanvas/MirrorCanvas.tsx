'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { delightInteractions } from '@/lib/micro-interactions';
import { tokens } from '@/design-tokens';
import styles from './MirrorCanvas.module.css';

interface MirrorCanvasProps {
    variant?: 'background' | 'mirror';
    intensity?: number;
}

export function MirrorCanvas({ variant = 'background', intensity = 1 }: MirrorCanvasProps) {
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

        // Create enhanced graphic particle system based on variant
        if (variant === 'background') {
            cleanupRef.current = delightInteractions.particleSystem(canvas, ctx, {
                count: 40 * intensity,
                color: tokens.palette.primary,
                speed: 0.5 * intensity,
                connectDistance: 120,
                showConnections: true,
            });
        } else {
            // Mirror specific effects with connections
            cleanupRef.current = delightInteractions.particleSystem(canvas, ctx, {
                count: 20 * intensity,
                color: tokens.palette.accent,
                speed: 0.8 * intensity,
                connectDistance: 80,
                showConnections: true,
            });
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (cleanupRef.current) {
                cleanupRef.current();
            }
        };
    }, [reducedMotion, variant, intensity]);

    if (reducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className={variant === 'background' ? styles.canvas : styles.mirrorCanvas}
        />
    );
}
