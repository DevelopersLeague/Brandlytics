import { ITwitterAPIService, ITweet, IConfigService, IAnalysisService } from '../domain/interfaces'
import { inject, singleton, injectable } from 'tsyringe'
import axios from 'axios'

@injectable()
@singleton()
export class TwitterAPIService implements ITwitterAPIService {
  constructor(
    @inject('config_service')
    private readonly configService: IConfigService,
    @inject('analysis_service')
    private readonly analysisService: IAnalysisService
  ) { }
  public async searchTweets(term: string, opts: { until: string, count: number }): Promise<ITweet[]> {
    const params = new URLSearchParams([['until', opts.until], ['q', encodeURIComponent(term)], ['count', opts.count.toString()]])
    const resp = await axios.get(`https://api.twitter.com/1.1/search/tweets.json?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${this.configService.get('TWITTER_BEARER_TOKEN')}`
      }
    })
    const tweets: ITweet[] = resp.data.statuses.map((status: any) => {
      return {
        id: status.id,
        createdAt: new Date(),
        text: status.text,
        username: status.user.screen_name
      }
    })
    return tweets;
  }
}