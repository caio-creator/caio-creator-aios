import { Router, Request, Response } from 'express';
import { getAgent } from '../services/agent-registry';
import { streamChat } from '../services/llm-router';
import { sessionStore, Message } from '../services/session-store';
import { injectClientContext, formatContextAsPrompt } from '../services/context-injector';

const router = Router();

interface ChatRequest {
  agentId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  clientSlug?: string;
  sessionId?: string;
}

router.post('/stream', async (req: Request, res: Response) => {
  const { agentId, messages, clientSlug, sessionId } = req.body as ChatRequest;

  // Validate agent
  const agent = getAgent(agentId);
  if (!agent) {
    res.status(400).json({ error: 'Invalid agent ID' });
    return;
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Get or create session
    let session;
    if (sessionId) {
      session = sessionStore.getSession(sessionId);
      if (!session) {
        res.write(`data: ${JSON.stringify({ type: 'error', message: 'Session not found' })}\n\n`);
        res.end();
        return;
      }
    } else {
      session = sessionStore.createSession(agentId, clientSlug);
    }

    // Build system prompt
    let systemPrompt = agent.systemPrompt;

    // Inject client context if available
    if (clientSlug) {
      const context = await injectClientContext(clientSlug);
      const contextPrompt = formatContextAsPrompt(clientSlug, context);
      systemPrompt = systemPrompt + '\n' + contextPrompt;
    }

    // Auto-title on first message
    if (session.messages.length === 0 && messages.length > 0) {
      const firstUserMsg = messages[messages.length - 1]?.content || 'New Conversation';
      const title = firstUserMsg.substring(0, 60).trim();
      sessionStore.updateTitle(session.id, title);
    }

    // Stream from LLM
    let fullResponse = '';
    for await (const event of streamChat(messages, systemPrompt)) {
      if (event.type === 'delta' && event.content) {
        fullResponse += event.content;
        res.write(`data: ${JSON.stringify({ type: 'delta', content: event.content })}\n\n`);
      } else if (event.type === 'done' && event.model) {
        sessionStore.updateModel(session.id, event.model);
        res.write(`data: ${JSON.stringify({ type: 'done', model: event.model, sessionId: session.id })}\n\n`);
      } else if (event.type === 'error') {
        res.write(`data: ${JSON.stringify({ type: 'error', message: event.message })}\n\n`);
        res.end();
        return;
      }
    }

    // Save assistant message to session
    if (fullResponse) {
      sessionStore.appendMessage(session.id, {
        role: 'assistant',
        content: fullResponse,
      });
    }

    res.end();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: errorMsg })}\n\n`);
    res.end();
  }
});

export default router;
