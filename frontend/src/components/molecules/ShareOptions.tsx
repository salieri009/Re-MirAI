'use client';

import { Button } from '@/components/atoms/Button';
import { colors, spacing, typography, CSSProperties } from '@/lib/styles';

interface ShareOptionsProps {
  platforms: string[];
  onShare: (platform: string) => void;
  link?: string;
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
};

const titleStyle: CSSProperties = {
  fontSize: typography.size.lg,
  fontWeight: typography.weight.semiBold,
  color: colors.text,
  margin: 0,
};

const platformsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.sm,
};

const iconStyle: CSSProperties = {
  fontSize: typography.size.xl,
};

const labelStylePlatform: CSSProperties = {
  fontSize: typography.size.sm,
};

export function ShareOptions({ platforms, onShare, link }: ShareOptionsProps) {
  const platformIcons: Record<string, string> = {
    whatsapp: '💬',
    instagram: '📷',
    twitter: '🐦',
    facebook: '👥',
    copy: '📋',
    download: '⬇️',
    tiktok: '🎵',
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy' && link) {
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    } else {
      onShare(platform);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Share to</h3>
      <div style={platformsStyle}>
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant="secondary"
            onClick={() => handleShare(platform)}
          >
            <span style={iconStyle}>{platformIcons[platform] || '🔗'}</span>
            <span style={labelStylePlatform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
