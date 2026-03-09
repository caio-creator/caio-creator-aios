/**
 * Shared type definitions for AIOS Chat Suite
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface StreamEvent {
  type: 'delta' | 'done' | 'error';
  content?: string;
  model?: string;
  message?: string;
}

export interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  systemPrompt: string;
}

export interface Client {
  slug: string;
  name: string;
  status: string;
}
