'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import styles from './ShareableSnippet.module.css';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'USER' | 'PERSONA' | 'AI';
  createdAt: string;
}

interface Persona {
  id: string;
  name: string;
  archetype: string;
}

interface ShareableSnippetProps {
  message: ChatMessage;
  persona: Persona;
  onShare: (image: Blob) => void;
  variant?: 'instagram' | 'twitter' | 'tiktok';
}

export function ShareableSnippet({ 
  message, 
  persona, 
  onShare, 
  variant = 'instagram' 
}: ShareableSnippetProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas size based on platform
      const dimensions = getPlatformDimensions(variant);
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      
      // Draw background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw message bubble
      drawMessageBubble(ctx, message, dimensions);
      
      // Draw persona info
      drawPersonaInfo(ctx, persona, dimensions);
      
      // Draw branding
      drawBranding(ctx, dimensions);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          onShare(blob);
        }
        setIsGenerating(false);
      }, 'image/png');
    } catch (error) {
      console.error('Failed to generate image:', error);
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={generateImage}
      disabled={isGenerating}
      className={styles.shareButton}
      aria-label="Share this message"
    >
      {isGenerating ? 'Generating...' : '📤 Share'}
    </Button>
  );
}

function getPlatformDimensions(variant: string) {
  switch (variant) {
    case 'instagram':
      return { width: 1080, height: 1920 };
    case 'twitter':
      return { width: 1200, height: 675 };
    case 'tiktok':
      return { width: 1080, height: 1920 };
    default:
      return { width: 1080, height: 1920 };
  }
}

function drawMessageBubble(
  ctx: CanvasRenderingContext2D,
  message: ChatMessage,
  dimensions: { width: number; height: number }
) {
  const padding = 40;
  const bubbleWidth = dimensions.width - padding * 2;
  const bubbleHeight = 200;
  const x = padding;
  const y = dimensions.height / 2 - bubbleHeight / 2;

  // Draw bubble
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, bubbleWidth, bubbleHeight, 16);
  ctx.fill();
  ctx.stroke();

  // Draw text
  ctx.fillStyle = '#0f172a';
  ctx.font = '24px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  const textX = x + 20;
  const textY = y + 20;
  const maxWidth = bubbleWidth - 40;
  
  // Word wrap
  const words = message.content.split(' ');
  let line = '';
  let lineY = textY;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, textX, lineY);
      line = words[i] + ' ';
      lineY += 30;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, textX, lineY);
}

function drawPersonaInfo(
  ctx: CanvasRenderingContext2D,
  persona: Persona,
  dimensions: { width: number; height: number }
) {
  const padding = 40;
  const x = padding;
  const y = 60;

  // Persona name
  ctx.fillStyle = '#d946ef';
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(persona.name, x, y);

  // Archetype
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Inter, sans-serif';
  ctx.fillText(persona.archetype, x, y + 40);
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

