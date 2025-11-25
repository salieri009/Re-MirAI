'use client';

import { use, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/atoms/Button';
import { StatsPanel } from '@/components/molecules/StatsPanel';
import { QuestCard } from '@/components/molecules/QuestCard';
import { ActivityFeed, ActivityItem } from '@/components/molecules/ActivityFeed';
import { Quest } from '@/lib/mock-data/quests';
import styles from './page.module.css';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
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

  const handleClaimQuest = async (questId: string) => {
    await questApi.claim(questId);
    window.location.reload();
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
                <QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
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
