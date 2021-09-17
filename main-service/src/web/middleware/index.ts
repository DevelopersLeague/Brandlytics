import { ILogger } from '../../domain/interfaces';
import { Request, Response, NextFunction } from 'express';

export function reqLoggingMiddleware(logMethod: (...args: any) => any) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const now = Date.now();
    res.on('finish', (e: any) => {
      const then = Date.now();
      const logStr = `${req.method}  ${req.url} ${res.statusCode} ${
        then - now
      }ms`;
      logMethod(logStr);
    });
    next();
  };
}
