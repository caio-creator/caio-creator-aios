import { StatusBadge } from './StatusBadge';
import styles from './ProjectCard.module.css';

export interface ClientData {
  slug: string;
  status: string;
  phase: string;
  completion: number;
  priority: string;
  next_action: string;
  stack?: string;
  local_url?: string;
}

export function ProjectCard({ client }: { client: ClientData }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{client.slug}</span>
        <StatusBadge status={client.status} />
      </div>
      <p className={styles.phase}>{client.phase}</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${client.completion}%` }} />
      </div>
      <div className={styles.footer}>
        <span className={styles.completion}>{client.completion}%</span>
        <span className={styles.next}>{client.next_action}</span>
      </div>
    </div>
  );
}
