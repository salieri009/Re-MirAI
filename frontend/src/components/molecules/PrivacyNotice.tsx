'use client';

import styles from './PrivacyNotice.module.css';

export function PrivacyNotice() {
  return (
    <div className={styles.container} role="banner" aria-label="Privacy assurance">
      <div className={styles.badge}>
        <span className={styles.icon}>🔒</span>
        <span className={styles.text}>Your responses are 100% anonymous</span>
      </div>
      <div className={styles.message}>
        <p>Your responses are encrypted and cannot be traced back to you.</p>
        <p>We don&apos;t collect any personal information.</p>
      </div>
      <div className={styles.trustSignals}>
        <div className={styles.signal}>
          <span className={styles.signalIcon}>🛡️</span>
          <span>Encrypted</span>
        </div>
        <div className={styles.signal}>
          <span className={styles.signalIcon}>👁️‍🗨️</span>
          <span>No Tracking</span>
        </div>
        <div className={styles.signal}>
          <span className={styles.signalIcon}>🔐</span>
          <span>Secure</span>
        </div>
      </div>
    </div>
  );
}

