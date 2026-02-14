#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/var/www/geethanga.me/current"
BACKEND_DIR="$APP_ROOT/backend"

echo "[1/6] Installing frontend dependencies"
npm install

echo "[2/6] Building frontend"
npm run build

echo "[3/6] Installing backend dependencies"
npm --prefix "$BACKEND_DIR" install

echo "[4/6] Building backend"
npm --prefix "$BACKEND_DIR" run build

echo "[5/6] Restarting backend service"
sudo systemctl restart geethanga-portfolio-backend
sudo systemctl status geethanga-portfolio-backend --no-pager

echo "[6/6] Reloading nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "Deploy complete."
