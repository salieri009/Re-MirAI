'use client';

import styles from './HowItWorks.module.css';

export function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'One tap. Your ritual survey is live.'
        },
        {
            number: '2',
            title: 'Collect Echoes',
            description: 'Friends drop anonymous notes in under 2 min.'
        },
        {
            number: '3',
            title: 'Summon the Persona',
            description: 'AI weaves the echoes into an anime twin.'
        }
    ];

    return (
        <section className={styles.section} aria-labelledby="how-it-works-title">
            <h2 id="how-it-works-title" className={styles.sectionTitle}>
                How It Works
            </h2>

            <div className={styles.stepsGrid}>
                {steps.map((step) => (
                    <div key={step.number} className={styles.step}>
                        <div className={styles.stepNumber}>{step.number}</div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            {step.description && (
                                <p className={styles.stepDescription}>{step.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
