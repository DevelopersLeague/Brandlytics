import { NextFunction, Router } from 'express';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export interface IBaseController {
  path: string;
  getRouter: () => Router;
}

export interface ICustomError extends Error {
  statusCode: number;
}

export class App {
  public expressApp: Application;
  private controllers: IBaseController[];

  constructor(controllers: IBaseController[]) {
    this.expressApp = express();
    this.controllers = controllers;

    // middleware
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use(morgan('dev'));
    this.expressApp.use(helmet());
    this.expressApp.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'healthy' });
    });

    // register controllers
    this.controllers.forEach((controller) => {
      this.expressApp.use(controller.path, controller.getRouter());
    });

    // error handlers
    this.expressApp.use(
      // eslint-disable-next-line
      (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        let code: number;
        let message: string;
        if (err.statusCode) {
          code = err.statusCode;
          message = err.message;
        } else {
          code = 500;
          message = err.message;
        }
        return res.json({ code, message });
      }
    );
  }
}
