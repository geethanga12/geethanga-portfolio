import dotenv from 'dotenv';
// Load secrets from .env.local first (gitignored), then fall back to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

/* ─── Config ──────────────────────────────────────────────────────────── */

const {
  PORT = 5174,
  ALLOWED_ORIGIN = 'http://localhost:5173',
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECIPIENT,
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'geethanga_portfolio',
} = process.env;

const mailConfigured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
if (!mailConfigured) {
  console.warn('[contact-api] GMAIL_USER / GMAIL_APP_PASSWORD not set — email delivery is disabled.');
}

/* ─── MySQL pool + schema ─────────────────────────────────────────────── */

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4_general_ci',
});

let dbReady = false;

async function initDb() {
  // Create the database if it doesn't exist (connect without selecting one first)
  const admin = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
  });
  await admin.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await admin.end();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(120)  NOT NULL,
      email       VARCHAR(160)  NOT NULL,
      subject     VARCHAR(200)  NOT NULL,
      message     TEXT          NOT NULL,
      ip          VARCHAR(64)   NULL,
      user_agent  VARCHAR(255)  NULL,
      created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_created_at (created_at),
      INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  dbReady = true;
  console.log(`[contact-api] MySQL ready — database "${DB_NAME}", table "contact_messages".`);
}

/* ─── Mail transport ──────────────────────────────────────────────────── */

const transporter = mailConfigured
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  : null;

/* ─── App ─────────────────────────────────────────────────────────────── */

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '16kb' }));

const allowedOrigins = ALLOWED_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean);
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
  }),
);

/* ─── Helpers ─────────────────────────────────────────────────────────── */

const clean = (v) => String(v ?? '').trim();
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );

function validate(body) {
  const values = {
    name: clean(body.name).slice(0, 120),
    email: clean(body.email).slice(0, 160),
    subject: clean(body.subject).slice(0, 200),
    message: clean(body.message),
  };
  const errors = {};
  if (!values.name) errors.name = 'Name is required.';
  if (!values.email) errors.email = 'Email is required.';
  else if (!isEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject) errors.subject = 'Subject is required.';
  if (!values.message) errors.message = 'Message is required.';
  else if (values.message.length < 10) errors.message = 'Message must be at least 10 characters.';
  return { values, errors };
}

/* ─── Routes ──────────────────────────────────────────────────────────── */

app.get('/api/health', (_req, res) =>
  res.json({ ok: true, status: 'up', db: dbReady, mail: mailConfigured }),
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again in a little while.' },
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    // Honeypot — bots fill this hidden field; silently accept & drop
    if (clean(req.body.company)) return res.json({ ok: true });

    const { values, errors } = validate(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, errors });
    }

    const { name, email, subject, message } = values;
    const ip = req.ip?.slice(0, 64) ?? null;
    const userAgent = clean(req.headers['user-agent']).slice(0, 255) || null;

    let dbOk = false;
    let mailOk = false;

    // 1) Persist to MySQL (source of truth / audit log)
    try {
      await pool.execute(
        `INSERT INTO contact_messages (name, email, subject, message, ip, user_agent)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, subject, message, ip, userAgent],
      );
      dbOk = true;
    } catch (err) {
      console.error('[contact-api] DB insert failed:', err.message);
    }

    // 2) Email notification (so messages reach the inbox in real time)
    if (transporter) {
      try {
        const recipient = CONTACT_RECIPIENT || GMAIL_USER;
        await transporter.sendMail({
          from: `"Portfolio Contact" <${GMAIL_USER}>`,
          to: recipient,
          replyTo: `"${name}" <${email}>`,
          subject: `[Portfolio] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
          html: `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111">
            <h2 style="margin:0 0 16px;font-size:18px">New message from your portfolio</h2>
            <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:4px 0"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0" />
            <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
          </div>`,
        });
        mailOk = true;
      } catch (err) {
        console.error('[contact-api] email failed:', err.message);
      }
    }

    // Only fail if the message was neither stored nor emailed
    if (!dbOk && !mailOk) {
      return res
        .status(500)
        .json({ ok: false, error: 'Could not process your message. Please try again later.' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('[contact-api] unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again later.' });
  }
});

/* ─── Boot ────────────────────────────────────────────────────────────── */

initDb().catch((err) => {
  console.warn(
    '[contact-api] MySQL not reachable on boot — messages will still be emailed. ' +
      'Fix DB config to enable persistence. Reason:',
    err.message,
  );
});

app.listen(PORT, () => console.log(`[contact-api] listening on http://localhost:${PORT}`));

/* ─── Graceful shutdown ───────────────────────────────────────────────── */

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    console.log(`\n[contact-api] ${sig} received — closing pool.`);
    try {
      await pool.end();
    } catch {
      /* ignore */
    }
    process.exit(0);
  });
}
