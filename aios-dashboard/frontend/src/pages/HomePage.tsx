import { useEffect, useState } from 'react';
import { api, Client, Story, Agent } from '../lib/api';
import { MetricPill } from '../components/MetricPill';
import { ProjectCard } from '../components/ProjectCard';
import styles from './HomePage.module.css';

export function HomePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.clients(), api.stories(), api.agents()])
      .then(([c, s, a]) => { setClients(c); setStories(s); setAgents(a); })
      .finally(() => setLoading(false));
  }, []);

  const active = clients.filter(c => c.status === 'active');
  const inProgress = stories.filter(s => s.status === 'InProgress');

  if (loading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>AIOS Dashboard</h1>
      <p className={styles.subtitle}>Synkra AIOS · Caio Almeida</p>

      <div className={styles.metrics}>
        <MetricPill label="Clientes" value={clients.length} />
        <MetricPill label="Ativos" value={active.length} />
        <MetricPill label="Stories" value={stories.length} />
        <MetricPill label="Agentes" value={agents.length} />
        <MetricPill label="Em Progresso" value={inProgress.length} />
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Projetos Ativos</h2>
        <div className={styles.grid}>
          {active.map(client => (
            <ProjectCard key={client.slug} client={client} />
          ))}
          {active.length === 0 && (
            <p className={styles.empty}>Nenhum projeto ativo.</p>
          )}
        </div>
      </section>
    </div>
  );
}
