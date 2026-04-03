'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';

interface PersonaPreviewProps {
  isVisible: boolean;
}

const stats = [
  { label: 'Charisma', value: 85 },
  { label: 'Intellect', value: 92 },
  { label: 'Empathy', value: 78 },
];

export function PersonaPreview({ isVisible }: PersonaPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      if (reducedMotion) {
        timeline.to(containerRef.current, { opacity: 1, duration: 0.3 });
        return;
      }

      // Reveal container
      timeline.fromTo(containerRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 }
      );

      // Fill stat bars
      const statFills = containerRef.current?.querySelectorAll('[data-stat-fill]');
      statFills?.forEach((fill, i) => {
        const value = stats[i]?.value || 0;
        timeline.to(fill, {
          width: `${value}%`,
          duration: 1,
          ease: 'power2.out',
        }, i === 0 ? '-=0.4' : '-=0.8');
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, reducedMotion]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="flex items-center justify-center p-8">
      <div className="w-[320px] overflow-hidden rounded-xl border border-slate-700/25 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700/25 p-6">
          <h3 className="m-0 text-xl font-bold text-text-primary">The Mystic</h3>
          <span className="rounded-sm bg-accent/20 px-2 py-0.5 text-sm text-accent">SSR ★★★</span>
        </div>

        <div className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-8 text-[80px]">
          🔮
        </div>

        <div className="flex flex-col gap-2 p-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="w-20 text-sm text-text-secondary">{stat.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700/25">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-accent" data-stat-fill data-value={stat.value} />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700/25 p-6 text-center text-sm italic text-text-muted">
          This could be you...
        </div>
      </div>
    </div>
  );
}
