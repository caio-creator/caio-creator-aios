import { Router } from 'express';
import { parseStories, updateStoryStatus } from '../parsers/stories';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseStories());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.patch('/:id/status', (req, res) => {
  const { file, status } = req.body as { file: string; status: string };
  const VALID = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'];
  if (!VALID.includes(status)) {
    res.status(400).json({ error: `Status inválido. Use: ${VALID.join(', ')}` });
    return;
  }
  try {
    updateStoryStatus(file, status);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
