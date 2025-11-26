'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './DashboardChatArea.module.css';

interface Message {
    id: string;
    type: 'user' | 'system' | 'persona';
    content: string;
    timestamp: Date;
}

export function DashboardChatArea() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'system',
            content: 'Welcome to your Digital Persona dashboard! Start a ritual or check your persona sync.',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
    };

    return (
        <div className={styles.chatArea}>
            {/* Quick Actions Card */}
            <div className={styles.quickActions}>
                <h2 className={styles.quickActionsTitle}>Quick Actions</h2>
                <div className={styles.actionsGrid}>
                    <Link href="/dashboard/create-survey" className={styles.actionCard}>
                        <div className={styles.actionIcon}>+</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Create New Survey</h3>
                            <p className={styles.actionDescription}>
                                Generate a new survey link to collect echoes
                            </p>
                        </div>
                    </Link>
                    <Link href="/dashboard/ritual" className={styles.actionCard}>
                        <div className={styles.actionIcon}>#</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Daily Ritual</h3>
                            <p className={styles.actionDescription}>
                                Complete your daily tasks
                            </p>
                        </div>
                    </Link>
                    <Link href="/dashboard/synthesize" className={styles.actionCard}>
                        <div className={styles.actionIcon}>*</div>
                        <div className={styles.actionContent}>
                            <h3 className={styles.actionTitle}>Persona Sync</h3>
                            <p className={styles.actionDescription}>
                                Synthesize your digital persona
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={styles.messagesContainer}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${styles[message.type]}`}
                    >
                        <div className={styles.messageContent}>{message.content}</div>
                        <div className={styles.messageTime}>
                            {message.timestamp.toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Message your persona..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    );
}
