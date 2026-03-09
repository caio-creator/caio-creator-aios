import { v4 as uuidv4 } from 'uuid';
import { supabase, Session, Message } from '../lib/supabase';
import { ChatMessage } from '../types';

export class SupabaseSessionStore {
  async createSession(agentId: string, clientSlug?: string): Promise<Session> {
    const session: Session = {
      id: uuidv4(),
      agent_id: agentId,
      client_slug: clientSlug,
      title: 'New Conversation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('sessions')
      .insert([session])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSession(id: string): Promise<Session & { messages: ChatMessage[] }> {
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (sessionError) throw sessionError;

    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', id)
      .order('created_at', { ascending: true });

    if (messagesError) throw messagesError;

    return {
      ...session,
      messages: messages?.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })) || [],
    };
  }

  async listSessions(): Promise<Session[]> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async appendMessage(sessionId: string, role: 'user' | 'assistant', content: string): Promise<Message> {
    const message: Message = {
      id: uuidv4(),
      session_id: sessionId,
      role,
      content,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;

    // Update session updated_at
    await supabase
      .from('sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    return data;
  }

  async updateTitle(sessionId: string, title: string): Promise<void> {
    const { error } = await supabase
      .from('sessions')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    if (error) throw error;
  }

  async updateModel(sessionId: string, model: string): Promise<void> {
    const { error } = await supabase
      .from('sessions')
      .update({ model, updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    if (error) throw error;
  }
}

export const sessionStore = new SupabaseSessionStore();
