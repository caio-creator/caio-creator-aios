import styles from './AgentCard.module.css';

export interface AgentData {
  id: string;
  name: string;
  source: 'aios-core' | 'creative-hub';
  file: string;
}

const SOURCE_LABELS: Record<string, string> = {
  'aios-core': 'AIOS Core',
  'creative-hub': 'Creative Hub',
};

export function AgentCard({ agent }: { agent: AgentData }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{agent.name}</span>
        <span className={styles.source}>{SOURCE_LABELS[agent.source]}</span>
      </div>
      <p className={styles.id}>{agent.id}</p>
    </div>
  );
}
