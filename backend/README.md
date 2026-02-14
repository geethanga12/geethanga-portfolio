# Portfolio Backend

Express + TypeScript API for portfolio contact handling.

## Endpoints
- `GET /api/v1/health`
- `POST /api/v1/contact`
- `GET /api/v1/projects/:slug`

## Contact Payload
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Let's talk.",
  "turnstileToken": "token-if-enabled",
  "website": ""
}
```

## Run
```bash
npm install
cp .env.example .env
npm run dev
```
