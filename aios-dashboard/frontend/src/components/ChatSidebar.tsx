import { Session } from '../lib/api';
import styles from './ChatSidebar.module.css';

interface ChatSidebarProps {
  sessions: Session[];
  activeSessionId?: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
}: ChatSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <button className={styles.newBtn} onClick={onNewSession}>
        + New Conversation
      </button>

      <div className={styles.sessionsList}>
        {sessions.length === 0 ? (
          <p className={styles.empty}>No conversations yet</p>
        ) : (
          sessions.map(session => (
            <button
              key={session.id}
              className={`${styles.sessionItem} ${
                activeSessionId === session.id ? styles.active : ''
              }`}
              onClick={() => onSelectSession(session.id)}
              title={session.title}
            >
              <span className={styles.title}>{session.title}</span>
              <span className={styles.agent}>{session.agentId}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
