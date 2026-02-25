import { useEffect, useState } from 'react';
import { api, Client } from '../lib/api';
import { ProjectCard } from '../components/ProjectCard';
import { StatusBadge } from '../components/StatusBadge';
import styles from './ClientsPage.module.css';

const STATUS_FILTERS = ['Todos', 'active', 'pending', 'delivered', 'completed'];

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.clients().then(setClients).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'Todos' ? clients : clients.filter(c => c.status === filter);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Clientes</h1>

      <div className={styles.filters}>
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            className={`${styles.filter} ${filter === s ? styles.active : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'Todos' ? s : <StatusBadge status={s} />}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(client => (
          <ProjectCard key={client.slug} client={client} />
        ))}
      </div>
    </div>
  );
}
