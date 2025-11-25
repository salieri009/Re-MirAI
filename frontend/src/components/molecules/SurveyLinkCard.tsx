'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ShareOptions } from './ShareOptions';
import styles from './SurveyLinkCard.module.css';

interface SurveyLinkCardProps {
  link: string;
  onCopy?: () => void;
  shareCount?: number;
  lastShared?: string;
}

export function SurveyLinkCard({ link, onCopy, shareCount, lastShared }: SurveyLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const handleShare = (platform: string) => {
    const messages: Record<string, string> = {
      whatsapp: `Hey! I'm trying to discover how others see me through Re:MirAI. Could you take 2 minutes to answer some questions? It's completely anonymous!\n\n${link}`,
      instagram: `Discovering my true self through Re:MirAI! Help me out by answering a few questions (it's anonymous) 👆\n${link} #ReMirAI #SelfDiscovery`,
      twitter: `I'm discovering how others see me through @ReMirAI! Help me out with some anonymous feedback 🪞\n${link}`
    };

    const message = messages[platform] || link;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      navigator.clipboard.writeText(message);
      alert(`Message copied! Share it on ${platform}.`);
    }
  };

  return (
    <div ref={cardRef} className={styles.card}>
      <div className={styles.header}>
        <h3>🔗 Survey Link</h3>
        {shareCount !== undefined && (
          <span className={styles.shareCount}>Shared {shareCount} times</span>
        )}
      </div>

      <div className={styles.linkContainer}>
        <input
          type="text"
          value={link}
          readOnly
          className={styles.linkInput}
          aria-label="Survey link"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className={styles.copyButton}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </Button>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          {showShareOptions ? 'Hide Share Options' : '📤 Share to Social Media'}
        </Button>
      </div>

      <div
        className={`${styles.shareSection} ${
          showShareOptions ? styles.shareSectionVisible : ''
        }`}
        aria-hidden={!showShareOptions}
      >
        {showShareOptions && (
          <ShareOptions
            platforms={['whatsapp', 'instagram', 'twitter', 'copy']}
            onShare={handleShare}
            link={link}
          />
        )}
      </div>

      {lastShared && (
        <p className={styles.lastShared}>Last shared: {lastShared}</p>
      )}
    </div>
  );
}

