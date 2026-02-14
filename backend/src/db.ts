import mysql from 'mysql2/promise';
import { config } from './config.js';
import { logInfo } from './utils/logger.js';

export const CONTACT_SUBMISSIONS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    subject VARCHAR(190) NOT NULL,
    message TEXT NOT NULL,
    ip_hash CHAR(64) NOT NULL,
    user_agent VARCHAR(255) NOT NULL DEFAULT '',
    status VARCHAR(50) NOT NULL DEFAULT 'received',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
});

export const ensureTables = async () => {
  await pool.execute(CONTACT_SUBMISSIONS_TABLE_SQL);
  logInfo('Ensured table exists', { table: 'contact_submissions' });
};
