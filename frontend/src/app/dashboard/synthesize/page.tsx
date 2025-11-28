'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { personaApi } from '@/lib/api/persona';
import { Button } from '@/components/atoms/Button';
import { SummoningAnimation } from '@/components/organisms/SummoningAnimation';
import styles from './page.module.css';

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
        mode
      });
      setCreatedPersona(persona);
      setShowAnimation(true);
    } catch (error) {
      console.error('Failed to create persona:', error);
      alert('Persona 생성에 실패했습니다. 다시 시도해주세요.');
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
    <div className={styles.container}>
      <h1>Ready to summon?</h1>
      
      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${mode === 'FATED' ? styles.active : ''}`}
          onClick={() => setMode('FATED')}
          type="button"
        >
          <h2>🎲 Auto Mode (Fated)</h2>
          <p>Let fate decide your archetype</p>
          <span className={styles.free}>Free</span>
        </button>
        
        <button
          className={`${styles.modeButton} ${mode === 'ALCHEMIC' ? styles.active : ''}`}
          onClick={() => setMode('ALCHEMIC')}
          type="button"
        >
          <h2>✨ Alchemic Mode</h2>
          <p>Choose your archetype (Premium)</p>
          <span className={styles.premium}>Premium</span>
        </button>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSynthesize}
        disabled={isGenerating || !mode}
        className={styles.summonButton}
      >
        {isGenerating ? 'Generating Persona...' : 'Begin Summoning'}
      </Button>
    </div>
  );
}


