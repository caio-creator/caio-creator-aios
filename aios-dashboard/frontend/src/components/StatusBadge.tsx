import styles from './StatusBadge.module.css';

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/\s/g, '');
  const LABEL_MAP: Record<string, string> = {
    active: 'Ativo', 'in-progress': 'Em Progresso', pending: 'Pendente',
    delivered: 'Entregue', completed: 'Concluído', done: 'Done',
    draft: 'Draft', ready: 'Ready', inprogress: 'InProgress',
    inreview: 'InReview',
  };
  return (
    <span className={`${styles.badge} ${styles[key] ?? styles.pending}`}>
      {LABEL_MAP[key] ?? status}
    </span>
  );
}
