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
import styles from './DashboardChatArea.module.css';

interface Message {
    id: string;
    type: 'user' | 'persona';
    content: string;
    timestamp: Date;
}

const QUICK_ACTIONS = [
    {
        href: '/dashboard/synthesize',
        label: 'Resume Summoning',
        description: 'Continue the ver2 three-stage ritual.',
        icon: '✨',
    },
    {
        href: '/dashboard/create-survey',
        label: 'Launch Survey Hub',
        description: 'Collect the 12 echoes required for synthesis.',
        icon: '📋',
    },
    {
        href: '/p/demo',
        label: 'Visit Persona Room',
        description: 'Review quests & bonding meter.',
        icon: '🪞',
    },
];

const PROMPTS = [
    'What archetype should I try next?',
    'Summarize today’s ritual insights.',
    'How many surveys remain?',
];

export function DashboardChatArea() {
    const router = useRouter();
    const reducedMotion = useReducedMotion();
    const messagesRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'persona',
            content: 'Ceremony is idle. Collect 3 more responses or enter Alchemic Mode to boost resonance.',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [surveyStage, setSurveyStage] = useState<SurveyStage>('COLLECTING');

    // Animate new messages
    useEffect(() => {
        if (!messagesRef.current || reducedMotion) return;

        const lastMessage = messagesRef.current.lastElementChild as HTMLElement;
        if (lastMessage) {
            slideIn(lastMessage, 'up');
        }
    }, [messages, reducedMotion]);

    const handleSend = () => {
        if (!inputValue.trim() || isTyping) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI typing
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'persona',
                content: 'I understand. Let me reflect on that...',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <section className={styles.chatArea}>
            <header className={styles.statusHeader}>
                <div>
                    <p className={styles.kicker}>dashboard ritual state</p>
                    <div className={styles.headerTitleRow}>
                        <h2>Summoning pipeline overview</h2>
                        <StageBadge stage={surveyStage} />
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <ProgressBar value={72} label="Survey completion" accent />
                    <Button size="sm" variant="secondary" onClick={() => router.push('/summon')}>
                        {surveyStage === 'READY' ? 'Begin Synthesis' : 'Enter Summoning Page'}
                    </Button>
                </div>
            </header>

            <div className={styles.quickActions}>
                {QUICK_ACTIONS.map((action) => (
                    <Link key={action.label} href={action.href} className={styles.actionCard}>
                        <span className={styles.actionIcon}>{action.icon}</span>
                        <div>
                            <p className={styles.actionLabel}>{action.label}</p>
                            <p className={styles.actionDescription}>{action.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.chatLayout}>
                <div ref={messagesRef} className={styles.messagesContainer}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${styles[message.type]}`}
                        >
                            <div className={styles.messageContent}>{message.content}</div>
                            <time className={styles.messageTime}>
                                {message.timestamp.toLocaleTimeString()}
                            </time>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.persona}`}>
                            <TypingIndicator />
                        </div>
                    )}
                </div>

                <aside className={styles.personaPanel}>
                    <p className={styles.panelLabel}>Persona Pulse</p>
                    <div className={styles.panelCard}>
                        <p>Bonding Meter</p>
                        <ProgressBar value={48} showValue />
                        <p className={styles.panelHint}>Complete 2 rituals to unlock next memory.</p>
                    </div>
                    <div className={styles.panelCard}>
                        <p>Ritual Timeline</p>
                        <ul>
                            <li>Survey Constellation · Completed</li>
                            <li>Alchemic Mode · In progress</li>
                            <li>Reveal · Pending</li>
                        </ul>
                    </div>
                </aside>
            </div>

            <div className={styles.suggestions}>
                {PROMPTS.map((prompt) => (
                    <button key={prompt} onClick={() => setInputValue(prompt)}>
                        {prompt}
                    </button>
                ))}
            </div>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    className={styles.input}
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
