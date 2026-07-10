# Contact API

A standalone **Express + Nodemailer + MySQL** service that powers the contact form on
[geethanga.me](https://geethanga.me). It validates submissions, blocks bots with a
honeypot, rate-limits abuse, **persists every message to MySQL**, and emails it to your
inbox via **Gmail SMTP**.

## Setup

```bash
cd server
npm install
cp .env.example .env.local   # then edit .env.local with your real values
npm run dev                  # starts on http://localhost:5174 (auto-reload)
```

Secrets are read from **`.env.local`** (gitignored), falling back to `.env`.

### Gmail App Password

1. Enable **2-Step Verification** on your Google account.
2. Go to <https://myaccount.google.com/apppasswords> and create an app password.
3. Put the 16 characters (no spaces) in `GMAIL_APP_PASSWORD`.

> Use an **App Password**, never your real Google login password.

### MySQL

Just point the `DB_*` vars at your MySQL server. On boot the service **auto-creates**
the `geethanga_portfolio` database and the `contact_messages` table if they don't exist —
no manual migration needed. If MySQL is unreachable, the API still boots and emails
messages (persistence is skipped until the DB is fixed).

```sql
-- contact_messages
id, name, email, subject, message, ip, user_agent, created_at
```

## Environment variables

| Variable             | Required | Description                                              |
| -------------------- | -------- | -------------------------------------------------------- |
| `PORT`               | no       | Port to listen on (default `5174`).                      |
| `ALLOWED_ORIGIN`     | yes      | Comma-separated allowed frontend origins (CORS).         |
| `GMAIL_USER`         | yes      | Gmail address that sends the mail.                       |
| `GMAIL_APP_PASSWORD` | yes      | Google App Password for that account.                    |
| `CONTACT_RECIPIENT`  | no       | Where messages are delivered (defaults to `GMAIL_USER`). |
| `DB_HOST`            | yes      | MySQL host (e.g. `localhost`).                           |
| `DB_PORT`            | no       | MySQL port (default `3306`).                             |
| `DB_USER`            | yes      | MySQL user.                                              |
| `DB_PASSWORD`        | yes      | MySQL password.                                          |
| `DB_NAME`            | no       | Database name (default `geethanga_portfolio`).           |

## Endpoints

- `GET /api/health` → `{ ok, status, db, mail }` (shows DB + mail readiness)
- `POST /api/contact` → body `{ name, email, subject, message, company? }`
  - `company` is a hidden honeypot — leave it empty.
  - Success: `{ ok: true }` (stored in DB and/or emailed)
  - Validation error: `400 { ok: false, errors: {...} }`
  - Rate-limited: `429` (5 requests / 15 min / IP)

## Deploy (production)

Any Node host works (Render, Railway, a VPS, Hostinger Node hosting):

```bash
npm install --omit=dev
npm start
```

Set env vars in your host's dashboard, point `ALLOWED_ORIGIN` at your live domain, and
use a managed MySQL instance for `DB_*`. Then set `VITE_CONTACT_API_URL` in the frontend
to this service's public URL and rebuild the site.
