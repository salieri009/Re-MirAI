'use client';

import { useAuthStore } from '@/stores/authStore';
import styles from './DashboardRightPanel.module.css';

export function DashboardRightPanel() {
    const { user } = useAuthStore();

    return (
        <aside className={styles.rightPanel}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Persona Status</h3>
                <div className={styles.statusCard}>
                    <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>Level</span>
                        <span className={styles.statusValue}>5</span>
                    </div>
                    <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>Bond</span>
                        <span className={styles.statusValue}>75%</span>
                    </div>
                    <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>Essence</span>
                        <span className={styles.statusValue}>420</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Active Quests</h3>
                <div className={styles.questList}>
                    <div className={styles.questItem}>
                        <div className={styles.questIcon}>#</div>
                        <div className={styles.questInfo}>
                            <div className={styles.questName}>Daily Ritual</div>
                            <div className={styles.questProgress}>2/3 completed</div>
                        </div>
                    </div>
                    <div className={styles.questItem}>
                        <div className={styles.questIcon}>#</div>
                        <div className={styles.questInfo}>
                            <div className={styles.questName}>Persona Sync</div>
                            <div className={styles.questProgress}>Pending</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Quick Actions</h3>
                <div className={styles.actionButtons}>
                    <button className={styles.actionButton}>
                        Start Ritual
                    </button>
                    <button className={styles.actionButton}>
                        Sync Persona
                    </button>
                </div>
            </div>
        </aside>
    );
}
