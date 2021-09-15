export interface IApiError extends Error {
  statusCode: number;
}

export interface IConfigService {
  get: (key: string) => string;
}

export type LogLevel = 'debug' | 'info' | 'warning' | 'error';

export interface ILogger {
  log: (logLevel: LogLevel, message: string, logObj?: any) => Promise<void>;
  debug: (message: string, logObj?: any) => Promise<void>;
  info: (message: string, logObj?: any) => Promise<void>;
  warning: (message: string, logObj?: any) => Promise<void>;
  error: (message: string, logObj?: any) => Promise<void>;
}
