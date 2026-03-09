import { getAgent } from '../lib/agents';
import styles from './ChatTopBar.module.css';

interface ChatTopBarProps {
  agentId: string;
  clientSlug?: string;
  model?: string;
  onAgentChange: (agentId: string) => void;
  onClientChange: (clientSlug: string | undefined) => void;
  clients: Array<{ slug: string; status: string }>;
}

export function ChatTopBar({
  agentId,
  clientSlug,
  model,
  onAgentChange,
  onClientChange,
  clients,
}: ChatTopBarProps) {
  const agent = getAgent(agentId);

  return (
    <div className={styles.topBar}>
      <div className={styles.selectors}>
        <select
          className={styles.select}
          value={agentId}
          onChange={e => onAgentChange(e.target.value)}
        >
          <option value="">Select Agent...</option>
          <option value="copy">Copy Agent</option>
          <option value="sales">Sales Agent</option>
          <option value="pitch">Pitch Agent</option>
          <option value="briefing">Briefing Agent</option>
          <option value="brand">Brand Agent</option>
        </select>

        <select
          className={styles.select}
          value={clientSlug || ''}
          onChange={e => onClientChange(e.target.value || undefined)}
        >
          <option value="">No Client</option>
          {clients.map(c => (
            <option key={c.slug} value={c.slug}>
              {c.slug}
            </option>
          ))}
        </select>
      </div>

      {model && <div className={styles.model}>● {model.split('/')[1] || model}</div>}
    </div>
  );
}
