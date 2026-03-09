import { useState, useEffect } from 'react';
import './ChatPage.isolated.css'; // Design isolado e compatível
import { api, Session, ChatMessage } from '../lib/api';
import { streamChat } from '../lib/chat-stream';
import { ChatSidebar } from '../components/ChatSidebar';
import { ChatTopBar } from '../components/ChatTopBar';
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';
import styles from './ChatPage.module.css';

export function ChatPage() {
  // State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentId, setAgentId] = useState('copy');
  const [clientSlug, setClientSlug] = useState<string | undefined>();
  const [model, setModel] = useState<string | undefined>();
  const [clients, setClients] = useState<Array<{ slug: string; status: string }>>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // Load sessions and clients on mount
  useEffect(() => {
    Promise.all([api.sessions.list(), api.clients()])
      .then(([sessionsList, clientsList]) => {
        setSessions(sessionsList);
        setClients(clientsList);
        if (sessionsList.length > 0) {
          setActiveSessionId(sessionsList[0].id);
        }
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setError('Failed to load sessions and clients');
      });
  }, []);

  // Load active session
  useEffect(() => {
    if (activeSessionId) {
      api.sessions.get(activeSessionId).then(session => {
        setMessages(session.messages);
        setAgentId(session.agentId);
        setClientSlug(session.clientSlug);
        setModel(session.model);
      });
    }
  }, [activeSessionId]);

  // Create new session
  const handleNewSession = async () => {
    try {
      const session = await api.sessions.create(agentId, clientSlug);
      setSessions([session, ...sessions]);
      setActiveSessionId(session.id);
      setMessages([]);
      setModel(undefined);
    } catch (err) {
      setError('Failed to create session');
    }
  };

  // Send message
  const handleSendMessage = async (userMessage: string) => {
    if (!activeSessionId) return;

    setIsStreaming(true);
    setError(undefined);

    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user' as const, content: userMessage },
    ];
    setMessages(updatedMessages);

    try {
      const response = await api.chat.stream({
        agentId,
        messages: updatedMessages,
        clientSlug,
        sessionId: activeSessionId,
      });

      let assistantMessage = '';

      for await (const event of streamChat(response)) {
        if (event.type === 'delta' && event.content) {
          assistantMessage += event.content;
          setMessages(prev => {
            const updated = [...prev];
            if (updated[updated.length - 1]?.role === 'assistant') {
              updated[updated.length - 1].content = assistantMessage;
            } else {
              updated.push({
                role: 'assistant',
                content: assistantMessage,
              });
            }
            return updated;
          });
        } else if (event.type === 'done' && event.model) {
          setModel(event.model);
        } else if (event.type === 'error') {
          setError(event.message || 'Unknown error');
        }
      }
    } catch (err) {
      setError('Failed to get response');
      console.error(err);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopyResponse = () => {
    if (messages.length > 0) {
      const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
      if (lastAssistant) {
        navigator.clipboard.writeText(lastAssistant.content);
      }
    }
  };

  const lastAssistantMsg = [...messages].reverse().find(m => m.role === 'assistant');
  const canCopy = lastAssistantMsg && !isStreaming;

  return (
    <div className={`${styles.container} chat-page-wrapper`}>
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={handleNewSession}
      />

      <div className={styles.main}>
        <ChatTopBar
          agentId={agentId}
          clientSlug={clientSlug}
          model={model}
          onAgentChange={id => {
            setAgentId(id);
            setMessages([]);
          }}
          onClientChange={client => {
            setClientSlug(client);
            setMessages([]);
          }}
          clients={clients}
        />

        {error && (
          <div className={styles.errorBanner}>
            <p>{error}</p>
            <button onClick={() => setError(undefined)}>Dismiss</button>
          </div>
        )}

        <ChatMessages messages={messages} isStreaming={isStreaming} />

        <ChatInput
          disabled={isStreaming || !agentId}
          onSend={handleSendMessage}
          onCopy={handleCopyResponse}
          canCopy={canCopy}
        />
      </div>
    </div>
  );
}
