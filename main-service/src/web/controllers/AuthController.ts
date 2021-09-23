import { Router, Request, Response } from 'express';
import { IBaseController } from '../App';
import * as schemas from '../../domain/schemas';
import * as yup from 'yup';
import { validate } from '../middleware';
import { inject } from 'tsyringe';
import { IUserService } from '../../domain/interfaces';

export class AuthController implements IBaseController {
  constructor(
    @inject('user_service')
    private readonly userService: IUserService
  ) {}
  public path = '/api/v1/auth';

  public getRouter(): Router {
    const router = Router();
    router.post(
      '/signup',
      validate({
        body: yup.object().shape({
          firstname: yup.string().required(),
          lastname: yup.string().required(),
          username: schemas.usernameSchema.required(),
          password: schemas.passwordSchema.required(),
        }),
      }),
      this.signupHandler.bind(this)
    );
    router.post(
      '/login',
      validate({
        body: yup.object().shape({
          username: schemas.usernameSchema.required(),
          password: schemas.passwordSchema.required(),
        }),
      }),
      this.signupHandler.bind(this)
    );
    return router;
  }

  public async signupHandler(req: Request, res: Response): Promise<void> {
    const token = await this.userService.signup({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json({
      token: token,
    });
    return;
  }

  public async loginHandler(req: Request, res: Response): Promise<void> {
    const token = await this.userService.login({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).json({
      token: token,
    });
    return;
  }
}
