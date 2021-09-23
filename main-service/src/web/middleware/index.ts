import { Request, Response, NextFunction, Handler } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';
import * as jwt from 'jsonwebtoken';
import { APIError } from '../../domain/utils';

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

export function validate({
  body,
  query,
  params,
}: {
  body?: AnyObjectSchema;
  query?: AnyObjectSchema;
  params?: AnyObjectSchema;
}): Handler {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (query) {
        await query.validate(req.query);
      }
      if (body) {
        await body.validate(req.body);
      }
      if (params) {
        await params.validate(req.params);
      }
    } catch (err) {
      const validationError = <ValidationError>err;
      next(APIError.invalidRequest(validationError.errors[0]));
    }
    next();
  };
}

export function auth(): Handler {
  return function (req: Request, res: Response, next: NextFunction): void {
    const header = req.headers.authorization;
    if (!header) {
      res.status(40).json({
        code: 401,
        message: 'Authorization token missing',
      });
      return;
    }
    const splits = header.split(' ');
    if (splits[0] !== 'Bearer' && splits[0] !== 'bearer') {
      res.status(401).json({
        code: 401,
        message: 'Bearer required in Authorization token',
      });
      return;
    }
    if (splits.length < 2) {
      res.status(401).json({
        code: 401,
        message: 'token missing from Authorization header',
      });
    }

    if (!process.env['SECRET_KEY']) {
      throw new Error('no env variable SECRET_KEY');
    }
    try {
      const tokenDecoded = jwt.verify(splits[1], process.env.SECRET_KEY) as any;
      res.locals.user = {
        id: tokenDecoded.sub,
        firstname: tokenDecoded.firstname,
        lastname: tokenDecoded.lastname,
        username: tokenDecoded.username,
      };
    } catch (err) {
      res.status(401).json({
        code: 401,
        message: 'invalid token',
      });
      return;
    }
    next();
  };
}
