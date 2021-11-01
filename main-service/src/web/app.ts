import { NextFunction, Router } from 'express';
import { IAPIError, ILogger } from '../domain/interfaces';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { reqLoggingMiddleware } from './middleware';

export interface IBaseController {
  path: string;
  getRouter: () => Router;
}

export class App {
  public expressApp: Application;
  private controllers: IBaseController[];

  constructor(
    controllers: IBaseController[],
    errorLogger: ILogger,
    reqLogger: ILogger
  ) {
    this.expressApp = express();
    this.controllers = controllers;

    // middleware
    this.expressApp.use(cors());
    this.expressApp.use(express.json());
    this.expressApp.use(
      reqLoggingMiddleware((str) => {
        reqLogger.info(str);
      })
    );
    this.expressApp.use(helmet());

    //health check
    this.expressApp.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'healthy' });
    });

    // register controllers
    this.controllers.forEach((controller) => {
      this.expressApp.use(controller.path, controller.getRouter());
    });
    // 404 handler
    this.expressApp.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: "resource not found"
      })
    })

    // error handlers
    this.expressApp.use(
      // eslint-disable-next-line
      (err: IAPIError, req: Request, res: Response, next: NextFunction) => {
        errorLogger.error(err.message, { stack: err.stack });
        if (process.env.NODE_ENV == 'development' && !err.statusCode) {
          console.log(err);
        }
        let code: number;
        let message: string;
        if (err.statusCode) {
          code = err.statusCode;
          message = err.message;
        } else {
          code = 500;
          message = 'something went wrong';
        }
        return res.status(code).json({ code, message });
      }
    );
  }
}
