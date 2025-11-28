'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { useFocusTrap, useReducedMotion } from '@/hooks/useAccessibility';
import styles from './ShareModal.module.css';

interface Persona {
  id: string;
  name: string;
  archetype: string;
}

interface ShareModalProps {
  persona: Persona;
  onShare: (platform: string, image?: Blob) => void;
  onClose: () => void;
}

export function ShareModal({ persona, onShare, onClose }: ShareModalProps) {
  const [preview, setPreview] = useState<Blob | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useFocusTrap(modalRef, true);

  useEffect(() => {
    if (prefersReducedMotion || !modalRef.current || !backdropRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.92, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' },
      '<'
    );
  }, [prefersReducedMotion]);

  const handleClose = () => {
    if (isClosing) return;
    if (prefersReducedMotion || !modalRef.current || !backdropRef.current) {
      onClose();
      return;
    }

    setIsClosing(true);
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 16,
      duration: 0.2,
      ease: 'power2.in',
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.in',
      },
      '<'
    );
  };

  const generatePreview = async (platform: string) => {
    // Generate persona card image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const dimensions = getPlatformDimensions(platform);
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw persona card
    drawPersonaCard(ctx, persona, dimensions);
    
    // Draw branding
    drawBranding(ctx, dimensions);
    
    canvas.toBlob((blob) => {
      if (blob) {
        setPreview(blob);
      }
    }, 'image/png');
  };

  const handleShare = (selectedPlatform: string) => {
    if (preview) {
      onShare(selectedPlatform, preview);
      return;
    }

    generatePreview(selectedPlatform).then(() => {
      onShare(selectedPlatform);
    });
  };

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Share persona card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Share Your Persona Card</h2>
          <button onClick={handleClose} className={styles.closeButton} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <ShareOptions
            platforms={['instagram', 'twitter', 'tiktok', 'whatsapp', 'copy']}
            onShare={handleShare}
            link={typeof window !== 'undefined' ? `${window.location.origin}/p/${persona.id}` : ''}
          />

          {preview && (
            <div className={styles.preview}>
              <img
                src={URL.createObjectURL(preview)}
                alt={`${persona.name} persona card preview`}
                className={styles.previewImage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getPlatformDimensions(platform: string) {
  switch (platform) {
    case 'instagram':
    case 'tiktok':
      return { width: 1080, height: 1920 };
    case 'twitter':
      return { width: 1200, height: 675 };
    default:
      return { width: 1080, height: 1920 };
  }
}

function drawPersonaCard(
  ctx: CanvasRenderingContext2D,
  persona: Persona,
  dimensions: { width: number; height: number }
) {
  const padding = 40;
  const cardWidth = dimensions.width - padding * 2;
  const cardHeight = dimensions.height - padding * 2;
  const x = padding;
  const y = padding;

  // Draw card background
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, cardWidth, cardHeight, 16);
  ctx.fill();
  ctx.stroke();

  // Draw persona name
  ctx.fillStyle = '#d946ef';
  ctx.font = 'bold 48px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(persona.name, dimensions.width / 2, y + 100);

  // Draw archetype
  ctx.fillStyle = '#64748b';
  ctx.font = '24px Inter, sans-serif';
  ctx.fillText(persona.archetype, dimensions.width / 2, y + 160);
}

function drawBranding(
  ctx: CanvasRenderingContext2D,
  dimensions: { width: number; height: number }
) {
  const padding = 40;
  const x = dimensions.width - padding;
  const y = dimensions.height - padding;

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Re:MirAI', x, y);
}

