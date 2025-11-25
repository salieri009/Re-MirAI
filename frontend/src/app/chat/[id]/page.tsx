'use client';

import { use, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { chatApi } from '@/lib/api/chat';
import { personaApi } from '@/lib/api/persona';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { ShareableSnippet } from '@/components/molecules/ShareableSnippet';
import { ChatMessage } from '@/lib/mock-data/chat';
import styles from './page.module.css';

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

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

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    const userMessage: ChatMessage = {
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'remirai-snippet.png';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${styles[msg.sender.toLowerCase()]}`}
          >
            <div className={styles.content}>{msg.content}</div>
            <div className={styles.messageFooter}>
              <div className={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
              {msg.sender === 'AI' && persona && (
                <ShareableSnippet
                  message={{ ...msg, sender: 'PERSONA' as const }}
                  persona={persona}
                  onShare={handleShare}
                />
              )}
            </div>
          </div>
        ))}
        {isSending && (
          <div className={`${styles.message} ${styles.persona}`}>
            <TypingIndicator 
              personaName={persona?.name || 'AI'}
              estimatedTime={3}
            />
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <Input
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
    </div>
  );
}


