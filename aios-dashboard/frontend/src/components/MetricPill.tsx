import styles from './MetricPill.module.css';

export function MetricPill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className={styles.pill}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
