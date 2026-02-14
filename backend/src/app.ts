import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { randomUUID } from 'crypto';
import { config } from './config.js';
import { contactRouter } from './routes/contact.js';
import { healthRouter } from './routes/health.js';
import { projectsRouter } from './routes/projects.js';
import { logError, logInfo } from './utils/logger.js';

export const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: config.allowedOrigin || true,
    credentials: false,
  })
);
app.use(express.json({ limit: '32kb' }));

app.use((req, res, next) => {
  res.locals.requestId = randomUUID();
  res.setHeader('x-request-id', res.locals.requestId);
  next();
});

app.use((req, _res, next) => {
  logInfo('Incoming request', {
    requestId: _res.locals.requestId,
    method: req.method,
    path: req.path,
  });
  next();
});

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/projects', projectsRouter);

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found.' });
});

app.use(
  (
    error: Error & { statusCode?: number },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    void next;
    logError('Unhandled error', {
      requestId: res.locals.requestId,
      method: req.method,
      path: req.path,
      error: error.message,
    });
    res.status(error.statusCode || 500).json({
      ok: false,
      requestId: res.locals.requestId,
      message: 'Internal server error.',
    });
  }
);
