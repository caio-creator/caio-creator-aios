import { Router } from 'express';
import { parseClients } from '../parsers/clients';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseClients());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
