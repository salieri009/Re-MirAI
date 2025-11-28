'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ChatMessage as ChatMessageType } from '@/lib/mock-data/chat';
import { Persona } from '@/lib/mock-data/personas';
import { ReactionButton } from '@/components/molecules/ReactionButton';
import { ShareableSnippet } from '@/components/molecules/ShareableSnippet';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
    message: ChatMessageType;
    persona?: Persona | null;
    bondLevel?: number;
    onReact?: (messageId: string, emoji: string) => void;
    onShare?: (blob: Blob) => void;
    reactions?: Record<string, number>;
}

export function ChatMessage({
    message,
    persona,
    bondLevel = 1,
    onReact,
    onShare,
    reactions,
}: ChatMessageProps) {
    const messageRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const isUser = message.sender === 'USER';

    useEffect(() => {
        if (reducedMotion || !messageRef.current) return;
        connectionInteractions.messageEnter(messageRef.current, isUser ? 'user' : 'ai');
    }, [reducedMotion, isUser]);

    const depthClass = !isUser ? styles[`depth${Math.min(bondLevel, 5)}`] : '';

    return (
        <div
            ref={messageRef}
            className={`${styles.messageRow} ${isUser ? styles.user : styles.ai}`}
        >
            <div className={`${styles.bubble} ${depthClass}`}>
                <div className={styles.content}>{message.content}</div>

                <div className={styles.footer}>
                    <span className={styles.timestamp}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div className={styles.actions}>
                        {onReact && (
                            <ReactionButton
                                messageId={message.id}
                                reactions={reactions}
                                onReact={onReact}
                            />
                        )}

                        {!isUser && persona && onShare && (
                            <ShareableSnippet
                                message={{ ...message, sender: 'PERSONA' }}
                                persona={persona}
                                onShare={onShare}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
