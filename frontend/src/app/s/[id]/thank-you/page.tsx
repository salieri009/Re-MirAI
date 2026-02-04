'use client';

import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';

// Styles
const pageStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-xl)',
    backgroundColor: 'var(--color-bg-secondary)',
  } as CSSProperties,
  content: {
    textAlign: 'center',
    maxWidth: '500px',
  } as CSSProperties,
  h1: {
    fontSize: 'var(--font-size-4xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-lg)',
  } as CSSProperties,
  p: {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-md)',
  } as CSSProperties,
  subtext: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-tertiary)',
    marginBottom: 'var(--space-xl)',
  } as CSSProperties,
};

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.content}>
        <h1 style={pageStyles.h1}>Thank You! 🙏</h1>
        <p style={pageStyles.p}>Your response has been submitted successfully.</p>
        <p style={pageStyles.subtext}>Your feedback helps create a unique AI persona.</p>
        <Button variant="primary" onClick={() => router.push('/')}>
          Create Your Own Persona
        </Button>
      </div>
    </div>
  );
}
