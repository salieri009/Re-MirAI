'use client';

import { useState } from 'react';
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
