'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { personaApi } from '@/lib/api/persona';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { data: persona, isLoading } = useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaApi.get(id)
  });

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
      <div className={styles.content}>
        <PersonaCard persona={persona} />
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(`/chat/${persona.id}`)}
          >
            Chat with {persona.name}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/')}
          >
            Create Your Own
          </Button>
        </div>
      </div>
    </div>
  );
}


