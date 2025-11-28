'use client';

import Link from 'next/link';
import { MirrorCanvas } from './MirrorCanvas/MirrorCanvas';
import styles from './InteractiveHero.module.css';

export function InteractiveHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <MirrorCanvas variant="background" intensity={1} />

      <div className={styles.heroContent}>
        <h1 id="hero-title" className={styles.title}>
          Re:MirAI
        </h1>
        <p className={styles.tagline}>
          Fast. Private. Otaku-friendly.
        </p>
        <p className={styles.description}>
          Create your digital persona through AI-powered conversations and daily rituals.
        </p>
        <Link href="/login" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </section>
  );
}
