import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

const parseNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeSecret = (value: string | undefined) => {
  if (!value) return '';
  return value.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
};

const normalizeSmtpPassword = (value: string | undefined) => {
  const secret = normalizeSecret(value);
  return secret.includes(' ') ? secret.replace(/\s+/g, '') : secret;
};

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseNumber(process.env.PORT, 4000),
  allowedOrigin: process.env.ALLOWED_ORIGIN || '',
  db: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseNumber(process.env.MYSQL_PORT, 3306),
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
  },
  ipHashSalt: process.env.IP_HASH_SALT || 'replace-me',
  turnstileEnabled: parseBoolean(process.env.TURNSTILE_ENABLED, false),
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY || '',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseNumber(process.env.SMTP_PORT, 587),
    secure: parseBoolean(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: normalizeSmtpPassword(process.env.SMTP_PASS),
    from: process.env.MAIL_FROM || 'Portfolio <noreply@localhost>',
    to: process.env.MAIL_TO || '',
  },
};
