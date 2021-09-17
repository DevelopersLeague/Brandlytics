import { NextFunction, Request, Response, Handler } from 'express';

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): Handler => {
  const handler: Handler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };

  return handler;
};

