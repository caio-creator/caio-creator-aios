import { useRef, useState } from 'react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  disabled: boolean;
  onSend: (message: string) => void;
  onCopy?: () => void;
  canCopy?: boolean;
}

export function ChatInput({ disabled, onSend, onCopy, canCopy }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          placeholder="Type your message... (Shift+Enter for newline)"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          title="Send (Enter)"
        >
          Send
        </button>
      </div>
      {canCopy && onCopy && (
        <button className={styles.secondaryBtn} onClick={onCopy}>
          Copy Response
        </button>
      )}
    </div>
  );
}
