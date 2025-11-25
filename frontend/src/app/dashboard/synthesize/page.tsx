'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { personaApi } from '@/lib/api/persona';
import { Button } from '@/components/atoms/Button';
import styles from './page.module.css';

export default function SynthesizePage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'FATED' | 'ALCHEMIC'>('FATED');

  const handleSynthesize = async () => {
    setIsGenerating(true);
    try {
      const persona = await personaApi.synthesize({
        surveyId: '550e8400-e29b-41d4-a716-446655440000',
        mode
      });
      router.push(`/p/${persona.id}`);
    } catch (error) {
      console.error('Failed to create persona:', error);
      alert('Persona 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Your Persona</h1>
      
      <div className={styles.modeSelector}>
        <button
          className={`${styles.modeButton} ${mode === 'FATED' ? styles.active : ''}`}
          onClick={() => setMode('FATED')}
        >
          <h2>Fated Mode</h2>
          <p>Let the AI determine your archetype based on responses</p>
          <span className={styles.free}>Free</span>
        </button>
        
        <button
          className={`${styles.modeButton} ${mode === 'ALCHEMIC' ? styles.active : ''}`}
          onClick={() => setMode('ALCHEMIC')}
        >
          <h2>Alchemic Mode</h2>
          <p>Choose a specific archetype (Premium)</p>
          <span className={styles.premium}>Premium</span>
        </button>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSynthesize}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating Persona...' : 'Create Persona'}
      </Button>
    </div>
  );
}


