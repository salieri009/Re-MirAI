'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './MagicCircle.module.css';

export function MagicCircle() {
    const circleRef = useRef<SVGSVGElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion || !circleRef.current) return;

        // Continuous rotation animation
        gsap.to(circleRef.current, {
            rotation: 360,
            duration: 20,
            ease: 'none',
            repeat: -1,
        });
    }, [reducedMotion]);

    return (
        <div className={styles.container}>
            <div className={styles.glow} />
            <svg
                ref={circleRef}
                className={styles.circle}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer decorative circle */}
                <circle
                    className={styles.outerCircle}
                    cx="100"
                    cy="100"
                    r="95"
                />

                {/* Inner circle */}
                <circle
                    className={styles.innerCircle}
                    cx="100"
                    cy="100"
                    r="70"
                />

                {/* Rune symbols (simplified geometric patterns) */}
                <g className={styles.runes}>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                        const x = 100 + 82 * Math.cos((angle * Math.PI) / 180);
                        const y = 100 + 82 * Math.sin((angle * Math.PI) / 180);
                        return (
                            <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                                <path d="M 0,-8 L 0,8 M -5,-4 L 5,4 M -5,4 L 5,-4" />
                            </g>
                        );
                    })}
                </g>

                {/* Star pattern in center */}
                <g className={styles.runes}>
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                        const x1 = 100 + 15 * Math.cos((angle * Math.PI) / 180);
                        const y1 = 100 + 15 * Math.sin((angle * Math.PI) / 180);
                        const x2 = 100 + 30 * Math.cos(((angle + 36) * Math.PI) / 180);
                        const y2 = 100 + 30 * Math.sin(((angle + 36) * Math.PI) / 180);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                    })}
                </g>
            </svg>
        </div>
    );
}
