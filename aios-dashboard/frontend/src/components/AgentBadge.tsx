import styles from './AgentBadge.module.css';

interface AgentBadgeProps {
  icon: string;
  name: string;
  color: string;
}

export function AgentBadge({ icon, name, color }: AgentBadgeProps) {
  return (
    <div className={styles.badge} style={{ '--color': color } as React.CSSProperties}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
}
