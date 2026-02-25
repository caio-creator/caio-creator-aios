import { Router } from 'express';
import { parseAgents } from '../parsers/agents';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseAgents());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
