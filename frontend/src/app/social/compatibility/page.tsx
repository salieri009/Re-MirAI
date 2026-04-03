'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { socialApi } from '@/lib/api/social';
import { personaApi } from '@/lib/api/persona';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';

export default function CompatibilityPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

  const { data: myPersonas } = useQuery({
    queryKey: ['my-personas'],
    queryFn: () => personaApi.list(),
    enabled: isAuthenticated,
  });

  const { data: compatibility, isLoading: isCheckingCompatibility } = useQuery({
    queryKey: ['compatibility', selectedPersonaId],
    queryFn: () => socialApi.getCompatibility(selectedPersonaId!),
    enabled: !!selectedPersonaId,
  });

  const friendPersonas = useMemo(
    () => [
      { id: 'friend-1', name: 'Alex', archetype: 'The Strategist' },
      { id: 'friend-2', name: 'Mia', archetype: 'The Dreamer' },
      { id: 'friend-3', name: 'Jordan', archetype: 'The Guardian' },
    ],
    []
  );

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const myPersona = myPersonas?.[0];

  return (
    <DashboardScaffold
      title="Social Chemistry Check"
      subtitle="Compare your active persona with friends and reveal relationship dynamics in one pulse."
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.75fr_1fr]">
        <section className="atmospheric-surface p-5 sm:p-6">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-500">Your Persona</p>
          {myPersona ? (
            <PersonaCard persona={myPersona} readOnly />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-400/40 bg-white/55 p-5 text-center">
              <p className="text-sm text-slate-600">No persona found yet.</p>
              <div className="mt-3">
                <Button onClick={() => router.push('/dashboard/ritual')}>Create Persona</Button>
              </div>
            </div>
          )}
        </section>

        <section className="atmospheric-surface flex min-h-[360px] flex-col items-center justify-center p-5 text-center sm:p-6">
          {isCheckingCompatibility ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-300 border-t-fuchsia-500" />
              <p className="text-sm text-slate-600">Calculating chemistry...</p>
            </div>
          ) : compatibility ? (
            <>
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-fuchsia-500/70 bg-fuchsia-100/55">
                <span className="text-4xl font-bold text-fuchsia-700">{compatibility.score}</span>
                <span className="mt-4 text-sm text-slate-600">%</span>
              </div>
              <h3 className="mt-3 font-display text-3xl text-slate-800">{compatibility.label}</h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-slate-600">{compatibility.description}</p>
              <div className="mt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `My persona and ${selectedPersonaId} have ${compatibility.score}% compatibility on Re:MirAI.`
                    );
                    toast.success('Copied to clipboard!');
                  }}
                >
                  Share Result
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-slate-600">Select a friend persona to run compatibility.</p>
              <p className="mt-2 text-2xl text-slate-400">→</p>
            </div>
          )}
        </section>

        <section className="atmospheric-surface p-5 sm:p-6">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-500">Friend Personas</p>
          <div className="space-y-3">
            {friendPersonas.map((friend) => {
              const selected = selectedPersonaId === friend.id;
              return (
                <button
                  key={friend.id}
                  type="button"
                  onClick={() => setSelectedPersonaId(friend.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    selected
                      ? 'border-fuchsia-500/45 bg-fuchsia-100/55'
                      : 'border-slate-500/20 bg-white/60 hover:-translate-y-0.5 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-sky-500 text-lg font-semibold text-white">
                      {friend.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{friend.name}</p>
                      <p className="text-xs text-slate-500">{friend.archetype}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </DashboardScaffold>
  );
}
