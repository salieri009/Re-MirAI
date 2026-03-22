'use client';

import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { personaApi } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { SummoningAnimation } from '@/components/organisms/SummoningAnimation';

// Styles
const pageStyles = {
  container: {
    minHeight: '100vh',
    padding: 'var(--space-3xl)',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2xl)',
  } as CSSProperties,
  h1: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-text)',
  } as CSSProperties,
  modeSelector: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--space-lg)',
    width: '100%',
  } as CSSProperties,
  modeButton: {
    padding: 'var(--space-xl)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-surface)',
    cursor: 'pointer',
    transition: 'all var(--transition-base)',
    textAlign: 'left',
  } as CSSProperties,
  modeButtonActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(217, 70, 239, 0.1)',
  } as CSSProperties,
  modeH2: {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-sm)',
  } as CSSProperties,
  modeP: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-md)',
  } as CSSProperties,
  badge: {
    display: 'inline-block',
    padding: 'var(--space-xs) var(--space-md)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
  } as CSSProperties,
  free: {
    backgroundColor: 'var(--color-success)',
    color: 'var(--color-text-inverse)',
  } as CSSProperties,
  premium: {
    backgroundColor: 'var(--color-warning)',
    color: 'var(--color-text-inverse)',
  } as CSSProperties,
  summonButton: {
    fontSize: 'var(--font-size-xl)',
    padding: 'var(--space-lg) var(--space-2xl)',
    animation: 'glowPulse 2s ease-in-out infinite',
  } as CSSProperties,
};

// CSS for glow pulse animation
const glowPulseKeyframes = `
@keyframes glowPulse {
    0%, 100% {
        box-shadow: 0 0 20px rgba(217, 70, 239, 0.5);
    }
    50% {
        box-shadow: 0 0 40px rgba(217, 70, 239, 0.8), 0 0 60px rgba(240, 147, 251, 0.4);
    }
}
`;

export default function SynthesizePage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [createdPersona, setCreatedPersona] = useState<any>(null);
  const [mode, setMode] = useState<'FATED' | 'ALCHEMIC'>('FATED');

  const handleSynthesize = async () => {
    setIsGenerating(true);
    try {
      const persona = await personaApi.synthesize({
        surveyId: '550e8400-e29b-41d4-a716-446655440000',
        mode,
      });
      setCreatedPersona(persona);
      setShowAnimation(true);
    } catch (error) {
      toast.error('Failed to generate persona. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleAnimationComplete = () => {
    if (createdPersona) {
      router.push(`/p/${createdPersona.id}`);
    }
  };

  if (showAnimation && createdPersona) {
    return (
      <SummoningAnimation
        persona={createdPersona}
        onComplete={handleAnimationComplete}
        onSkip={handleAnimationComplete}
        variant={mode === 'FATED' ? 'fated' : 'custom'}
      />
    );
  }

  return (
    <>
      <style>{glowPulseKeyframes}</style>
      <div style={pageStyles.container}>
        <h1 style={pageStyles.h1}>Ready to summon?</h1>

        <div style={pageStyles.modeSelector}>
          <button
            style={{
              ...pageStyles.modeButton,
              ...(mode === 'FATED' ? pageStyles.modeButtonActive : {}),
            }}
            onClick={() => setMode('FATED')}
            type="button"
          >
            <h2 style={pageStyles.modeH2}>🎲 Auto Mode (Fated)</h2>
            <p style={pageStyles.modeP}>Let fate decide your archetype</p>
            <span style={{ ...pageStyles.badge, ...pageStyles.free }}>Free</span>
          </button>

          <button
            style={{
              ...pageStyles.modeButton,
              ...(mode === 'ALCHEMIC' ? pageStyles.modeButtonActive : {}),
            }}
            onClick={() => setMode('ALCHEMIC')}
            type="button"
          >
            <h2 style={pageStyles.modeH2}>✨ Alchemic Mode</h2>
            <p style={pageStyles.modeP}>Choose your archetype (Premium)</p>
            <span style={{ ...pageStyles.badge, ...pageStyles.premium }}>Premium</span>
          </button>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleSynthesize}
          disabled={isGenerating || !mode}
          style={pageStyles.summonButton}
        >
          {isGenerating ? 'Generating Persona...' : 'Begin Summoning'}
        </Button>
      </div>
    </>
  );
}
