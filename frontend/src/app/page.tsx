import Link from 'next/link';
import { PublicAtmosphere } from '@/components/layouts/PublicAtmosphere';
import { Card, Grid, Section } from '@/components/primitives';

const ritualStages = [
  {
    title: 'Ritual',
    desc: 'Create a guided mirror ritual and share it safely.',
  },
  {
    title: 'Summoning',
    desc: 'AI synthesizes emotional patterns into your living persona.',
  },
  {
    title: 'Bonding',
    desc: 'Chat with your mirror and track your growth over time.',
  },
];

export default function LandingPage() {
  return (
    <PublicAtmosphere>
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pb-10 pt-7 sm:px-8 lg:px-12">
        <header className="mb-8 flex items-center justify-between">
          <div className="ornament-ring bg-white/65 px-5 py-2 text-sm tracking-[0.18em] text-slate-700">
            RE:MIRAI
          </div>
          <nav className="flex items-center gap-2 text-sm sm:gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-500/30 bg-white/50 px-5 py-2 font-semibold text-slate-700 transition hover:border-fuchsia-400/40 hover:bg-fuchsia-100/45"
            >
              Enter Mirror
            </Link>
          </nav>
        </header>

        <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Section as="section" width="full" surface="card" spacing="lg" className="relative overflow-hidden">
            <div className="absolute -left-20 top-[-80px] h-52 w-52 rounded-full border border-fuchsia-400/30" />
            <div className="absolute bottom-[-88px] right-[-90px] h-64 w-64 rounded-full border border-slate-500/25" />

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Digital Mirror Experience
            </p>
            <h1 className="max-w-[18ch] font-display text-5xl leading-[0.95] text-slate-800 sm:text-6xl lg:text-7xl">
              See Yourself Through Honest Echoes.
            </h1>
            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-slate-700 sm:text-lg">
              Re:MirAI transforms anonymous peer reflections into a living persona you can converse with.
              Sacred visuals, intentional pacing, and deeply human feedback loops.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-fuchsia-500 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:bg-fuchsia-400"
              >
                Begin Your Ritual
              </Link>
              <Link
                href="/s/demo"
                className="rounded-full border border-slate-500/30 bg-white/65 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-700/40 hover:bg-white"
              >
                Try Public Ritual
              </Link>
            </div>
          </Section>

          <Grid cols="1" gap="md">
            {ritualStages.map((stage, index) => (
              <Card key={stage.title} variant="glass" padding="lg" className="relative overflow-hidden transition hover:-translate-y-0.5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="ornament-ring bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-600">
                    {`0${index + 1}`}
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-500">phase</span>
                </div>
                <h2 className="font-display text-3xl text-slate-800">{stage.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.desc}</p>
              </Card>
            ))}

            <Card variant="default" padding="lg">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Promise</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-700">
                Anonymous responses, API-safe architecture, and a focused UX that turns reflection into action.
              </p>
            </Card>
          </Grid>
        </main>
      </div>
    </PublicAtmosphere>
  );
}
