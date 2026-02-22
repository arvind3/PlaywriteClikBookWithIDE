import React from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  type: 'qa' | 'dev' | 'ai';
  children: React.ReactNode;
}

const CALLOUT_CONFIG = {
  qa: {
    label: 'For QA Engineers',
    icon: '🧪',
    className: 'callout-qa',
  },
  dev: {
    label: 'For Developers',
    icon: '💻',
    className: 'callout-dev',
  },
  ai: {
    label: 'For AI Engineers',
    icon: '🤖',
    className: 'callout-ai',
  },
};

export default function Callout({ type, children }: CalloutProps) {
  const config = CALLOUT_CONFIG[type];
  return (
    <div className={`${styles.callout} ${styles[config.className]}`}>
      <div className={styles.calloutHeader}>
        <span className={styles.calloutIcon}>{config.icon}</span>
        <span className={styles.calloutLabel}>{config.label}</span>
      </div>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  );
}
