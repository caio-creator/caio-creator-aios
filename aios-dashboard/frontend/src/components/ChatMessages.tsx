import { useEffect, useRef } from 'react';
import styles from './ChatMessages.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isStreaming: boolean;
}

export function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <p className={styles.emptyTitle}>Start a conversation</p>
          <p className={styles.emptyText}>
            Select an agent and ask a question to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {messages.map((msg, idx) => (
        <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
          <div className={styles.bubble}>
            {msg.content}
          </div>
        </div>
      ))}

      {isStreaming && (
        <div className={`${styles.message} ${styles.assistant}`}>
          <div className={styles.bubble}>
            <span className={styles.cursor}></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
