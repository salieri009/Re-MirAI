'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { LivePreview } from '@/components/molecules/LivePreview';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SynthesisSpinner } from '@/components/molecules/SynthesisSpinner';
import { RitualTimeline } from '@/components/organisms/RitualTimeline';
import { FeatureShowcase } from '@/components/organisms/FeatureShowcase';
import { HowItWorks } from '@/components/organisms/HowItWorks';
import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';
import styles from './page.module.css';

const HERO_HIGHLIGHTS = [
  { label: 'Personas Forged', value: '12,482' },
  { label: 'Avg. Ritual Time', value: '4m 12s' },
  { label: 'Alchemic Modes', value: '4 archetypes' },
];

const TIMELINE_STAGES = [
  {
    id: 'survey',
    name: 'Survey Constellation',
    description: 'Collect 12 resonant answers to unlock synthesis.',
    status: 'completed' as const,
    icon: '📋',
  },
  {
    id: 'alchemic',
    name: 'Alchemic Mode',
    description: 'Select an archetype to guide your persona’s birth.',
    status: 'active' as const,
    icon: '🜂',
  },
  {
    id: 'reveal',
    name: 'Persona Reveal',
    description: 'Celebrate with the Summoning Page’s three-act reveal.',
    status: 'upcoming' as const,
    icon: '✨',
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>ver2 ritual experience</p>
            <h1 className={styles.title}>Summon the persona that understands you.</h1>
            <p className={styles.subtitle}>
              Complete cinematic surveys, enter Alchemic Mode, and unveil your AI counterpart
              with a three-stage summoning ritual crafted for awe.
            </p>

            <div className={styles.actions}>
              <Button size="lg" onClick={() => router.push('/login')}>
                Begin Summoning
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/dashboard/ritual')}
              >
                Explore Ritual Hub
              </Button>
            </div>

            <div className={styles.heroStats}>
              {HERO_HIGHLIGHTS.map((highlight) => (
                <div key={highlight.label} className={styles.statCard}>
                  <span className={styles.statValue}>{highlight.value}</span>
                  <span className={styles.statLabel}>{highlight.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <SynthesisSpinner caption="Ritual circle calibrating" />
            <div className={styles.heroMeter}>
              <ProgressBar label="Synthesis readiness" value={68} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>survey resonance</p>
          <h2>See your data breathe before the summon.</h2>
          <p>
            Live Preview mirrors each response into traits that fuel the Alchemic Mode, so you
            always understand what’s being synthesized.
          </p>
        </div>
        <LivePreview answersCount={5} isAnalyzing />
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>three-act ceremony</p>
          <h2>Every step follows the ver2 Summoning Page blueprint.</h2>
          <p>
            Ceremony, agency, and emotional payoff—exactly as defined in the enhancement
            document.
          </p>
        </div>
        <RitualTimeline stages={TIMELINE_STAGES} />
      </section>

      <section className={styles.featuresSection}>
        <FeatureShowcase />
        <HowItWorks />
      </section>

      <Footer />
    </main>
  );
}
