import express from 'express';
import cors from 'cors';
import path from 'path';
import clientsRouter from './routes/clients';
import agentsRouter from './routes/agents';
import modulesRouter from './routes/modules';
import storiesRouter from './routes/stories';

export const REPO_ROOT = path.resolve(__dirname, '../../../../');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, repoRoot: REPO_ROOT });
});

app.use('/api/clients', clientsRouter);
app.use('/api/agents', agentsRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/stories', storiesRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`AIOS Dashboard Backend running at http://localhost:${PORT}`);
  console.log(`Repo root: ${REPO_ROOT}`);
});
