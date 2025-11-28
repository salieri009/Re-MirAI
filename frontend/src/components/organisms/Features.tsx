'use client';

import styles from './Features.module.css';

export function Features() {
    const features = [
        {
            title: 'Privacy First',
            description: 'Only you see the echoes.'
        },
        {
            title: '1-Minute Setup',
            description: 'Link, copy, share. Done.'
        },
        {
            title: 'Guided Journey',
            description: 'Dashboard tracks the summon bar.'
        }
    ];

    return (
        <section className={styles.section} aria-labelledby="features-title">
            <h2 id="features-title" className={styles.sectionTitle}>
                Features
            </h2>

            <div className={styles.featuresGrid}>
                {features.map((feature) => (
                    <div key={feature.title} className={styles.feature}>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
