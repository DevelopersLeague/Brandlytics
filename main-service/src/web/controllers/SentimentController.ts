import { Router, Request, Response } from 'express';
import { cache, fileCache } from '../../config/cache'
import { singleton, injectable, inject } from 'tsyringe'
import * as yup from 'yup'
import { ISentimentService, SentimentReport } from '../../domain/interfaces';
import { IBaseController } from '../app';
import { auth, validate } from '../middleware';
import path from 'path'
import { nanoid } from 'nanoid';
import stringify from 'csv-stringify'
import os from 'os'
import fs from 'fs';
import { promisify } from 'util';

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

    router.get('/week/download', validate({
      query: yup.object().shape({
        term: yup.string().required()
      })
    }), this.downloadfile.bind(this))

    return router;
  }

  public async getSentiment(req: Request, res: Response): Promise<any> {
    if (req.query.term) {
      const prev = cache.get<SentimentReport>(req.query.term as string)
      if (prev) {
        res.json(prev)
        return
      }
    }
    let term = ""
    if (req.query.term) {
      term = req.query.term as string
    }
    const resp = await this.sentimentService.getSentiment(term)
    cache.set(term, resp, 12 * 60 * 60)
    res.json(resp)
  }

  public async downloadfile(req: Request, res: Response): Promise<any> {
    let term = ""
    if (req.query.term) {
      term = req.query.term as string
    }
    // check cache for file
    const prev = fileCache.get<string>(term)
    if (prev) {
      res.type("csv")
      res.setHeader(`Content-Disposition`, `attachment; filename="${term}.csv"`)
      res.sendFile(prev)
      return
    }
    // check cache for sentiment result
    let result: SentimentReport
    const isHit = cache.get<SentimentReport>(term)
    if (!isHit) {
      result = await this.sentimentService.getSentiment(term)
      cache.set(term, result, 12 * 60 * 60)
    }
    else {
      result = isHit
    }
    const csvObj = [{ date: "date", positive: "positive", negative: "negative", total: "total" }, ...result.sentiments]
    const filepath = path.join(os.tmpdir(), nanoid() + ".txt")
    stringify(csvObj, (err, val) => {
      if (err) {
        throw err;
      }
      // write file
      fs.writeFileSync(filepath, val)
      // cache file location
      fileCache.set(term, filepath, 12 * 60 * 60)
      //send file
      res.type("csv")
      res.setHeader(`Content-Disposition`, `attachment; filename="${term}.csv"`)
      res.sendFile(filepath)
      return
    })
  }
}