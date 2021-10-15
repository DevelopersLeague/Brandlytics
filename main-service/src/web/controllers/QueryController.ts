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

    router.get('/', auth(), catchAsync(this.getAll.bind(this)))

    router.get('/categories', auth(), catchAsync(this.getCategories.bind(this)))

    router.post('/', auth(), validate({
      body: yup.object().shape({
        content: yup.string().required(),
        category: yup.string().required()
      })
    }), catchAsync(this.createQuery.bind(this)))

    router.patch('/:id', auth(), validate({
      params: yup.object().shape({
        id: yup.string().required()
      }),
      body: yup.object().shape({
        content: yup.string(),
        category: yup.string()
      })
    }), catchAsync(this.updateQuery.bind(this)))

    router.delete('/:id', auth(), validate({
      params: yup.object().shape({
        id: yup.string().required()
      }),
    }), catchAsync(this.deleteQuery.bind(this)))

    return router
  }

  public async createQuery(req: Request, res: Response): Promise<any> {
    const id = res.locals.user.id
    const query = await this.queryService.create({
      userId: id,
      content: req.body.content,
      category: req.body.category
    })
    return res.json({ query: query })
  }

  public async getAll(req: Request, res: Response): Promise<any> {
    const queries = await this.queryService.findByUserId(res.locals.user.id)
    return res.json({
      queries: queries
    })
  }

  public async deleteQuery(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const query = await this.queryService.delete(Number(id))
    res.json({ query })
    return
  }

  public async updateQuery(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const query = await this.queryService.update({
      id: Number(id),
      content: req.body.content,
      category: req.body.category
    })
    res.json({ query })
  }

  public async getCategories(req: Request, res: Response): Promise<any> {
    const cats = await this.queryService.getCategories(res.locals.user.id)
    return res.json({ categories: cats })
  }
}