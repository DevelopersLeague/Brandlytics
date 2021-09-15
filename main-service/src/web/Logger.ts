import { ILogger, LogLevel } from '../domain/interfaces';
import * as fsp from 'fs/promises';

const logLevelMap = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
};

type LogInfo = {
  message: string;
  logLevel: LogLevel;
  timeStamp: Date;
  logObj?: any;
};

type Strategy = (logInfo: LogInfo) => Promise<void>;

export class Logger implements ILogger {
  private logLevel: LogLevel;
  private strategies: Strategy[] = [];

  constructor(logLevel?: LogLevel) {
    this.logLevel = logLevel || 'info';
  }

  public addStrategy(strategy: Strategy): void {
    this.strategies.push(strategy);
  }

  public async log(
    logLevel: LogLevel,
    message: string,
    logObj?: any
  ): Promise<void> {
    const timeStamp = new Date();
    if (logLevelMap[logLevel] >= logLevelMap[this.logLevel]) {
      for (const strategy of this.strategies) {
        await strategy({ message, logLevel, logObj, timeStamp });
      }
    }
  }

  public async debug(message: string, logObj?: any): Promise<void> {
    await this.log('debug', message, logObj);
  }

  public async info(message: string, logObj?: any): Promise<void> {
    await this.log('info', message, logObj);
  }

  public async warning(message: string, logObj?: any): Promise<void> {
    await this.log('warning', message, logObj);
  }

  public async error(message: string, logObj?: any): Promise<void> {
    await this.log('error', message, logObj);
  }
}

export function makeFileStrategy(filePath: string): Strategy {
  return async function (logInfo: LogInfo) {
    const logItem = {
      message: logInfo.message,
      level: logInfo.logLevel,
      timestamp: logInfo.timeStamp.toISOString(),
      ...logInfo.logObj,
    };
    await fsp.appendFile(filePath, JSON.stringify(logItem) + '\n');
  };
}

export function makeConsoleStrategy(): Strategy {
  const levelColorMap = {
    debug: '\x1b[32m',
    info: '\x1b[34m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    default: '\x1b[37m',
  };
  return async function (logInfo: LogInfo) {
    process.stdout.write(
      `${levelColorMap[logInfo.logLevel]}${logInfo.logLevel}\t${
        levelColorMap['default']
      }${logInfo.message}\t${logInfo.timeStamp.toISOString()}\n`,
      'utf-8'
    );
  };
}
