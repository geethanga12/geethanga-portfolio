# Backend Setup Guide (AWS EC2 + Nginx + MySQL)

## 1. Prepare folders on EC2
```bash
sudo mkdir -p /var/www/geethanga.me/current
sudo chown -R ubuntu:ubuntu /var/www/geethanga.me
```

## 2. Clone/update project
```bash
cd /var/www/geethanga.me/current
git pull origin main
```

## 3. Configure frontend env
Create `.env` at project root:
```bash
cat > .env <<EOF
VITE_API_BASE_URL=/api/v1
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
EOF
```

## 4. Configure backend env
Create shared env file for systemd:
```bash
sudo mkdir -p /var/www/geethanga.me/shared
sudo tee /var/www/geethanga.me/shared/backend.env >/dev/null <<EOF
NODE_ENV=production
PORT=4000
ALLOWED_ORIGIN=https://geethanga.me
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=portfolio_user
MYSQL_PASSWORD=change_me
MYSQL_DATABASE=portfolio
IP_HASH_SALT=change_this_salt
TURNSTILE_ENABLED=true
TURNSTILE_SECRET_KEY=your_turnstile_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
MAIL_FROM=Portfolio <noreply@geethanga.me>
MAIL_TO=dissanayakegeethanga@gmail.com
EOF
```

## 5. Create MySQL DB and user
```sql
CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'change_me';
GRANT ALL PRIVILEGES ON portfolio.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

## 6. Install backend service
```bash
sudo cp deploy/systemd/geethanga-portfolio-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable geethanga-portfolio-backend
```

## 7. Configure Nginx
```bash
sudo cp deploy/nginx/geethanga.me.conf.sample /etc/nginx/sites-available/geethanga.me
sudo ln -sf /etc/nginx/sites-available/geethanga.me /etc/nginx/sites-enabled/geethanga.me
sudo nginx -t
sudo systemctl reload nginx
```

## 8. Deploy app
```bash
chmod +x scripts/deploy-ec2.sh
./scripts/deploy-ec2.sh
```

## 9. Verify
```bash
curl -i https://geethanga.me/api/v1/health
```

Expected: `200` with JSON containing `ok: true`.

## 10. Cloudflare Turnstile
1. Create a site in Cloudflare Turnstile dashboard.
2. Add your domain `geethanga.me`.
3. Put site key in frontend `.env` as `VITE_TURNSTILE_SITE_KEY`.
4. Put secret key in backend env as `TURNSTILE_SECRET_KEY`.
5. Restart backend service after changes.
