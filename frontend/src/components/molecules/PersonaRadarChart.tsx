'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { colors, spacing, radius, typography, CSSProperties } from '@/lib/styles';

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

const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: 300,
    aspectRatio: '1',
};

const chartSvgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
};

const webBackgroundStyle: CSSProperties = {
    fill: 'none',
    stroke: colors.border,
    strokeWidth: 1,
};

const axisStyle: CSSProperties = {
    stroke: colors.border,
    strokeWidth: 1,
};

const dataPolygonStyle: CSSProperties = {
    fill: `${colors.primary}40`,
    stroke: colors.primary,
    strokeWidth: 2,
};

const pointStyle: CSSProperties = {
    fill: colors.primary,
    cursor: 'pointer',
    transition: 'r 0.2s ease',
};

const labelStyle: CSSProperties = {
    fontSize: 12,
    fill: colors.textMuted,
    textAnchor: 'middle',
    textTransform: 'capitalize',
};

const tooltipStyle: CSSProperties = {
    position: 'absolute',
    transform: 'translate(-50%, -120%)',
    padding: `${spacing.xs}px ${spacing.sm}px`,
    background: colors.surfaceElevated,
    borderRadius: radius.sm,
    border: `1px solid ${colors.border}`,
    fontSize: typography.size.xs,
    color: colors.text,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 10,
};

export function PersonaRadarChart({ stats }: PersonaRadarChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const polygonRef = useRef<SVGPolygonElement>(null);
    const reducedMotion = useReducedMotion();
    const [hoveredStat, setHoveredStat] = useState<{ key: string; value: number; x: number; y: number } | null>(null);

    const size = 300;
    const center = size / 2;
    const radVar = size * 0.4;
    const keys = Object.keys(stats);
    const total = keys.length;
    const angleSlice = (Math.PI * 2) / total;

    // Helper to calculate coordinates
    const getCoordinates = (value: number, index: number) => {
        const angle = index * angleSlice - Math.PI / 2; // Start from top
        const r = (value / 100) * radVar;
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
        <div style={containerStyle}>
            <svg ref={svgRef} style={chartSvgStyle} viewBox={`0 0 ${size} ${size}`}>
                {/* Background Web */}
                {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <polygon
                        key={scale}
                        style={webBackgroundStyle}
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
                            style={axisStyle}
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
                    style={dataPolygonStyle}
                    points={reducedMotion ? points : initialPoints}
                />

                {/* Data Points */}
                {keys.map((key, i) => {
                    const { x, y } = getCoordinates(stats[key], i);
                    return (
                        <g key={key}>
                            <circle
                                style={pointStyle}
                                cx={x}
                                cy={y}
                                r={4}
                                onMouseEnter={() => setHoveredStat({ key, value: stats[key], x, y })}
                                onMouseLeave={() => setHoveredStat(null)}
                            />
                            {/* Labels */}
                            <text
                                style={labelStyle}
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
                    style={{
                        ...tooltipStyle,
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
