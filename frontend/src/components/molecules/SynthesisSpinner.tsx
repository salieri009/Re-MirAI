import { ReactNode } from 'react';
import styles from './SynthesisSpinner.module.css';

type SynthesisSpinnerProps = {
  size?: number;
  icon?: ReactNode;
  caption?: string;
};

export function SynthesisSpinner({
  size = 224,
  icon = '⟳',
  caption,
}: SynthesisSpinnerProps) {
  const style = {
    width: size,
    height: size,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} style={style}>
        <div className={styles.ring} />
        <div className={`${styles.ring} ${styles.ringInner}`} />
        <div className={styles.core} aria-hidden="true">
          {icon}
        </div>
      </div>

      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  );
}



