'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ChatMessage as ChatMessageType } from '@/lib/api/chat';
import { Persona } from '@/lib/api/persona';
import { ReactionButton } from '@/components/molecules/ReactionButton';
import { ShareableSnippet } from '@/components/molecules/ShareableSnippet';
import clsx from 'clsx';

interface ChatMessageProps {
    message: ChatMessageType;
    persona?: Persona | null;
    bondLevel?: number;
    onReact?: (messageId: string, emoji: string) => void;
    onShare?: (blob: Blob) => void;
    reactions?: Record<string, number>;
}

function getDepthClass(bondLevel: number): string {
    const depth = Math.min(Math.max(bondLevel, 0), 5);

    if (depth <= 0) return '';
    if (depth === 1) return 'border-l-2 border-primary';
    if (depth === 2) return 'border-l-[3px] border-accent';
    if (depth === 3) return 'border-l-[3px] border-highlight';
    if (depth === 4) return 'border-l-4 border-accent shadow-[0_0_10px_rgba(0,201,167,0.18)]';

    return 'border-l-4 border-highlight shadow-[0_0_15px_rgba(193,151,255,0.28)]';
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
    const depthClass = getDepthClass(bondLevel);

    useEffect(() => {
        if (reducedMotion || !messageRef.current) return;
        connectionInteractions.messageEnter(messageRef.current, isUser ? 'user' : 'ai');
    }, [reducedMotion, isUser]);

    return (
        <div
            ref={messageRef}
            className={clsx('mb-4 flex', isUser ? 'justify-end' : 'justify-start')}
        >
            <div
                className={clsx(
                    'max-w-[70%] rounded-xl px-6 py-4',
                    isUser
                        ? 'rounded-br-xs bg-primary text-text-primary'
                        : 'rounded-bl-xs border border-slate-600/35 bg-surface text-text-primary',
                    !isUser && depthClass
                )}
            >
                <div className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</div>

                <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="text-xs text-text-muted">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div className="flex items-center gap-2">
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
