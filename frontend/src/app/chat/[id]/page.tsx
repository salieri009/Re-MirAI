'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { chatApi } from '@/lib/api/chat';
import { personaApi } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { BondLevelIndicator } from '@/components/molecules/BondLevelIndicator';
import { ChatMessage } from '@/components/organisms/ChatMessage';
import { ShareOptions } from '@/components/molecules/ShareOptions';
import { TopicSuggestion } from '@/components/molecules/TopicSuggestion';
import { NavigationSidebar } from '@/components/organisms/NavigationSidebar';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { slideIn } from '@/lib/animations';
import { moderateContent } from '@/lib/moderation';
import { ChatMessage as ChatMessageType } from '@/lib/api/chat';

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

  const { data: bondData } = useQuery({
    queryKey: ['bond-level', id],
    queryFn: () => chatApi.getBondLevel(id),
    enabled: !!id,
    refetchInterval: 30000,
  });

  const bondLevel = bondData?.level ?? 1;
  const bondProgress = bondData?.progress ?? 0;

  useEffect(() => {
    if (history?.messages) {
      setMessages(history.messages);
    }
  }, [history]);

  useEffect(() => {
    if (!messagesRef.current || reducedMotion) return;

    const lastMessage = messagesRef.current.lastElementChild as HTMLElement | null;
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

    const moderation = moderateContent(message);

    if (!moderation.isAllowed) {
      setModerationWarning(moderation.message);
      return;
    }

    if (moderation.showWarning && moderation.message) {
      setModerationWarning(moderation.message);
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
    } catch (_error) {
      toast.error('Failed to send message. Please try again.');
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
      tiktok: 'My Re:MirAI persona just said this',
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
      toast.success(`Caption copied! Upload the downloaded snippet to ${platform}.`);
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

  const connectionStatus = isSending ? 'typing...' : 'online';

  return (
    <div className="min-h-screen bg-background-dark text-text-primary">
      <NavigationSidebar currentPath="/dashboard" />

      <div className="md:pl-64 xl:pr-[320px]">
        <main className="mx-auto flex h-screen w-full max-w-[1024px] flex-col">
          <header className="atmospheric-surface sticky top-0 z-20 mx-3 mt-3 flex items-center justify-between gap-4 rounded-xl px-4 py-3 sm:mx-5">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-display text-lg font-semibold text-slate-800">{persona?.name ?? 'Your Persona'}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${isSending ? 'animate-pulse bg-fuchsia-500' : 'bg-emerald-500'}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs uppercase tracking-[0.08em] text-slate-500">{connectionStatus}</span>
                </div>
              </div>
              <BondLevelIndicator level={bondLevel} progress={bondProgress} />
            </div>

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
          </header>

          <section ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                persona={persona}
                bondLevel={bondLevel}
                onReact={handleReact}
                onShare={handleShare}
                reactions={messageReactions[msg.id]}
              />
            ))}

            {isSending && (
              <div className="mb-3 ml-2">
                <TypingIndicator personaName={persona?.name || 'AI'} estimatedTime={3} />
              </div>
            )}
          </section>

          <div className="px-4 pb-3 sm:px-6">
            <TopicSuggestion topics={topicSuggestions} recentTopics={recentTopics} onSelect={handleTopicSelect} />
          </div>

          <section className="atmospheric-surface mx-3 mb-3 rounded-xl border border-slate-500/20 bg-white/60 px-4 py-3 sm:mx-5">
            {moderationWarning && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-400/35 bg-amber-100/40 px-3 py-2" role="alert">
                <span className="text-lg" aria-hidden="true">
                  ⚠️
                </span>
                <p className="flex-1 text-sm text-slate-700">{moderationWarning}</p>
                <button
                  type="button"
                  onClick={() => setModerationWarning(null)}
                  className="text-lg leading-none text-slate-500 transition hover:text-slate-700"
                  aria-label="Dismiss warning"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-end gap-2">
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                maxLength={1000}
                className="min-h-[44px] flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
              />
              <Button variant="primary" onClick={handleSend} disabled={!message.trim() || isSending} aria-label="Send message">
                Send
              </Button>
            </div>
          </section>
        </main>
      </div>

      {persona && (
        <aside className="fixed right-0 top-0 hidden h-screen w-[320px] overflow-y-auto border-l border-slate-600/20 bg-slate-950/45 px-6 py-7 backdrop-blur xl:block">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-[0_0_24px_rgba(217,70,239,0.35)]">
              {persona.avatar ? (
                <img src={persona.avatar} alt={persona.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white">{persona.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <h3 className="font-display text-3xl text-slate-100">{persona.name}</h3>
            <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{persona.archetype}</p>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Essence Traits</p>
            <div className="flex flex-wrap gap-2">
              {persona.traits?.slice(0, 6).map((trait, idx) => (
                <span
                  key={`${trait}-${idx}`}
                  className="rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 px-2.5 py-1 text-[11px] font-medium text-fuchsia-100"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-500/25 bg-slate-900/35 p-4">
            <BondLevelIndicator level={bondLevel} progress={bondProgress} />
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Related Rituals</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[3px]" role="dialog" aria-modal="true">
          <div className="atmospheric-surface w-full max-w-[420px] rounded-2xl p-4">
            <img src={sharePreviewUrl} alt="Share preview" className="w-full rounded-lg border border-slate-500/25" />
            <div className="mt-3">
              <ShareOptions
                platforms={['download', 'instagram', 'twitter', 'tiktok', 'whatsapp']}
                onShare={handleShareToPlatform}
              />
            </div>
            <div className="mt-2">
              <Button variant="ghost" onClick={closeSharePanel}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
