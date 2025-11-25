'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import styles from './PersonaRadarChart.module.css';

interface PersonaStats {
    charisma: number;
    intellect: number;
    kindness: number;
    energy: number;
    [key: string]: number;
}

interface PersonaRadarChartProps {
    stats: PersonaStats;
}

export function PersonaRadarChart({ stats }: PersonaRadarChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const polygonRef = useRef<SVGPolygonElement>(null);
    const reducedMotion = useReducedMotion();
    const [hoveredStat, setHoveredStat] = useState<{ key: string; value: number; x: number; y: number } | null>(null);

    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;
    const keys = Object.keys(stats);
    const total = keys.length;
    const angleSlice = (Math.PI * 2) / total;

    // Helper to calculate coordinates
    const getCoordinates = (value: number, index: number) => {
        const angle = index * angleSlice - Math.PI / 2; // Start from top
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle),
        };
    };

    // Generate polygon points
    const points = keys
        .map((key, i) => {
            const { x, y } = getCoordinates(stats[key], i);
            return `${x},${y}`;
        })
        .join(' ');

    // Generate initial points (all at center) for animation
    const initialPoints = keys
        .map(() => `${center},${center}`)
        .join(' ');

    useEffect(() => {
        if (reducedMotion || !polygonRef.current) return;

        // Animate from center
        gsap.fromTo(
            polygonRef.current,
            { attr: { points: initialPoints } },
            {
                attr: { points: points },
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)',
            }
        );
    }, [reducedMotion, points, initialPoints]);

    return (
        <div className={styles.container}>
            <svg ref={svgRef} className={styles.chartSvg} viewBox={`0 0 ${size} ${size}`}>
                {/* Background Web */}
                {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <polygon
                        key={scale}
                        className={styles.webBackground}
                        points={keys
                            .map((_, i) => {
                                const { x, y } = getCoordinates(100 * scale, i);
                                return `${x},${y}`;
                            })
                            .join(' ')}
                    />
                ))}

                {/* Axes */}
                {keys.map((_, i) => {
                    const { x, y } = getCoordinates(100, i);
                    return (
                        <line
                            key={i}
                            className={styles.axis}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                        />
                    );
                })}

                {/* Data Polygon */}
                <polygon
                    ref={polygonRef}
                    className={styles.dataPolygon}
                    points={reducedMotion ? points : initialPoints}
                />

                {/* Data Points */}
                {keys.map((key, i) => {
                    const { x, y } = getCoordinates(stats[key], i);
                    return (
                        <g key={key}>
                            <circle
                                className={styles.point}
                                cx={x}
                                cy={y}
                                r={4}
                                onMouseEnter={() => setHoveredStat({ key, value: stats[key], x, y })}
                                onMouseLeave={() => setHoveredStat(null)}
                            />
                            {/* Labels */}
                            <text
                                className={styles.label}
                                x={x + (x - center) * 0.2}
                                y={y + (y - center) * 0.2}
                            >
                                {key}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredStat && (
                <div
                    className={styles.tooltip}
                    style={{
                        left: `${(hoveredStat.x / size) * 100}%`,
                        top: `${(hoveredStat.y / size) * 100}%`,
                        opacity: 1,
                    }}
                >
                    <strong>{hoveredStat.key}</strong>: {hoveredStat.value}
                </div>
            )}
        </div>
    );
}
