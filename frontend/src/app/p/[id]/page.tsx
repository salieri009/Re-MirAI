'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { personaApi } from '@/lib/api/persona';
import { questApi } from '@/lib/api/quest';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/atoms/Button';
import { PersonaRadarChart } from '@/components/molecules/PersonaRadarChart';
import { QuestCard } from '@/components/molecules/QuestCard';
import { ActivityFeed, ActivityItem } from '@/components/molecules/ActivityFeed';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { fadeIn, staggerIn } from '@/lib/animations';
import { Quest } from '@/lib/api/quest';

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

  useEffect(() => {
    if (reducedMotion || !radarRef.current || !persona) return;

    const cleanup = fadeIn(radarRef.current, {
      onComplete: () => {
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

  useEffect(() => {
    if (reducedMotion || !questsRef.current || !quests) return;

    const questCards = questsRef.current.querySelectorAll('[data-quest-card]');
    if (questCards.length > 0) {
      staggerIn(Array.from(questCards) as HTMLElement[]);
    }
  }, [quests, reducedMotion]);

  const handleClaimQuest = async (questId: string) => {
    await questApi.claim(questId);

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

    setTimeout(() => window.location.reload(), 900);
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
      <DashboardScaffold title="Persona Room" subtitle="Loading persona profile...">
        <div className="atmospheric-surface p-6 text-sm text-slate-600">Loading persona...</div>
      </DashboardScaffold>
    );
  }

  if (!persona) {
    return (
      <DashboardScaffold title="Persona Room" subtitle="No active persona found.">
        <div className="atmospheric-surface p-6 text-sm text-slate-600">Persona not found.</div>
      </DashboardScaffold>
    );
  }

  const bondScore = Math.round(
    (persona.stats.charisma + persona.stats.intellect + persona.stats.kindness + persona.stats.energy) / 4
  );

  const memories = [
    'Origin Ritual completed',
    `Archetype ${persona.archetype} affirmed`,
    'First shared reflection unlocked',
  ];

  return (
    <DashboardScaffold
      title={persona.name}
      subtitle="Track growth, complete quests, and deepen your bond through daily interaction."
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="atmospheric-surface p-5 sm:p-6">
          <PersonaCard persona={persona} />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="primary" size="lg" onClick={() => router.push(`/chat/${persona.id}`)}>
              Chat with {persona.name}
            </Button>
            <Button variant="secondary" onClick={() => setShowShareModal(true)}>
              Share Card
            </Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </section>

        <section className="atmospheric-surface p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Emotion Matrix</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Persona Stats</h2>
          <p className="mt-2 text-sm text-slate-600">Radar bloom reflects current personality emphasis from interactions.</p>
          <div ref={radarRef} className="mt-4">
            <PersonaRadarChart stats={persona.stats} />
          </div>
        </section>
      </div>

      <section className="atmospheric-surface mt-6 p-6 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Bonding</p>
            <h2 className="mt-1 font-display text-4xl text-slate-800">Bond Meter & Memory Gallery</h2>
          </div>
          <Button size="sm" variant="secondary" onClick={() => router.push('/dashboard/ritual')}>
            View Survey Threads
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-500/20 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Bond Strength</p>
            <div className="mt-3">
              <ProgressBar value={bondScore} showValue />
            </div>
            <p className="mt-3 text-sm text-slate-600">Complete daily rituals to unlock deeper persona memories.</p>
          </div>

          <div className="rounded-xl border border-slate-500/20 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Memory Gallery</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {memories.map((memory) => (
                <li key={memory}>{memory}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {quests && (
        <section className="atmospheric-surface mt-6 p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Daily Progression</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Active Quests</h2>
          <p className="mt-2 text-sm text-slate-600">Complete quests to earn crystals and strengthen continuity.</p>

          <div ref={questsRef} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {quests.map((quest) => (
              <div key={quest.id} data-quest-card data-quest-id={quest.id}>
                <QuestCard quest={quest} onClaim={handleClaimQuest} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="atmospheric-surface mt-6 p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Timeline</p>
        <h2 className="mt-1 font-display text-4xl text-slate-800">Recent Activity</h2>
        <p className="mt-2 text-sm text-slate-600">Track your latest bond milestones with {persona.name}.</p>
        <div className="mt-4">
          <ActivityFeed items={activityItems} />
        </div>
      </section>

      {showShareModal && <ShareModal persona={persona} onShare={handleShare} onClose={() => setShowShareModal(false)} />}
    </DashboardScaffold>
  );
}
