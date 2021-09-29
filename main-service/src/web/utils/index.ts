import { NextFunction, Request, Response, Handler } from 'express';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): Handler => {
  const handler: Handler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };

  return handler;
};

export const checkEnv: (keys: string[]) => void = (keys) => {
  keys.forEach((key) => {
    if (process.env[key] === undefined) {
      throw new Error(`${key} environment variable is not defined`);
    }
  });
};
