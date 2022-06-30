import axios from 'axios';
import { cache } from '../config/cache'
import fs, { fsyncSync } from 'fs'
import crypto from 'crypto'
import { inject, injectable, singleton } from 'tsyringe'
import { IAnalysedTweet, IAnalysisService, IConfigService, ITweet } from '../domain/interfaces';

@injectable()
@singleton()
export class AnalysisService implements IAnalysisService {

  constructor(
    @inject('config_service')
    private readonly configService: IConfigService
  ) { }

  public async analyseITweets(tweets: ITweet[]): Promise<IAnalysedTweet[]> {
    const tweetsJson = JSON.stringify(tweets)
    const hashKey = crypto.createHash("sha256").update(tweetsJson).digest('hex')
    const prevAnalysedTweets = cache.get<IAnalysedTweet[]>(hashKey)
    if (prevAnalysedTweets) {
      console.log("chache hit for analysis service")
      return prevAnalysedTweets;
    } else {
      console.log("chache miss for analysis service")
      const baseUrl = this.configService.get('SENTIMENT_SERVICE_BASE_URL')
      const resp = await axios.post(`${baseUrl}/api/v1/analyse/tweets`, tweets, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const analysedTweets = resp.data.map((tweet: any) => {
        return { ...tweet, createdAt: new Date(tweet.createdAt) }
      }) as IAnalysedTweet[];
      cache.set<IAnalysedTweet[]>(hashKey, analysedTweets, 24 * 60 * 60);
      return analysedTweets;
    }
  }
}
