'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/components/organisms/Hero';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { Button } from '@/components/atoms/Button';
import { SkipToContent } from '@/hooks/useAccessibility';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { staggerIn } from '@/lib/animations';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    // Scroll-triggered feature card animations
    useEffect(() => {
        if (reducedMotion || !featuresRef.current) return;

        const cards = featuresRef.current.querySelectorAll('[data-feature-card]');
        
        const cleanup = staggerIn(Array.from(cards) as HTMLElement[], {
            onComplete: undefined,
        });

        ScrollTrigger.create({
            trigger: featuresRef.current,
            start: 'top 80%',
            animation: gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.15,
                }
            ),
            toggleActions: 'play none none none',
        });

        return () => {
            cleanup();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [reducedMotion]);

  return (
    <>
      <SkipToContent targetId="main-content" />
      <main id="main-content" className="min-h-screen bg-background-dark text-text-primary selection:bg-accent/30">
      <Hero />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-[22px] md:text-3xl font-bold mb-6 tracking-[-0.015em] text-white">
              Unveil Your Reflection in Three Steps
            </h2>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-feature-card>
              <FeatureCard
                title="1. Connect"
                description="Grant Re:MirAI access to analyze your digital interactions and relationships securely and privately."
                icon="link"
                delay={0}
              />
            </div>
            <div data-feature-card>
              <FeatureCard
                title="2. Analyze"
                description="Our AI processes the data, identifying patterns and traits to construct a comprehensive personality profile."
                icon="neurology"
                delay={200}
              />
            </div>
            <div data-feature-card>
              <FeatureCard
                title="3. Reveal"
                description="Receive your AI-forged persona, a reflection of how others perceive you, and gain profound insights."
                icon="auto_awesome"
                delay={400}
              />
            </div>
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* Final CTA Section */}
      <section className="py-10 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-10 relative z-10 text-center">
          <div className="flex flex-col gap-6 md:gap-8 items-center max-w-[720px] mx-auto">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[32px] md:text-4xl font-bold md:font-black leading-tight tracking-[-0.033em]">
                Ready to Meet Your Reflection?
              </h2>
              <p className="text-highlight text-base font-normal leading-normal">
                Begin your journey of self-discovery today and see the persona you cast in the eyes of others.
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              <Link href="/summon">
                <Button size="lg" className="bg-accent hover:bg-opacity-90 text-background-dark font-bold min-w-[84px] max-w-[480px] w-full md:w-auto">
                  Summon Your Persona
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 mt-10 border-t border-solid border-white/10">
        <p className="text-highlight/50 text-sm">
          © {new Date().getFullYear()} Re:MirAI. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-highlight/70 hover:text-highlight transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-highlight/70 hover:text-highlight transition-colors text-sm">
            Terms of Service
          </a>
        </div>
      </footer>
    </main>
    </>
  );
}
