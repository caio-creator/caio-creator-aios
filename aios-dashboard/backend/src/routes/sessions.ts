import { Router, Request, Response } from 'express';
import { sessionStore } from '../services/session-store';

const router = Router();

// List sessions (ordered by updatedAt desc)
router.get('/', (_req: Request, res: Response) => {
  try {
    const sessions = sessionStore.listSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list sessions' });
  }
});

// Create new session
router.post('/', (req: Request, res: Response) => {
  try {
    const { agentId, clientSlug } = req.body;
    if (!agentId) {
      res.status(400).json({ error: 'agentId is required' });
      return;
    }
    const session = sessionStore.createSession(agentId, clientSlug);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Get session by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const session = sessionStore.getSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get session' });
  }
});

export default router;
