'use client';

import React from 'react';
import styles from './ProgressTracker.module.css';

type ProgressStep = 'authenticate' | 'verify' | 'welcome';

interface ProgressTrackerProps {
    currentStep: ProgressStep;
    className?: string;
}

const STEPS: { id: ProgressStep; label: string }[] = [
    { id: 'authenticate', label: 'Authenticate' },
    { id: 'verify', label: 'Verify' },
    { id: 'welcome', label: 'Welcome' },
];

export function ProgressTracker({ currentStep, className = '' }: ProgressTrackerProps) {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);

    return (
        <div className={`${styles.tracker} ${className}`} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={3}>
            <div className={styles.steps}>
                {STEPS.map((step, index) => {
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <div key={step.id} className={styles.step}>
                            <div
                                className={`${styles.circle} ${isActive ? styles.active : ''} ${isCurrent ? styles.current : ''}`}
                                aria-label={step.label}
                            >
                                {isActive && index < currentIndex ? (
                                    <svg className={styles.checkmark} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={styles.number}>{index + 1}</span>
                                )}
                            </div>
                            <span className={`${styles.label} ${isActive ? styles.active : ''}`}>{step.label}</span>
                        </div>
                    );
                })}
            </div>
            <div className={styles.line}>
                <div
                    className={styles.progress}
                    style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
}


