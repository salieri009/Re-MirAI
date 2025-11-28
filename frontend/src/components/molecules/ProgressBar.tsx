import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  accent?: boolean;
  ariaLabel?: string;
  className?: string;
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  accent = false,
  ariaLabel,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label ? (
        <div className={styles.header}>
          <span>{label}</span>
          {showValue ? <span>{clamped}%</span> : null}
        </div>
      ) : null}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={ariaLabel ?? label}
      >
        <div
          className={`${styles.fill} ${accent ? styles.fillAccent : ''}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
