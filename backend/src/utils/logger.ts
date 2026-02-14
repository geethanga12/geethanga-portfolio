type LogMeta = Record<string, unknown> | undefined;

const serializeMeta = (meta: LogMeta) => (meta ? ` ${JSON.stringify(meta)}` : '');

export const logInfo = (message: string, meta?: LogMeta) => {
  console.log(`[INFO] ${new Date().toISOString()} ${message}${serializeMeta(meta)}`);
};

export const logError = (message: string, meta?: LogMeta) => {
  console.error(`[ERROR] ${new Date().toISOString()} ${message}${serializeMeta(meta)}`);
};
