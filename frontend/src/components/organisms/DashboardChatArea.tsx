'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { chatApi } from '@/lib/api/chat';
import { personaApi } from '@/lib/api/persona';
import { toast } from '@/lib/toast';
import { Button } from '@/components/atoms/Button';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { StageBadge, type SurveyStage } from '@/components/molecules/StageBadge';
import { TypingIndicator } from '@/components/molecules/TypingIndicator';
import { useReducedMotion } from '@/hooks/useAccessibility';
import { slideIn } from '@/lib/animations';

interface Message {
    id: string;
    type: 'user' | 'persona';
    content: string;
    timestamp: string;
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

export function DashboardChatArea() {
    const router = useRouter();
    const reducedMotion = useReducedMotion();
    const messagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'seed-1',
            type: 'persona',
            content: 'Ceremony is idle. Collect 3 more responses or enter Alchemic Mode to boost resonance.',
            timestamp: new Date().toISOString(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [surveyStage, setSurveyStage] = useState<SurveyStage>('COLLECTING');
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [activePersonaName, setActivePersonaName] = useState<string>('Digital Mirror');

    const { data: sessions = [] } = useQuery({
        queryKey: ['chat-sessions-dashboard'],
        queryFn: () => chatApi.getSessions(),
    });

    const { data: personas = [] } = useQuery({
        queryKey: ['personas-dashboard-chat'],
        queryFn: () => personaApi.list(),
    });

    const { data: history, isLoading: isHistoryLoading } = useQuery({
        queryKey: ['chat-history-dashboard', activeSessionId],
        queryFn: () => chatApi.getHistory(activeSessionId as string),
        enabled: !!activeSessionId,
    });

    const { data: bondLevel } = useQuery({
        queryKey: ['bond-level-dashboard', sessions[0]?.personaId],
        queryFn: () => chatApi.getBondLevel(sessions[0].personaId),
        enabled: sessions.length > 0,
    });

    useEffect(() => {
        if (sessions.length > 0 && !activeSessionId) {
            setActiveSessionId(sessions[0].id);
            setActivePersonaName(sessions[0].personaName);
            setSurveyStage('READY');
            return;
        }

        if (sessions.length === 0) {
            setSurveyStage('COLLECTING');
        }
    }, [sessions, activeSessionId]);

    useEffect(() => {
        if (!history) return;
        if (history.messages.length === 0) {
            setMessages([
                {
                    id: 'history-empty',
                    type: 'persona',
                    content: '첫 메시지를 보내 Digital Mirror와 대화를 시작해보세요.',
                    timestamp: new Date().toISOString(),
                },
            ]);
            return;
        }

        setMessages(
            history.messages.map((m) => ({
                id: m.id,
                type: m.sender === 'USER' ? 'user' : 'persona',
                content: m.content,
                timestamp: m.createdAt,
            })),
        );
    }, [history]);

    useEffect(() => {
        if (!messagesRef.current || reducedMotion) return;
        const lastMessage = messagesRef.current.lastElementChild as HTMLElement;
        if (lastMessage) {
            slideIn(lastMessage, 'up');
        }
    }, [messages, reducedMotion]);

    const handleSend = async () => {
        const content = inputValue.trim();
        if (!content || isSending || isHistoryLoading) return;

        setInputValue('');
        setIsSending(true);

        const optimisticUserMessage: Message = {
            id: `tmp-user-${Date.now()}`,
            type: 'user',
            content,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, optimisticUserMessage]);

        try {
            let sessionId = activeSessionId;

            if (!sessionId) {
                if (personas.length === 0) {
                    toast.warning('먼저 Persona를 생성한 뒤 대화를 시작할 수 있어요.');
                    setMessages((prev) => prev.filter((m) => m.id !== optimisticUserMessage.id));
                    return;
                }

                const newSession = await chatApi.startSession(personas[0].id);
                sessionId = newSession.id;
                setActiveSessionId(newSession.id);
                setActivePersonaName(newSession.personaName);
                setSurveyStage('READY');
            }

            const response = await chatApi.sendMessage(sessionId, content);

            const aiMessage: Message = {
                id: response.aiMessage.id,
                type: 'persona',
                content: response.aiMessage.content,
                timestamp: response.aiMessage.createdAt,
            };

            setMessages((prev) => [
                ...prev.filter((m) => m.id !== optimisticUserMessage.id),
                {
                    id: response.userMessage.id,
                    type: 'user',
                    content: response.userMessage.content,
                    timestamp: response.userMessage.createdAt,
                },
                aiMessage,
            ]);
        } catch {
            setMessages((prev) => prev.filter((m) => m.id !== optimisticUserMessage.id));
            toast.error('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSending(false);
        }
    };

    const surveyProgress = Math.min(100, Math.max(24, sessions.length * 20));

    return (
        <section className="flex flex-1 flex-col gap-6 p-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.1em] text-text-muted">dashboard ritual state</p>
                    <div className="flex items-center gap-4">
                        <h2 className="m-0 text-xl font-semibold text-text-primary">Summoning pipeline overview</h2>
                        <StageBadge stage={surveyStage} />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ProgressBar value={surveyProgress} label="Survey completion" accent />
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => (activeSessionId ? router.push(`/chat/${activeSessionId}`) : router.push('/summon'))}
                    >
                        {activeSessionId ? 'Open Full Chat' : surveyStage === 'READY' ? 'Begin Synthesis' : 'Enter Summoning Page'}
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.label} href={action.href} className="flex items-start gap-4 rounded-lg border border-slate-700/25 bg-surface p-4 no-underline transition-transform duration-200 hover:-translate-y-0.5">
                        <span className="text-2xl">{action.icon}</span>
                        <div>
                            <p className="m-0 text-base font-medium text-text-primary">{action.label}</p>
                            <p className="m-0 text-sm text-text-muted">{action.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
                <div ref={messagesRef} className="flex flex-col gap-4 overflow-y-auto rounded-lg border border-slate-700/25 bg-surface p-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={clsx(
                                'max-w-[80%] rounded-lg p-4',
                                message.type === 'user'
                                    ? 'self-end bg-primary text-text-primary'
                                    : 'self-start border border-slate-700/25 bg-surface-elevated'
                            )}
                        >
                            <div className="text-base leading-relaxed">{message.content}</div>
                            <time className="mt-1 block text-xs text-text-muted">{new Date(message.timestamp).toLocaleTimeString()}</time>
                        </div>
                    ))}
                    {isSending && (
                        <div className="max-w-[80%] self-start rounded-lg border border-slate-700/25 bg-surface-elevated p-4">
                            <TypingIndicator />
                        </div>
                    )}
                </div>

                <aside className="flex flex-col gap-4">
                    <p className="mb-1 text-sm font-medium text-text-secondary">Persona Pulse</p>
                    <div className="rounded-lg border border-slate-700/25 bg-surface p-4">
                        <p>{activePersonaName} Bonding Meter</p>
                        <ProgressBar value={bondLevel?.progress ?? 0} showValue />
                        <p className="mt-2 text-sm text-text-muted">
                            {bondLevel ? `현재 Bond Level ${bondLevel.level}` : 'Persona와 대화하면 Bond Level이 올라갑니다.'}
                        </p>
                    </div>
                    <div className="rounded-lg border border-slate-700/25 bg-surface p-4">
                        <p>Ritual Timeline</p>
                        <ul>
                            <li>Survey Constellation · Completed</li>
                            <li>Alchemic Mode · In progress</li>
                            <li>Reveal · Pending</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <div className="flex flex-wrap gap-2">
                {PROMPTS.map((prompt) => (
                    <button
                        key={prompt}
                        className="cursor-pointer rounded-full border border-slate-700/25 bg-surface-elevated px-4 py-2 text-sm text-text-secondary"
                        onClick={() => setInputValue(prompt)}
                    >
                        {prompt}
                    </button>
                ))}
            </div>

            <div className="flex gap-4 rounded-lg border border-slate-700/25 bg-surface p-4">
                <input
                    type="text"
                    className="flex-1 rounded-md border border-slate-700/25 bg-background-dark px-4 py-3 text-base text-text-primary outline-none"
                    placeholder="Ask your persona..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isSending}
                />
                <Button onClick={handleSend} disabled={isSending || isHistoryLoading}>
                    {isSending ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </section>
    );
}
