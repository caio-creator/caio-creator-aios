import { useEffect, useState } from 'react';
import { api, Agent } from '../lib/api';
import { AgentCard } from '../components/AgentCard';
import styles from './AgentsPage.module.css';

export function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.agents().then(setAgents).finally(() => setLoading(false));
  }, []);

  const coreAgents = agents.filter(a => a.source === 'aios-core');
  const hubAgents = agents.filter(a => a.source === 'creative-hub');

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Agentes</h1>

      <section>
        <h2 className={styles.section}>AIOS Core ({coreAgents.length})</h2>
        <div className={styles.grid}>
          {coreAgents.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>

      <section>
        <h2 className={styles.section}>Creative Hub ({hubAgents.length})</h2>
        <div className={styles.grid}>
          {hubAgents.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>
    </div>
  );
}
