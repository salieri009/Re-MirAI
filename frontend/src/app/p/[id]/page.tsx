'use client';

import { use, useMemo, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/atoms/Button';
import { StatsPanel } from '@/components/molecules/StatsPanel';
import { PersonaRadarChart } from '@/components/molecules/PersonaRadarChart';
import { QuestCard } from '@/components/molecules/QuestCard';
import { ActivityFeed, ActivityItem } from '@/components/molecules/ActivityFeed';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { fadeIn, staggerIn } from '@/lib/animations';
import { Quest } from '@/lib/api/quest';
import styles from './page.module.css';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const radarRef = useRef<HTMLDivElement>(null);
  const questsRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  const { data: persona, isLoading } = useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaApi.get(id),
  });

  const { data: quests } = useQuery({
    queryKey: ['persona-quests', id],
    queryFn: () => questApi.getActive(),
  });

  const handleShare = (platform: string, image?: Blob) => {
    if (image && persona) {
      const url = URL.createObjectURL(image);
      const a = document.createElement('a');
      a.href = url;
      a.download = `remirai-${persona.name}-${platform}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setShareCount((prev) => prev + 1);
    }
    setShowShareModal(false);
  };

  // Radar chart bloom animation
  useEffect(() => {
    if (reducedMotion || !radarRef.current || !persona) return;

    const cleanup = fadeIn(radarRef.current, {
      onComplete: () => {
        // Bloom effect - scale up then settle
        if (radarRef.current) {
          gsap.to(radarRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          });
        }
      },
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [persona, reducedMotion]);

  // Quest cards stagger animation
  useEffect(() => {
    if (reducedMotion || !questsRef.current || !quests) return;

    const questCards = questsRef.current.querySelectorAll('[data-quest-card]');
    if (questCards.length > 0) {
      staggerIn(Array.from(questCards) as HTMLElement[]);
    }
  }, [quests, reducedMotion]);

  const handleClaimQuest = async (questId: string) => {
    await questApi.claim(questId);

    // Celebration animation
    if (!reducedMotion) {
      const questElement = document.querySelector(`[data-quest-id="${questId}"]`) as HTMLElement;
      if (questElement) {
        gsap.to(questElement, {
          scale: 1.1,
          boxShadow: '0 0 32px rgba(0, 201, 167, 0.6)',
          duration: 0.5,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        });
      }
    }

    // Reload after animation
    setTimeout(() => window.location.reload(), 1000);
  };

  const activityItems: ActivityItem[] = useMemo(() => {
    if (!persona) return [];
    const items: ActivityItem[] = [
      {
        id: 'created',
        title: 'Persona awakened',
        subtitle: `Archetype: ${persona.archetype}`,
        timestamp: new Date(persona.createdAt).toLocaleString(),
      },
    ];

    if (shareCount > 0) {
      items.push({
        id: 'shared',
        title: 'Persona shared',
        subtitle: `${shareCount} time${shareCount > 1 ? 's' : ''}`,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    quests
      ?.filter((quest: Quest) => quest.status === 'COMPLETED')
      .forEach((quest) => {
        items.push({
          id: quest.id,
          title: quest.name,
          subtitle: quest.description,
          timestamp: 'Completed',
        });
      });

    return items;
  }, [persona, quests, shareCount]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading persona...</p>
      </div>
    );
  }

  if (!persona) {
    return (
      <div className={styles.container}>
        <p>Persona not found</p>
      </div>
    );
  }

  const bondScore = Math.round(
    (persona.stats.charisma + persona.stats.intellect + persona.stats.kindness + persona.stats.energy) / 4
  );

  const memories = [
    'Origin Ritual · Completed',
    `Archetype ${persona.archetype} affirmed`,
    'First shared reflection unlocked',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.room}>
        <section className={styles.heroSection}>
          <PersonaCard persona={persona} />
          <div className={styles.heroActions}>
            <Button variant="primary" size="lg" onClick={() => router.push(`/chat/${persona.id}`)}>
              💬 Chat with {persona.name}
            </Button>
            <Button variant="secondary" onClick={() => setShowShareModal(true)}>
              📸 Share Card
            </Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Persona Stats</h2>
              <p className={styles.sectionSubtitle}>Emotion-driven attributes</p>
            </div>
          </div>
          <div ref={radarRef}>
            <PersonaRadarChart stats={persona.stats} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Bonding Meter & Memory Gallery</h2>
              <p className={styles.sectionSubtitle}>Stay aligned with ver2 Persona Room spec.</p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => router.push('/dashboard/ritual')}>
              View Survey Threads
            </Button>
          </div>
          <div className={styles.bondingGrid}>
            <div className={styles.bondCard}>
              <p className={styles.label}>Bond strength</p>
              <ProgressBar value={bondScore} showValue />
              <p className={styles.helper}>
                Complete daily rituals in the Survey Hub to unlock the next persona memory.
              </p>
            </div>
            <div className={styles.memoryBoard}>
              <p className={styles.label}>Memory gallery</p>
              <ul>
                {memories.map((memory) => (
                  <li key={memory}>{memory}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {quests && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Active Quests</h2>
                <p className={styles.sectionSubtitle}>Complete quests to earn crystals</p>
              </div>
            </div>
            <div ref={questsRef} className={styles.questGrid}>
              {quests.map((quest) => (
                <div key={quest.id} data-quest-card data-quest-id={quest.id}>
                  <QuestCard quest={quest} onClaim={handleClaimQuest} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Recent Activity</h2>
              <p className={styles.sectionSubtitle}>Track your bond with {persona.name}</p>
            </div>
          </div>
          <ActivityFeed items={activityItems} />
        </section>
      </div>

      {showShareModal && (
        <ShareModal persona={persona} onShare={handleShare} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
