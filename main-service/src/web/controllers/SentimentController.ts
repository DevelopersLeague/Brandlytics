import { Router, Request, Response } from 'express';
import { singleton, injectable, inject } from 'tsyringe'
import * as yup from 'yup'
import { ISentimentService } from '../../domain/interfaces';
import { IBaseController } from '../app';
import { auth, validate } from '../middleware';

@singleton()
@injectable()
export class SentimentController implements IBaseController {
  public path = "/api/v1/sentiment";
  constructor(
    @inject('sentiment_service')
    private readonly sentimentService: ISentimentService
  ) {

  }
  public getRouter(): Router {
    const router = Router()
    router.get('/week', validate({
      query: yup.object().shape({
        term: yup.string().required()
      })
    }), this.getSentiment.bind(this))
    return router;
  }

  public async getSentiment(req: Request, res: Response): Promise<any> {
    let term = ""
    if (req.query.term) {
      term = req.query.term as string
    }
    const resp = await this.sentimentService.getSentiment(term)
    res.json(resp)
  }
}