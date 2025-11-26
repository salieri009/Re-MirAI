'use client';

import { use, useMemo, useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/atoms/Button';
import { StatsPanel } from '@/components/molecules/StatsPanel';
import { QuestCard } from '@/components/molecules/QuestCard';
import { ActivityFeed, ActivityItem } from '@/components/molecules/ActivityFeed';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion, useAnnouncement } from '@/hooks/useAccessibility';
import { Quest } from '@/lib/mock-data/quests';
import styles from './page.module.css';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [completedQuestId, setCompletedQuestId] = useState<string | null>(null);
  const questCardRefs = useRef<Record<string, HTMLDivElement>>({});
  const celebrationRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

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

  const handleClaimQuest = async (questId: string) => {
    const questCard = questCardRefs.current[questId];
    
    if (!reducedMotion && questCard) {
      // 1. Immediate visual feedback
      gsap.to(questCard, {
        scale: 1.1,
        rotation: 5,
        filter: 'brightness(1.3)',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
      
      // 2. Celebration animation
      if (celebrationRef.current) {
        gsap.fromTo(celebrationRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            onComplete: () => {
              gsap.to(celebrationRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                delay: 1.5,
              });
            },
          }
        );
      }
      
      // 3. Announce success
      announce('Quest completed! Reward claimed.', 'assertive');
      
      // 4. Reset animation
      setTimeout(() => {
        gsap.to(questCard, {
          scale: 1,
          rotation: 0,
          filter: 'brightness(1)',
          duration: 0.3,
        });
      }, 500);
    }
    
    setCompletedQuestId(questId);
    await questApi.claim(questId);
    
    // Reload after celebration
    setTimeout(() => {
      window.location.reload();
    }, reducedMotion ? 0 : 2000);
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
          <StatsPanel stats={persona.stats} />
        </section>

        {quests && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Active Quests</h2>
                <p className={styles.sectionSubtitle}>Complete quests to earn crystals</p>
              </div>
            </div>
            <div className={styles.questGrid}>
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  ref={(el) => {
                    if (el) questCardRefs.current[quest.id] = el;
                  }}
                >
                  <QuestCard quest={quest} onClaim={handleClaimQuest} />
                </div>
              ))}
            </div>
            
            {/* Celebration overlay */}
            {completedQuestId && !reducedMotion && (
              <div ref={celebrationRef} className={styles.celebration} aria-live="polite">
                <div className={styles.celebrationContent}>
                  <span className={styles.celebrationEmoji}>🎉</span>
                  <h3>Quest Complete!</h3>
                  <p>Reward claimed</p>
                </div>
              </div>
            )}
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
