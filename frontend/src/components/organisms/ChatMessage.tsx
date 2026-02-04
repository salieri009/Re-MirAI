'use client';

import { useEffect, useRef } from 'react';
import { connectionInteractions } from '@/lib/micro-interactions';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { ChatMessage as ChatMessageType } from '@/lib/api/chat';
import { Persona } from '@/lib/api/persona';
import { ReactionButton } from '@/components/molecules/ReactionButton';
import { ShareableSnippet } from '@/components/molecules/ShareableSnippet';
import { colors, spacing, radius, typography, mergeStyles, CSSProperties } from '@/lib/styles';

interface ChatMessageProps {
    message: ChatMessageType;
    persona?: Persona | null;
    bondLevel?: number;
    onReact?: (messageId: string, emoji: string) => void;
    onShare?: (blob: Blob) => void;
    reactions?: Record<string, number>;
}

const messageRowBase: CSSProperties = {
    display: 'flex',
    marginBottom: spacing.md,
};

const messageRowUser: CSSProperties = {
    justifyContent: 'flex-end',
};

const messageRowAi: CSSProperties = {
    justifyContent: 'flex-start',
};

const bubbleBase: CSSProperties = {
    maxWidth: '70%',
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: radius.xl,
};

const bubbleUser: CSSProperties = {
    background: colors.primary,
    color: colors.text,
    borderBottomRightRadius: radius.xs,
};

const bubbleAi: CSSProperties = {
    background: colors.surface,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderBottomLeftRadius: radius.xs,
};

// Bond level depth styles
const depthStyles: CSSProperties[] = [
    {}, // depth 0
    { borderLeftColor: colors.primary, borderLeftWidth: 2, borderLeftStyle: 'solid' },
    { borderLeftColor: colors.accent, borderLeftWidth: 3, borderLeftStyle: 'solid' },
    { borderLeftColor: colors.highlight, borderLeftWidth: 3, borderLeftStyle: 'solid' },
    { borderLeftColor: colors.accent, borderLeftWidth: 4, borderLeftStyle: 'solid', boxShadow: `0 0 10px ${colors.accent}30` },
    { borderLeftColor: colors.highlight, borderLeftWidth: 4, borderLeftStyle: 'solid', boxShadow: `0 0 15px ${colors.highlight}40` },
];

const contentStyle: CSSProperties = {
    fontSize: typography.size.base,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
};

const footerStyleMsg: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.md,
};

const timestampStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
};

const actionsStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
};

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

    const rowStyle = mergeStyles(
        messageRowBase,
        isUser ? messageRowUser : messageRowAi
    );

    const bubbleStyle = mergeStyles(
        bubbleBase,
        isUser ? bubbleUser : bubbleAi,
        !isUser && depthStyles[Math.min(bondLevel, 5)]
    );

    return (
        <div ref={messageRef} style={rowStyle}>
            <div style={bubbleStyle}>
                <div style={contentStyle}>{message.content}</div>

                <div style={footerStyleMsg}>
                    <span style={timestampStyle}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div style={actionsStyle}>
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
