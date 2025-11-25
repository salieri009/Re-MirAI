'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { Button } from '@/components/atoms/Button';
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
  const [platform, setPlatform] = useState('instagram');
  const [preview, setPreview] = useState<Blob | null>(null);

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

  const handleShare = (platform: string) => {
    if (preview) {
      onShare(platform, preview);
    } else {
      generatePreview(platform).then(() => {
        onShare(platform);
      });
    }
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2>Share Your Persona Card</h2>
            <button onClick={onClose} className={styles.closeButton} aria-label="Close">
              ×
            </button>
          </div>

          <div className={styles.content}>
            <ShareOptions
              platforms={['instagram', 'twitter', 'tiktok', 'whatsapp', 'copy']}
              onShare={handleShare}
              link={`${window.location.origin}/p/${persona.id}`}
            />

            {preview && (
              <div className={styles.preview}>
                <img
                  src={URL.createObjectURL(preview)}
                  alt="Persona card preview"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
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

