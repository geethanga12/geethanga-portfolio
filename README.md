# Geethanga Portfolio V2

Production-focused portfolio built with React + Vite frontend and Express + TypeScript backend, designed for AWS EC2 + Nginx deployment.

## Stack
- Frontend: React, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber
- Backend: Express, TypeScript, MySQL, Zod, Nodemailer
- Security: Cloudflare Turnstile + rate limiting + honeypot
- Hosting: AWS EC2 + Nginx + Cloudflare

## Features
- Hybrid UX: single-page portfolio + dedicated project case-study routes
- Functional contact flow: `UI -> API -> MySQL -> email`
- Updated internship timeline (Sep 2025 - Mar 2026)
- Project filters by category and technology
- Better accessibility for icon links and mobile navigation
- SEO upgrades: canonical, OG, JSON-LD, sitemap

## Project Structure
```text
.
├── backend/
│   ├── src/
│   ├── sql/
│   └── .env.example
├── deploy/
│   ├── nginx/
│   └── systemd/
├── docs/
│   ├── archive/
│   └── BACKEND_SETUP_AWS_EC2.md
├── public/
│   ├── assets/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   ├── config/
│   ├── data/
│   ├── pages/
│   ├── styles/
│   └── types/
└── scripts/
```

## Local Development
### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Full Local Testing (Before Live Deploy)
### Option A: Use your existing local MySQL (recommended for you)
1. Copy env files:
```bash
cp .env.local.example .env
cp backend/.env.local.example backend/.env
```
2. Update `backend/.env` with your local MySQL credentials.
3. Initialize DB/table:
```bash
npm run local:db:init
```
4. Run full stack:
```bash
npm run dev:full
```
5. Run smoke tests (in another terminal):
```bash
npm run local:check
```

### Option B: Use Docker for MySQL + Mailhog
```bash
npm run local:infra:up
```
Then set `backend/.env` to:
- `MYSQL_HOST=127.0.0.1`
- `MYSQL_PORT=3307`
- `MYSQL_USER=portfolio_user`
- `MYSQL_PASSWORD=portfolio_pass`
- `MYSQL_DATABASE=portfolio_db`
- `SMTP_HOST=127.0.0.1`
- `SMTP_PORT=1025`

Mail test inbox: `http://localhost:8025`

## Environment Variables
### Frontend (`.env`)
```bash
VITE_API_BASE_URL=/api/v1
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

### Backend (`backend/.env`)
See `backend/.env.example` for full required values.

## Deployment
- EC2 backend + Nginx + systemd: `docs/BACKEND_SETUP_AWS_EC2.md`
- Sample configs:
  - `deploy/nginx/geethanga.me.conf.sample`
  - `deploy/systemd/geethanga-portfolio-backend.service`
- Deploy script:
  - `scripts/deploy-ec2.sh`
