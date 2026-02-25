import { Router } from 'express';
import { parseModules } from '../parsers/modules';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseModules());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
