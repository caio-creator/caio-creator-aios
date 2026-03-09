import { Router } from 'express';
import { listAgents } from '../services/agent-registry';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(listAgents());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
