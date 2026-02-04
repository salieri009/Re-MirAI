'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, CSSProperties } from '@/lib/styles';

const containerStyle: CSSProperties = {
    position: 'relative',
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const glowStyle: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
    filter: 'blur(20px)',
};

const circleStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    transformOrigin: 'center',
};

const outerCircleStyle: CSSProperties = {
    fill: 'none',
    stroke: colors.primary,
    strokeWidth: 2,
    strokeDasharray: '4 4',
};

const innerCircleStyle: CSSProperties = {
    fill: 'none',
    stroke: colors.accent,
    strokeWidth: 1.5,
};

const runesStyle: CSSProperties = {
    stroke: colors.primary,
    strokeWidth: 1.5,
    fill: 'none',
};

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
        <div style={containerStyle}>
            <div style={glowStyle} />
            <svg
                ref={circleRef}
                style={circleStyle}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer decorative circle */}
                <circle
                    style={outerCircleStyle}
                    cx="100"
                    cy="100"
                    r="95"
                />

                {/* Inner circle */}
                <circle
                    style={innerCircleStyle}
                    cx="100"
                    cy="100"
                    r="70"
                />

                {/* Rune symbols (simplified geometric patterns) */}
                <g style={runesStyle}>
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
                <g style={runesStyle}>
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
