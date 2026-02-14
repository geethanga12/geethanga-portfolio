import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';
import { contactRateLimiter } from '../middleware/rateLimit.js';
import { sendContactEmail } from '../services/email.js';
import { verifyTurnstile } from '../services/turnstile.js';
import { ContactPayload } from '../types.js';
import { sha256 } from '../utils/hash.js';
import { logError, logInfo } from '../utils/logger.js';
import { config } from '../config.js';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(190),
  subject: z.string().trim().min(3).max(190),
  message: z.string().trim().min(10).max(5000),
  turnstileToken: z.string().optional(),
  website: z.string().optional(),
});

export const contactRouter = Router();

contactRouter.post('/', contactRateLimiter, async (req, res) => {
  const requestId = (res.locals.requestId as string) || 'unknown';
  const parseResult = schema.safeParse(req.body);

  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    parseResult.error.issues.forEach((issue) => {
      const key = issue.path.join('.') || 'form';
      fieldErrors[key] = issue.message;
    });
    res.status(400).json({
      ok: false,
      requestId,
      message: 'Validation failed.',
      errors: fieldErrors,
    });
    return;
  }

  const payload = parseResult.data as ContactPayload;

  // Honeypot trap: fake success for bots.
  if (payload.website && payload.website.trim().length > 0) {
    logInfo('Honeypot blocked submission', { requestId });
    res.status(200).json({
      ok: true,
      requestId,
      message: 'Thank you. Your message has been received.',
    });
    return;
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || '';
  const turnstile = await verifyTurnstile(payload.turnstileToken, clientIp);
  if (!turnstile.ok) {
    res.status(403).json({
      ok: false,
      requestId,
      message: 'Security verification failed.',
      code: turnstile.reason,
    });
    return;
  }

  const ipHash = sha256(`${clientIp}:${config.ipHashSalt}`);
  const userAgent = req.get('user-agent') || '';

  try {
    const [insertResult] = await pool.execute(
      `
      INSERT INTO contact_submissions
      (name, email, subject, message, ip_hash, user_agent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        payload.name,
        payload.email,
        payload.subject,
        payload.message,
        ipHash,
        userAgent.slice(0, 255),
        'received',
      ]
    );

    const submissionId = (insertResult as { insertId?: number }).insertId;
    const emailed = await sendContactEmail(payload, requestId);

    if (submissionId) {
      await pool.execute('UPDATE contact_submissions SET status = ? WHERE id = ?', [
        emailed ? 'emailed' : 'stored',
        submissionId,
      ]);
    }

    res.status(200).json({
      ok: true,
      requestId,
      message: "Thank you for your message. I'll get back to you soon.",
    });
  } catch (error) {
    logError('Failed to process contact submission', { requestId, error });
    res.status(500).json({
      ok: false,
      requestId,
      message: 'Internal server error.',
    });
  }
});
