import mysql from 'mysql2/promise';
import { config } from '../config.js';
import { CONTACT_SUBMISSIONS_TABLE_SQL } from '../db.js';
import { logError, logInfo } from '../utils/logger.js';

const createDatabase = async () => {
  if (!config.db.database) {
    throw new Error('MYSQL_DATABASE is required in backend .env');
  }

  const adminConnection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
  });

  await adminConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await adminConnection.end();
};

const createTables = async () => {
  const appConnection = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  });

  await appConnection.execute(CONTACT_SUBMISSIONS_TABLE_SQL);
  await appConnection.end();
};

const run = async () => {
  try {
    await createDatabase();
    await createTables();
    logInfo('Database initialization completed', { database: config.db.database });
  } catch (error) {
    logError('Database initialization failed', { error });
    process.exit(1);
  }
};

void run();
