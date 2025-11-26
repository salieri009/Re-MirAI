'use client';

import { use, useState, useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { chatApi } from '@/lib/api/chat';
import { personaApi } from '@/lib/api/persona';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { BondLevelIndicator } from '@/components/molecules/BondLevelIndicator';
import { ChatMessage } from '@/components/organisms/ChatMessage';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { TopicSuggestion } from '@/components/molecules/TopicSuggestion';
import { ChatMessage as ChatMessageType } from '@/lib/mock-data/chat';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useAnnouncement, useReducedMotion } from '@/hooks/useAccessibility';
import styles from './page.module.css';

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [shareBlob, setShareBlob] = useState<Blob | null>(null);
  const [sharePreviewUrl, setSharePreviewUrl] = useState<string | null>(null);
  const [sharePanelOpen, setSharePanelOpen] = useState(false);
  const [messageReactions, setMessageReactions] = useState<Record<string, Record<string, number>>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const topicSuggestionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const announce = useAnnouncement();

  const { data: history } = useQuery({
    queryKey: ['chat-history', id],
    queryFn: () => chatApi.getHistory(id)
  });

  const { data: persona } = useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaApi.get(id),
    enabled: !!id
  });

  useEffect(() => {
    if (history?.messages) {
      setMessages(history.messages);
    }
  }, [history]);

  useEffect(() => {
    return () => {
      if (sharePreviewUrl) {
        URL.revokeObjectURL(sharePreviewUrl);
      }
    };
  }, [sharePreviewUrl]);

  const topicSuggestions = useMemo(() => {
    const base = [
      'Share a perception from my survey responses.',
      'Give me a daily mantra.',
      'Help me understand my strongest trait.',
      'Tell me how others describe me.',
    ];
    if (persona?.archetype) {
      base.unshift(`What would a ${persona.archetype} do today?`);
    }
    return base;
  }, [persona]);

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      content: message,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsSending(true);

    try {
      const aiResponse = await chatApi.sendMessage(id, message);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleShare = (blob: Blob) => {
    if (sharePreviewUrl) {
      URL.revokeObjectURL(sharePreviewUrl);
    }
    const previewUrl = URL.createObjectURL(blob);
    setShareBlob(blob);
    setSharePreviewUrl(previewUrl);
    setSharePanelOpen(true);
  };

  const closeSharePanel = () => {
    if (sharePreviewUrl) {
      URL.revokeObjectURL(sharePreviewUrl);
    }
    setSharePreviewUrl(null);
    setShareBlob(null);
    setSharePanelOpen(false);
  };

  const downloadBlob = (objectUrl: string) => {
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = 'remirai-snippet.png';
    anchor.click();
  };

  const handleShareToPlatform = (platform: string) => {
    if (!shareBlob) return;
    const objectUrl = URL.createObjectURL(shareBlob);
    const shareCaptions: Record<string, string> = {
      instagram: 'Sharing my Re:MirAI reflection. Upload the saved image with this caption!',
      twitter: 'Discovering my AI reflection with #ReMirAI',
      tiktok: 'My Re:MirAI persona just said this 👇',
      whatsapp: 'Help me decode myself via Re:MirAI!',
      copy: `${window.location.origin}/chat/${id}`,
      download: '',
    };

    if (platform === 'download') {
      downloadBlob(objectUrl);
    } else {
      downloadBlob(objectUrl);
      const caption = shareCaptions[platform] || shareCaptions.copy;
      navigator.clipboard.writeText(caption);
      alert(`Caption copied! Upload the downloaded snippet to ${platform}.`);
    }

    URL.revokeObjectURL(objectUrl);
    closeSharePanel();
  };

  const handleTopicSelect = (topic: string) => {
    setMessage(topic);
    setRecentTopics((prev) => [topic, ...prev.filter((t) => t !== topic)].slice(0, 3));
    inputRef.current?.focus();
  };

  const handleReact = async (messageId: string, emoji: string) => {
    // Update local state immediately
    setMessageReactions((prev) => {
      const current = prev[messageId] ?? {};
      return {
        ...prev,
        [messageId]: {
          ...current,
          [emoji]: (current[emoji] ?? 0) + 1,
        },
      };
    });
    
    // Send reaction to backend
    try {
      await chatApi.react(id, messageId, emoji);
      announce(`Reaction ${emoji} sent`, 'polite');
    } catch (error) {
      console.error('Failed to send reaction:', error);
      // Revert on error
      setMessageReactions((prev) => {
        const current = prev[messageId] ?? {};
        return {
          ...prev,
          [messageId]: {
            ...current,
            [emoji]: Math.max(0, (current[emoji] ?? 1) - 1),
          },
        };
      });
    }
  };
  
  // Apply topic glow animation when user is idle
  useEffect(() => {
    if (!reducedMotion && topicSuggestionRef.current && !isSending && messages.length > 0) {
      const timeout = setTimeout(() => {
        connectionInteractions.topicGlow(topicSuggestionRef.current!);
      }, 5000); // After 5 seconds of inactivity
      
      return () => clearTimeout(timeout);
    }
  }, [reducedMotion, isSending, messages.length]);
  
  // Announce new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        announce(`New message from ${persona?.name || 'your persona'}`, 'polite');
      }
    }
  }, [messages, persona, announce]);

  const connectionStatus = isSending ? 'typing…' : 'online';

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.personaInfo}>
            <p className={styles.personaName}>{persona?.name ?? 'Your Persona'}</p>
            <div className={styles.statusRow}>
              <span
                className={`${styles.statusDot} ${isSending ? styles.statusTyping : styles.statusOnline}`}
              />
              <span className={styles.statusText}>{connectionStatus}</span>
            </div>
          </div>
          <BondLevelIndicator level={3} progress={65} />
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (persona) {
                router.push(`/p/${persona.id}`);
              }
            }}
            disabled={!persona}
          >
            View Persona Room
          </Button>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            persona={persona}
            bondLevel={3} // Mock level for now
            onReact={handleReact}
            onShare={handleShare}
            reactions={messageReactions[msg.id]}
          />
        ))}
        {isSending && (
          <div className={styles.typingContainer}>
            <TypingIndicator
              personaName={persona?.name || 'AI'}
              estimatedTime={3}
            />
          </div>
        )}
      </div>

      <div className={styles.suggestions} ref={topicSuggestionRef}>
        <TopicSuggestion
          topics={topicSuggestions}
          recentTopics={recentTopics}
          onSelect={handleTopicSelect}
        />
      </div>

      <div className={styles.inputArea}>
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className={styles.input}
          maxLength={1000}
        />
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          aria-label="Send message"
        >
          Send
        </Button>
      </div>

      {sharePanelOpen && sharePreviewUrl && (
        <div className={styles.shareSheet} role="dialog" aria-modal="true">
          <div className={styles.shareCard}>
            <img src={sharePreviewUrl} alt="Share preview" className={styles.sharePreview} />
            <ShareOptions
              platforms={['download', 'instagram', 'twitter', 'tiktok', 'whatsapp']}
              onShare={handleShareToPlatform}
            />
            <Button variant="ghost" onClick={closeSharePanel}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


