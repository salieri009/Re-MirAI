'use client';

import { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { personaApi } from '@/lib/api/persona';
import { PersonaCard } from '@/components/molecules/PersonaCard';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PersonaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);

  const { data: persona, isLoading } = useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaApi.get(id)
  });

  const handleShare = (platform: string, image?: Blob) => {
    if (image) {
      const url = URL.createObjectURL(image);
      const a = document.createElement('a');
      a.href = url;
      a.download = `remirai-${persona?.name}-${platform}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setShowShareModal(false);
  };

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
            💬 Chat with {persona.name}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowShareModal(true)}
          >
            📸 Share Card
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
          >
            Create Your Own
          </Button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          persona={persona}
          onShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}


