import { app } from './app.js';
import { config } from './config.js';
import { ensureTables } from './db.js';
import { verifyEmailTransport } from './services/email.js';
import { logError, logInfo } from './utils/logger.js';

const start = async () => {
  try {
    await ensureTables();
    await verifyEmailTransport();
    app.listen(config.port, () => {
      logInfo('Backend server started', { port: config.port, env: config.nodeEnv });
    });
  } catch (error) {
    logError('Failed to start backend', { error });
    process.exit(1);
  }
};

void start();
