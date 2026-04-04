'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ShareOptions } from './ShareOptions';
import { toast } from '@/lib/toast';
import { Card } from '@/components/primitives';
import styles from './RitualLinkCard.module.css';

interface RitualLinkCardProps {
  link: string;
  onCopy?: () => void;
  shareCount?: number;
  lastShared?: string;
}

export function RitualLinkCard({ link, onCopy, shareCount, lastShared }: RitualLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }, cardRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();

    if (!prefersReducedMotion && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        }
      );
    }
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
    setQrCodeUrl(qrUrl);
    setShowQR(true);
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const a = document.createElement('a');
      a.href = qrCodeUrl;
      a.download = 'remirai-ritual-qr.png';
      a.click();
    }
  };

  const handleShare = (platform: string) => {
    const messages: Record<string, string> = {
      whatsapp: `Hey! I'm trying to discover how others see me through Re:MirAI. Could you take 2 minutes to answer my ritual? It's completely anonymous!\n\n${link}`,
      instagram: `Discovering my true self through Re:MirAI! Help me by answering a few ritual questions (it's anonymous) 👆\n${link} #ReMirAI #SelfDiscovery`,
      twitter: `I'm discovering how others see me through @ReMirAI! Help me with some anonymous ritual feedback 🪞\n${link}`,
    };

    const message = messages[platform] || link;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      navigator.clipboard.writeText(message);
      toast.success(`Message copied! Share it on ${platform}.`);
    }
  };

  return (
    <Card variant="glass" padding="lg">
      <div ref={cardRef} className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>🔗 Ritual Link</h3>
          {shareCount !== undefined && <span className={styles.shareCount}>Shared {shareCount} times</span>}
        </div>

        <div className={styles.linkRow}>
          <input type="text" value={link} readOnly className={styles.linkInput} aria-label="Ritual link" />
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </Button>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" onClick={() => setShowShareOptions(!showShareOptions)}>
            {showShareOptions ? 'Hide Share Options' : '📤 Share to Social Media'}
          </Button>
          <Button variant="secondary" onClick={generateQRCode}>
            📱 Generate QR Code
          </Button>
        </div>

        {showShareOptions && (
          <div className={styles.shareSection}>
            <ShareOptions platforms={['whatsapp', 'instagram', 'twitter', 'copy']} onShare={handleShare} link={link} />
          </div>
        )}

        {showQR && qrCodeUrl && (
          <div className={styles.qrSection}>
            <img src={qrCodeUrl} alt="QR Code for ritual" className={styles.qrImage} />
            <Button variant="ghost" size="sm" onClick={downloadQRCode}>
              💾 Download QR Code
            </Button>
          </div>
        )}

        {lastShared && <p className={styles.lastShared}>Last shared: {new Date(lastShared).toLocaleString()}</p>}
      </div>
    </Card>
  );
}
