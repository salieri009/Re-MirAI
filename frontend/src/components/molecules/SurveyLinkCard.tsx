'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ShareOptions } from './ShareOptions';
import { toast } from '@/lib/toast';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface SurveyLinkCardProps {
  link: string;
  onCopy?: () => void;
  shareCount?: number;
  lastShared?: string;
}

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: spacing.lg,
  background: colors.surface,
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
  boxShadow: shadows.md,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.md,
};

const headerTitleStyle: CSSProperties = {
  fontSize: typography.size.lg,
  fontWeight: typography.weight.semiBold,
  color: colors.text,
  margin: 0,
};

const shareCountStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
};

const linkContainerStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
};

const linkInputStyle: CSSProperties = {
  flex: 1,
  padding: `${spacing.sm}px ${spacing.md}px`,
  background: colors.background,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  color: colors.text,
  fontSize: typography.size.sm,
  fontFamily: 'monospace',
};

const actionsStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
  flexWrap: 'wrap',
};

const shareSectionStyle: CSSProperties = {
  paddingTop: spacing.md,
  borderTop: `1px solid ${colors.border}`,
};

const qrSectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.sm,
  paddingTop: spacing.md,
  borderTop: `1px solid ${colors.border}`,
};

const qrImageStyle: CSSProperties = {
  maxWidth: 200,
  borderRadius: radius.md,
};

const lastSharedStyle: CSSProperties = {
  fontSize: typography.size.xs,
  color: colors.textMuted,
  textAlign: 'center',
  margin: 0,
};

export function SurveyLinkCard({ link, onCopy, shareCount, lastShared }: SurveyLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
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

    // Copy animation
    if (!prefersReducedMotion && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }
      );
    }
  };

  const generateQRCode = () => {
    // Using QR Server API for simplicity
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
    setQrCodeUrl(qrUrl);
    setShowQR(true);
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const a = document.createElement('a');
      a.href = qrCodeUrl;
      a.download = 'remirai-survey-qr.png';
      a.click();
    }
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
      toast.success(`Message copied! Share it on ${platform}.`);
    }
  };

  return (
    <div ref={cardRef} style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={headerTitleStyle}>🔗 Survey Link</h3>
        {shareCount !== undefined && (
          <span style={shareCountStyle}>Shared {shareCount} times</span>
        )}
      </div>

      <div style={linkContainerStyle}>
        <input
          type="text"
          value={link}
          readOnly
          style={linkInputStyle}
          aria-label="Survey link"
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </Button>
      </div>

      <div style={actionsStyle}>
        <Button
          variant="primary"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          {showShareOptions ? 'Hide Share Options' : '📤 Share to Social Media'}
        </Button>
        <Button
          variant="secondary"
          onClick={generateQRCode}
        >
          📱 Generate QR Code
        </Button>
      </div>

      {showShareOptions && (
        <div style={shareSectionStyle}>
          <ShareOptions
            platforms={['whatsapp', 'instagram', 'twitter', 'copy']}
            onShare={handleShare}
            link={link}
          />
        </div>
      )}

      {showQR && qrCodeUrl && (
        <div style={qrSectionStyle}>
          <img src={qrCodeUrl} alt="QR Code for survey" style={qrImageStyle} />
          <Button variant="ghost" size="sm" onClick={downloadQRCode}>
            💾 Download QR Code
          </Button>
        </div>
      )}

      {lastShared && (
        <p style={lastSharedStyle}>Last shared: {new Date(lastShared).toLocaleString()}</p>
      )}
    </div>
  );
}
