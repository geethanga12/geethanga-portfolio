# Local Testing Guide (Frontend + Backend + MySQL)

## Prerequisites
- Node.js 18+
- npm
- MySQL 8+

## 1. Install dependencies
From project root:
```bash
npm install
cd backend && npm install && cd ..
```

## 2. Configure env files
```bash
cp .env.local.example .env
cp backend/.env.local.example backend/.env
```

Edit `backend/.env` for your local MySQL credentials.

## 3. Create DB and table
### Fast way (automatic)
```bash
npm run local:db:init
```

### Manual SQL (optional)
```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

## 4. Start frontend + backend
```bash
npm run dev:full
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## 5. Verify API + contact flow
In another terminal:
```bash
npm run local:check
```

This checks:
1. `GET /api/v1/health`
2. `GET /api/v1/projects/smartbiz`
3. `POST /api/v1/contact`

## 6. Verify DB insert
```sql
USE portfolio_db;
SELECT id, name, email, subject, status, created_at
FROM contact_submissions
ORDER BY id DESC
LIMIT 20;
```

## 7. Optional local email testing (Mailhog)
Start local services:
```bash
npm run local:infra:up
```

Then use in `backend/.env`:
- `SMTP_HOST=127.0.0.1`
- `SMTP_PORT=1025`

Open mailbox UI:
- `http://localhost:8025`

Stop services:
```bash
npm run local:infra:down
```
