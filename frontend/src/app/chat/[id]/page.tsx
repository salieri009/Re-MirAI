'use client';

import { use, useState, useEffect, useRef, useMemo, CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { chatApi } from '@/lib/api/chat';
import { personaApi } from '@/lib/api/persona';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { BondLevelIndicator } from '@/components/molecules/BondLevelIndicator';
import { ChatMessage } from '@/components/organisms/ChatMessage';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { TopicSuggestion } from '@/components/molecules/TopicSuggestion';
import { NavigationSidebar } from '@/components/organisms/NavigationSidebar';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { slideIn } from '@/lib/animations';
import { moderateContent, type ModerationResult } from '@/lib/moderation';
import { ChatMessage as ChatMessageType } from '@/lib/api/chat';

// Styles
const pageStyles = {
  chat: {
    display: 'flex',
    height: '100vh',
    background: 'var(--color-bg-dark)',
    position: 'relative',
  } as CSSProperties,
  chatMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1024px',
    margin: '0 auto',
    marginLeft: '256px',
    background: 'var(--color-bg-dark)',
    position: 'relative',
  } as CSSProperties,
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-md) var(--space-lg)',
    background: 'rgba(10, 1, 18, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 'var(--z-primary)',
  } as CSSProperties,
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-lg)',
  } as CSSProperties,
  personaInfo: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  personaName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--font-weight-bold)',
    fontSize: 'var(--font-size-lg)',
    margin: 0,
  } as CSSProperties,
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
  } as CSSProperties,
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--color-text-secondary)',
  } as CSSProperties,
  statusOnline: {
    background: 'var(--color-accent)',
    boxShadow: '0 0 8px hsla(var(--hue-accent), 100%, 50%, 0.4)',
  } as CSSProperties,
  statusTyping: {
    background: 'var(--color-primary)',
    animation: 'pulse 1s infinite',
  } as CSSProperties,
  statusText: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-secondary)',
    textTransform: 'capitalize',
  } as CSSProperties,
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    scrollBehavior: 'smooth',
  } as CSSProperties,
  typingContainer: {
    alignSelf: 'flex-start',
    marginLeft: 'var(--space-md)',
    marginBottom: 'var(--space-md)',
  } as CSSProperties,
  suggestions: {
    padding: 'var(--space-sm) var(--space-lg)',
    background: 'linear-gradient(to top, var(--color-bg-dark) 80%, transparent)',
  } as CSSProperties,
  inputArea: {
    padding: 'var(--space-md) var(--space-lg)',
    background: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-sm)',
    alignItems: 'flex-end',
  } as CSSProperties,
  moderationWarning: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    background: 'rgba(251, 191, 36, 0.15)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: 'var(--radius-lg)',
    marginBottom: 'var(--space-sm)',
  } as CSSProperties,
  moderationP: {
    flex: 1,
    margin: 0,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-primary)',
  } as CSSProperties,
  warningIcon: {
    fontSize: '1.25rem',
  } as CSSProperties,
  dismissWarning: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-secondary)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
    transition: 'color 0.2s ease',
  } as CSSProperties,
  input: {
    flex: 1,
    minHeight: '44px',
  } as CSSProperties,
  shareSheet: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-overlay)',
    backdropFilter: 'blur(4px)',
  } as CSSProperties,
  shareCard: {
    background: 'var(--color-surface)',
    padding: 'var(--space-lg)',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    maxWidth: '90vw',
    width: '400px',
    boxShadow: 'var(--shadow-2xl)',
  } as CSSProperties,
  sharePreview: {
    width: '100%',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
  } as CSSProperties,
  personaSidebar: {
    width: '320px',
    height: '100vh',
    padding: 'var(--space-2xl) var(--space-xl)',
    background: 'rgba(10, 1, 18, 0.8)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2xl)',
  } as CSSProperties,
  personaHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    textAlign: 'center',
  } as CSSProperties,
  personaAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 0 24px hsla(var(--hue-primary), 100%, 50%, 0.3)',
  } as CSSProperties,
  avatarPlaceholder: {
    fontSize: '2rem',
    fontWeight: 'var(--font-weight-bold)',
    color: 'white',
  } as CSSProperties,
  sidebarPersonaName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 'var(--font-weight-bold)',
    margin: 0,
  } as CSSProperties,
  personaArchetype: {
    color: 'var(--color-text-secondary)',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  } as CSSProperties,
  personaTraits: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  } as CSSProperties,
  traitsLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
  } as CSSProperties,
  traitsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-xs)',
  } as CSSProperties,
  traitPill: {
    padding: 'var(--space-xs) var(--space-sm)',
    borderRadius: 'var(--radius-pill)',
    background: 'hsla(var(--hue-highlight), 100%, 50%, 0.15)',
    color: 'var(--color-highlight)',
    border: '1px solid hsla(var(--hue-highlight), 100%, 50%, 0.3)',
    fontSize: '0.75rem',
    fontWeight: 'var(--font-weight-medium)',
  } as CSSProperties,
  personaStats: {
    padding: 'var(--space-lg)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(255, 255, 255, 0.02)',
  } as CSSProperties,
  ritualLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  } as CSSProperties,
  linksLabel: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-xs)',
  } as CSSProperties,
};

