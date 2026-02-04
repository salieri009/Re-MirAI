'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { StageBadge, type SurveyStage } from '@/components/molecules/StageBadge';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { slideIn } from '@/lib/animations';
import { colors, spacing, radius, typography, shadows, mergeStyles, CSSProperties } from '@/lib/styles';

interface Message {
    id: string;
    type: 'user' | 'persona';
    content: string;
    timestamp: Date;
}

const QUICK_ACTIONS = [
    { href: '/dashboard/synthesize', label: 'Resume Summoning', description: 'Continue the ver2 three-stage ritual.', icon: '✨' },
    { href: '/dashboard/create-survey', label: 'Launch Survey Hub', description: 'Collect the 12 echoes required for synthesis.', icon: '📋' },
    { href: '/p/demo', label: 'Visit Persona Room', description: 'Review quests & bonding meter.', icon: '🪞' },
];

const PROMPTS = [
    'What archetype should I try next?',
    'Summarize today\'s ritual insights.',
    'How many surveys remain?',
];

const chatAreaStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    padding: spacing.lg,
    flex: 1,
};

const statusHeaderStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    flexWrap: 'wrap',
};

const kickerStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: spacing.xs,
};

const headerTitleRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
};

const headerTitleStyle: CSSProperties = {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semiBold,
    color: colors.text,
    margin: 0,
};

const headerActionsStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
};

const quickActionsStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.md,
};

const actionCardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
};

const actionIconStyle: CSSProperties = {
    fontSize: 24,
};

const actionLabelStyle: CSSProperties = {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: colors.text,
    margin: 0,
};

const actionDescriptionStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    margin: 0,
};

const chatLayoutStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: spacing.lg,
    flex: 1,
    minHeight: 0,
};

const messagesContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    overflowY: 'auto',
    padding: spacing.md,
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const messageBase: CSSProperties = {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: radius.lg,
};

const messageUser: CSSProperties = {
    alignSelf: 'flex-end',
    background: colors.primary,
    color: colors.text,
};

const messagePersona: CSSProperties = {
    alignSelf: 'flex-start',
    background: colors.surfaceElevated,
    border: `1px solid ${colors.border}`,
};

const messageContentStyle: CSSProperties = {
    fontSize: typography.size.base,
    lineHeight: 1.5,
};

const messageTimeStyle: CSSProperties = {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
    display: 'block',
};

const personaPanelStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
};

const panelLabelStyle: CSSProperties = {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
};

const panelCardStyle: CSSProperties = {
    padding: spacing.md,
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const panelHintStyle: CSSProperties = {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
};

const suggestionsStyle: CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
};

const suggestionBtnStyle: CSSProperties = {
    padding: `${spacing.sm}px ${spacing.md}px`,
    background: colors.surfaceElevated,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.full,
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    cursor: 'pointer',
    fontFamily: typography.fontSans,
};

const inputAreaStyle: CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    padding: spacing.md,
    background: colors.surface,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
};

const inputStyle: CSSProperties = {
    flex: 1,
    padding: spacing.md,
    background: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: typography.size.base,
    fontFamily: typography.fontSans,
    outline: 'none',
};

export function DashboardChatArea() {
    const router = useRouter();
    const reducedMotion = useReducedMotion();
    const messagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'persona', content: 'Ceremony is idle. Collect 3 more responses or enter Alchemic Mode to boost resonance.', timestamp: new Date() },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [surveyStage, setSurveyStage] = useState<SurveyStage>('COLLECTING');

    useEffect(() => {
        if (!messagesRef.current || reducedMotion) return;
        const lastMessage = messagesRef.current.lastElementChild as HTMLElement;
        if (lastMessage) {
            slideIn(lastMessage, 'up');
        }
    }, [messages, reducedMotion]);

    const handleSend = () => {
        if (!inputValue.trim() || isTyping) return;
        const newMessage: Message = { id: Date.now().toString(), type: 'user', content: inputValue, timestamp: new Date() };
        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = { id: (Date.now() + 1).toString(), type: 'persona', content: 'I understand. Let me reflect on that...', timestamp: new Date() };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <section style={chatAreaStyle}>
            <header style={statusHeaderStyle}>
                <div>
                    <p style={kickerStyle}>dashboard ritual state</p>
                    <div style={headerTitleRowStyle}>
                        <h2 style={headerTitleStyle}>Summoning pipeline overview</h2>
                        <StageBadge stage={surveyStage} />
                    </div>
                </div>
                <div style={headerActionsStyle}>
                    <ProgressBar value={72} label="Survey completion" accent />
                    <Button size="sm" variant="secondary" onClick={() => router.push('/summon')}>
                        {surveyStage === 'READY' ? 'Begin Synthesis' : 'Enter Summoning Page'}
                    </Button>
                </div>
            </header>

            <div style={quickActionsStyle}>
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.label} href={action.href} style={actionCardStyle}>
                        <span style={actionIconStyle}>{action.icon}</span>
                        <div>
                            <p style={actionLabelStyle}>{action.label}</p>
                            <p style={actionDescriptionStyle}>{action.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={chatLayoutStyle}>
                <div ref={messagesRef} style={messagesContainerStyle}>
                    {messages.map((message) => (
                        <div key={message.id} style={mergeStyles(messageBase, message.type === 'user' ? messageUser : messagePersona)}>
                            <div style={messageContentStyle}>{message.content}</div>
                            <time style={messageTimeStyle}>{message.timestamp.toLocaleTimeString()}</time>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={mergeStyles(messageBase, messagePersona)}>
                            <TypingIndicator />
                        </div>
                    )}
                </div>

                <aside style={personaPanelStyle}>
                    <p style={panelLabelStyle}>Persona Pulse</p>
                    <div style={panelCardStyle}>
                        <p>Bonding Meter</p>
                        <ProgressBar value={48} showValue />
                        <p style={panelHintStyle}>Complete 2 rituals to unlock next memory.</p>
                    </div>
                    <div style={panelCardStyle}>
                        <p>Ritual Timeline</p>
                        <ul>
                            <li>Survey Constellation · Completed</li>
                            <li>Alchemic Mode · In progress</li>
                            <li>Reveal · Pending</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <div style={suggestionsStyle}>
                {PROMPTS.map((prompt) => (
                    <button key={prompt} style={suggestionBtnStyle} onClick={() => setInputValue(prompt)}>
                        {prompt}
                    </button>
                ))}
            </div>

            <div style={inputAreaStyle}>
                <input
                    type="text"
                    style={inputStyle}
                    placeholder="Ask your persona..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend}>Send</Button>
            </div>
        </section>
    );
}
