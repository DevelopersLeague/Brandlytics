import { Router, Request, Response } from 'express';
import { IBaseController } from '../app';
import { inject, injectable, singleton } from 'tsyringe';
import { catchAsync } from '../../web/utils';
import * as yup from 'yup';
import { IQueryService } from '../../domain/interfaces';
import { auth, validate } from '../middleware';

@injectable()
@singleton()
export class QueryController implements IBaseController {
  constructor(
    @inject('query_service')
    private readonly queryService: IQueryService
  ) { }
  public path = '/api/v1/queries';

  public getRouter(): Router {
    const router = Router()
    router.post('/', auth(), validate({
      body: yup.object().shape({
        content: yup.string().required()
      })
    }), catchAsync(this.createQuery.bind(this)))

    router.get('/', auth(), catchAsync(this.getAll.bind(this)))
    return router
  }

  public async createQuery(req: Request, res: Response): Promise<any> {
    const id = res.locals.user.id
    const query = await this.queryService.create({
      userId: id,
      content: req.body.content
    })
    return res.json({ query: query })
  }

  public async getAll(req: Request, res: Response): Promise<any> {
    const queries = await this.queryService.findByUserId(res.locals.user.id)
    return res.json({
      queries: queries
    })
  }
}