// CSS for pulse animation
const pulseKeyframes = `
@keyframes pulse {
    0% {
        opacity: 0.5;
        transform: scale(0.9);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
    100% {
        opacity: 0.5;
        transform: scale(0.9);
    }
}
`;

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
  const [moderationWarning, setModerationWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { data: history } = useQuery({
    queryKey: ['chat-history', id],
    queryFn: () => chatApi.getHistory(id),
  });

  const { data: persona } = useQuery({
    queryKey: ['persona', id],
    queryFn: () => personaApi.get(id),
    enabled: !!id,
  });

  // FR-003.4: Dynamic Bond Level
  const { data: bondData } = useQuery({
    queryKey: ['bond-level', id],
    queryFn: () => chatApi.getBondLevel(id),
    enabled: !!id,
    refetchInterval: 30000, // Refresh every 30s
  });

  // Extract bond level with fallback
  const bondLevel = bondData?.level ?? 1;
  const bondProgress = bondData?.progress ?? 0;

  useEffect(() => {
    if (history?.messages) {
      setMessages(history.messages);
    }
  }, [history]);

  // Animate new messages
  useEffect(() => {
    if (!messagesRef.current || reducedMotion) return;

    const lastMessage = messagesRef.current.lastElementChild as HTMLElement;
    if (lastMessage) {
      slideIn(lastMessage, 'up');
    }
  }, [messages, reducedMotion]);

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

    // FR-003.5: Content Moderation
    const moderation = moderateContent(message);

    if (!moderation.isAllowed) {
      setModerationWarning(moderation.message);
      return;
    }

    if (moderation.showWarning && moderation.message) {
      // Show warning but allow sending
      setModerationWarning(moderation.message);
      // Clear warning after 5 seconds
      setTimeout(() => setModerationWarning(null), 5000);
    } else {
      setModerationWarning(null);
    }

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      content: message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsSending(true);

    try {
      const response = await chatApi.sendMessage(id, message);
      setMessages((prev) => [...prev, response.aiMessage]);
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

  const handleReact = (messageId: string, emoji: string) => {
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
  };

  const connectionStatus = isSending ? 'typing…' : 'online';

  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={pageStyles.chat}>
        {/* Left Navigation Sidebar */}
        <NavigationSidebar currentPath="/chat" />

        <div style={pageStyles.chatMain}>
          <div style={pageStyles.chatHeader}>
            <div style={pageStyles.headerInfo}>
              <div style={pageStyles.personaInfo}>
                <p style={pageStyles.personaName}>{persona?.name ?? 'Your Persona'}</p>
                <div style={pageStyles.statusRow}>
                  <span
                    style={{
                      ...pageStyles.statusDot,
                      ...(isSending ? pageStyles.statusTyping : pageStyles.statusOnline),
                    }}
                  />
                  <span style={pageStyles.statusText}>{connectionStatus}</span>
                </div>
              </div>
              <BondLevelIndicator level={bondLevel} progress={bondProgress} />
            </div>
            <div>
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

          <div ref={messagesRef} style={pageStyles.messages}>
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
              <div style={pageStyles.typingContainer}>
                <TypingIndicator personaName={persona?.name || 'AI'} estimatedTime={3} />
              </div>
            )}
          </div>

          <div style={pageStyles.suggestions}>
            <TopicSuggestion
              topics={topicSuggestions}
              recentTopics={recentTopics}
              onSelect={handleTopicSelect}
            />
          </div>

          <div style={pageStyles.inputArea}>
            {/* FR-003.5: Moderation Warning Display */}
            {moderationWarning && (
              <div style={pageStyles.moderationWarning} role="alert">
                <span style={pageStyles.warningIcon}>⚠️</span>
                <p style={pageStyles.moderationP}>{moderationWarning}</p>
                <button
                  onClick={() => setModerationWarning(null)}
                  style={pageStyles.dismissWarning}
                  aria-label="Dismiss warning"
                >
                  ×
                </button>
              </div>
            )}
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
              style={pageStyles.input}
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
        </div>

        {/* Right Persona Context Sidebar */}
        {persona && (
          <aside style={pageStyles.personaSidebar}>
            <div style={pageStyles.personaHeader}>
              <div style={pageStyles.personaAvatar}>
                {persona.avatar ? (
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={pageStyles.avatarPlaceholder}>
                    {persona.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 style={pageStyles.sidebarPersonaName}>{persona.name}</h3>
              <p style={pageStyles.personaArchetype}>{persona.archetype}</p>
            </div>

            <div style={pageStyles.personaTraits}>
              <p style={pageStyles.traitsLabel}>Essence Traits</p>
              <div style={pageStyles.traitsGrid}>
                {persona.traits?.slice(0, 6).map((trait, idx) => (
                  <span key={idx} style={pageStyles.traitPill}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div style={pageStyles.personaStats}>
              <BondLevelIndicator level={bondLevel} progress={bondProgress} />
            </div>

            <div style={pageStyles.ritualLinks}>
              <p style={pageStyles.linksLabel}>Related Rituals</p>
              <Button variant="ghost" size="sm" onClick={() => router.push(`/p/${persona.id}`)}>
                Visit Persona Room
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/ritual')}>
                View Survey Hub
              </Button>
            </div>
          </aside>
        )}

        {sharePanelOpen && sharePreviewUrl && (
          <div style={pageStyles.shareSheet} role="dialog" aria-modal="true">
            <div style={pageStyles.shareCard}>
              <img src={sharePreviewUrl} alt="Share preview" style={pageStyles.sharePreview} />
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
    </>
  );
}
