/**
 * @repo/utils — Structured Logger
 *
 * Shared logging utility for all apps.
 * Outputs structured JSON logs in production, pretty logs in development.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  service?: string;
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel =
  (process.env["LOG_LEVEL"] as LogLevel) || "info";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatEntry(entry: LogEntry): string {
  if (process.env["NODE_ENV"] === "production") {
    return JSON.stringify(entry);
  }

  const { level, message, timestamp, service, ...extra } = entry;
  const prefix = service ? `[${service}]` : "";
  const extraStr =
    Object.keys(extra).length > 0 ? ` ${JSON.stringify(extra)}` : "";
  return `${timestamp} ${level.toUpperCase().padEnd(5)} ${prefix} ${message}${extraStr}`;
}

function log(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>,
): void {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  const formatted = formatEntry(entry);

  if (level === "error") {
    console.error(formatted);
  } else if (level === "warn") {
    console.warn(formatted);
  } else {
    console.log(formatted);
  }
}

/**
 * Create a logger instance with a service name prefix.
 */
export function createLogger(service: string) {
  return {
    debug: (msg: string, meta?: Record<string, unknown>) =>
      log("debug", msg, { service, ...meta }),
    info: (msg: string, meta?: Record<string, unknown>) =>
      log("info", msg, { service, ...meta }),
    warn: (msg: string, meta?: Record<string, unknown>) =>
      log("warn", msg, { service, ...meta }),
    error: (msg: string, meta?: Record<string, unknown>) =>
      log("error", msg, { service, ...meta }),
  };
}
