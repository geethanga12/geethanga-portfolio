import { Router } from 'express';
import { pool } from '../db.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  let dbOk = false;
  try {
    await pool.query('SELECT 1');
    dbOk = true;
  } catch {
    dbOk = false;
  }

  res.status(dbOk ? 200 : 503).json({
    ok: dbOk,
    service: 'portfolio-backend',
    database: dbOk ? 'up' : 'down',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
