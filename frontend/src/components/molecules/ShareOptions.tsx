'use client';

import { Button } from '@/components/atoms/Button';
import styles from './ShareOptions.module.css';

interface ShareOptionsProps {
  platforms: string[];
  onShare: (platform: string) => void;
  link?: string;
}

export function ShareOptions({ platforms, onShare, link }: ShareOptionsProps) {
  const platformIcons: Record<string, string> = {
    whatsapp: '💬',
    instagram: '📷',
    twitter: '🐦',
    facebook: '👥',
    copy: '📋'
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
    <div className={styles.container}>
      <h3 className={styles.title}>Share to</h3>
      <div className={styles.platforms}>
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant="secondary"
            onClick={() => handleShare(platform)}
            className={styles.platformButton}
          >
            <span className={styles.icon}>{platformIcons[platform] || '🔗'}</span>
            <span className={styles.label}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

