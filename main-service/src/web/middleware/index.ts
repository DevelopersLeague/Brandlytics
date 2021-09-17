import { Request, Response, NextFunction, Handler } from 'express';

export function reqLoggingMiddleware(
  logMethod: (...args: any) => any
): Handler {
  const colorMap = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yello: '\x1b[33m',
    red: '\x1b[31m',
    white: '\x1b[37m',
  };
  return function (req: Request, res: Response, next: NextFunction): void {
    const now = Date.now();
    res.on('finish', (e: any) => {
      const then = Date.now();
      let color = colorMap['green'];
      if (res.statusCode >= 300 && res.statusCode <= 399) {
        color = colorMap['blue'];
      }
      if (res.statusCode >= 400 && res.statusCode <= 599) {
        color = colorMap['red'];
      }
      const logStr = `${req.method} ${req.url} ${color}${res.statusCode}${
        colorMap['white']
      } ${then - now}ms`;
      logMethod(logStr);
    });
    next();
  };
}
