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
import { AppState } from '@/components/molecules/AppState';
import { queryKeys } from '@/lib/queryKeys';
import { Card } from '@/components/primitives';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function CompatibilityPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const isRedirecting = useProtectedRoute(isAuthenticated);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

  const {
    data: myPersonas,
    isLoading: personasLoading,
    isError: personasError,
    refetch: refetchPersonas,
  } = useQuery({
    queryKey: queryKeys.personas.list,
    queryFn: () => personaApi.list(),
    enabled: isAuthenticated,
  });

  const {
    data: compatibility,
    isLoading: isCheckingCompatibility,
    isError: compatibilityError,
    refetch: refetchCompatibility,
  } = useQuery({
    queryKey: queryKeys.social.compatibility(selectedPersonaId),
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

  const selectedFriend = friendPersonas.find((friend) => friend.id === selectedPersonaId) ?? null;

  if (personasLoading) {
    return (
      <DashboardScaffold
        title="Social Chemistry Check"
        subtitle="Compare your active persona with friends and reveal relationship dynamics in one pulse."
      >
        <AppState type="loading" title="Loading personas" description="Preparing your persona list for compatibility checks." />
      </DashboardScaffold>
    );
  }

  if (personasError) {
    return (
      <DashboardScaffold
        title="Social Chemistry Check"
        subtitle="Compare your active persona with friends and reveal relationship dynamics in one pulse."
      >
        <AppState
          type="error"
          title="Persona list failed to load"
          description="Retry to fetch your personas."
          actionLabel="Retry"
          onAction={() => refetchPersonas()}
        />
      </DashboardScaffold>
    );
  }

  const myPersona = myPersonas?.[0];

  return (
    <DashboardScaffold
      title="Social Chemistry Check"
      subtitle="Compare your active persona with friends and reveal relationship dynamics in one pulse."
    >
      {isRedirecting ? (
        <AppState
          type="loading"
          title="Redirecting to login"
          description="You need to sign in before running a compatibility check."
        />
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.75fr_1fr]">
        <Card variant="glass" padding="lg" className="p-5 sm:p-6">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-slate-500">Your Persona</p>
          {myPersona ? (
            <PersonaCard persona={myPersona} readOnly />
          ) : (
            <AppState
              type="empty"
              title="No persona found yet"
              description="Create a persona from a ritual before checking compatibility."
              actionLabel="Create Persona"
              onAction={() => router.push('/dashboard/ritual')}
            />
          )}
        </Card>

        <Card variant="glass" padding="lg" className="flex min-h-[360px] flex-col items-center justify-center p-5 text-center sm:p-6">
          {isCheckingCompatibility ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-300 border-t-fuchsia-500" />
              <p className="text-sm text-slate-600">Calculating chemistry...</p>
            </div>
          ) : compatibilityError ? (
            <AppState
              type="error"
              title="Compatibility check failed"
              description="Try again with the selected persona."
              actionLabel="Retry"
              onAction={() => refetchCompatibility()}
            />
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
                      `My persona and ${selectedFriend?.name ?? 'this friend'} have ${compatibility.score}% compatibility on Re:MirAI.`
                    );
                    toast.success('Copied to clipboard!');
                  }}
                >
                  Share Result
                </Button>
              </div>
            </>
          ) : (
            <AppState
              type="empty"
              title="Select a friend persona"
              description="Pick one profile on the right to run a compatibility check."
            />
          )}
        </Card>

        <Card variant="glass" padding="lg" className="p-5 sm:p-6">
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
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </DashboardScaffold>
  );
}
