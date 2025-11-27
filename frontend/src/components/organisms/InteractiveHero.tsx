'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';
import { WaitlistForm } from './WaitlistForm';
import styles from './InteractiveHero.module.css';

gsap.registerPlugin(ScrollTrigger);

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial Stagger Animation
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 }
      )
        .fromTo(contentRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          '-=0.8'
        );

      // Scroll Parallax Effect
      gsap.to(titleRef.current, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero} aria-labelledby="hero-title">
      <MirrorCanvas variant="background" intensity={1} />

      <div className={styles.heroContent} ref={contentRef}>
        <h1 ref={titleRef} id="hero-title" className={styles.title}>
          Re:MirAI
        </h1>

        <p className={styles.tagline}>
          Friends answer 10 questions → AI creates your persona in 60s
        </p>

        <p className={styles.description}>
          GPT-4 analyzes responses → Chat with your digital mirror.
          <br />
          <span className="text-primary/80 text-sm mt-2 block">
            Fast. Private. Otaku-friendly.
          </span>
        </p>

        <div className={styles.waitlistSection}>
          <WaitlistForm campaign="re-mirai" source="landing-hero" />

          <div className="flex items-center gap-4 mt-6 opacity-80">
            <span className={styles.divider}>or</span>
            <Link href="/login" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>

        <div className={styles.surveyPreview}>
          <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">Your unique link:</label>
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10">
            <code className="text-primary font-mono text-sm">remirai.app/s/abc123</code>
            <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">
              Copy Example
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
