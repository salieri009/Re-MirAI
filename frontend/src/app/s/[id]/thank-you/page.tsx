'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import styles from './page.module.css';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Thank You! 🙏</h1>
        <p>Your response has been submitted successfully.</p>
        <p className={styles.subtext}>
          Your feedback helps create a unique AI persona.
        </p>
        <Button
          variant="primary"
          onClick={() => router.push('/')}
        >
          Create Your Own Persona
        </Button>
      </div>
    </div>
  );
}


