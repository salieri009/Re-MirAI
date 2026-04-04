'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/atoms/Button';
import { DashboardScaffold } from '@/components/layouts/DashboardScaffold';
import { AppState } from '@/components/molecules/AppState';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const isRedirecting = useProtectedRoute(isAuthenticated);

  const [isPublic, setIsPublic] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(true);
  const [allowRoomVisits, setAllowRoomVisits] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (isRedirecting) {
    return (
      <DashboardScaffold title="Privacy & Visibility" subtitle="Loading your settings...">
        <AppState
          type="loading"
          title="Checking access"
          description="Redirecting to login if your session is not available."
        />
      </DashboardScaffold>
    );
  }

  const settingItems = [
    {
      id: 'public',
      title: 'Public Profile',
      description: 'Allow anyone with your profile link to view your persona room.',
      value: isPublic,
      onChange: setIsPublic,
    },
    {
      id: 'compatibility',
      title: 'Compatibility Discovery',
      description: 'Allow friends to run social chemistry checks with your persona.',
      value: showCompatibility,
      onChange: setShowCompatibility,
    },
    {
      id: 'roomVisits',
      title: 'Allow Room Visits',
      description: 'Let trusted users visit your room and leave social gifts.',
      value: allowRoomVisits,
      onChange: setAllowRoomVisits,
    },
  ];

  return (
    <DashboardScaffold
      title="Privacy & Visibility"
      subtitle="Control what other people can see, compare, and access in your persona ecosystem."
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="atmospheric-surface p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Visibility Policy</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Privacy Toggles</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Default is private. Activate only the permissions you are comfortable exposing to the social layer.
          </p>

          <div className="mt-5 space-y-3">
            {settingItems.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-500/20 bg-white/60 px-4 py-4"
              >
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-700">{item.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{item.description}</span>
                </span>
                <span className="relative inline-flex h-7 w-12 shrink-0 items-center">
                  <input
                    type="checkbox"
                    checked={item.value}
                    onChange={(e) => item.onChange(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="absolute inset-0 rounded-full bg-slate-300/90 transition peer-checked:bg-fuchsia-500/80" />
                  <span className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="atmospheric-surface p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Account Snapshot</p>
          <h2 className="mt-1 font-display text-4xl text-slate-800">Identity State</h2>

          <div className="mt-5 space-y-3 rounded-xl border border-slate-500/20 bg-white/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.1em] text-slate-500">Email</span>
              <span className="text-sm font-semibold text-slate-700">{user?.email || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.1em] text-slate-500">Member Since</span>
              <span className="text-sm font-semibold text-slate-700">December 2025</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.1em] text-slate-500">Current Profile Mode</span>
              <span className="rounded-full border border-slate-500/25 bg-slate-100/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600">
                {isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
            </Button>
          </div>

          {saved ? (
            <div className="mt-4">
              <AppState type="success" title="Settings saved" description="Your privacy controls are updated." />
            </div>
          ) : null}
        </section>
      </div>
    </DashboardScaffold>
  );
}
