import { cache, fileCache } from '../config/cache'
import { ITwitterAPIService, ITweet, IConfigService, IAnalysisService } from '../domain/interfaces'
import * as dateFns from 'date-fns'
import { inject, singleton, injectable } from 'tsyringe'
import axios from 'axios'
import { truncate, unwatchFile } from 'fs';

function ISTtoUTC(dateIST: Date): Date {
  const hrms = 1 * 60 * 60 * 1000;
  const minms = 1 * 60 * 1000;
  const date = new Date(dateIST.getTime() - (5 * hrms + 30 * minms))
  return date;
}

function UTCtoIST(dateIST: Date): Date {
  const hrms = 1 * 60 * 60 * 1000;
  const minms = 1 * 60 * 1000;
  const date = new Date(dateIST.getTime() + (5 * hrms + 30 * minms))
  return date;
}

@injectable()
@singleton()
export class TwitterAPIService implements ITwitterAPIService {
  constructor(
    @inject('config_service')
    private readonly configService: IConfigService,
  ) { }
  public async searchTweets(term: string, opts: { until: string, count: number }): Promise<ITweet[]> {
    const params = new URLSearchParams([['until', opts.until], ['q', term], ['count', opts.count.toString()]])
    const url = `https://api.twitter.com/1.1/search/tweets.json?${params.toString()}`
    let tweets: ITweet[];
    const prevTweets = cache.get<ITweet[]>(url)
    if (prevTweets) {
      console.log("chache hit for twitter api service")
      tweets = prevTweets;
    } else {
      console.log("chache miss for twitter api service")
      const resp = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.configService.get('TWITTER_BEARER_TOKEN')}`
        }
      })
      tweets = resp.data.statuses.map((status: any) => {
        const tokens: string[] = status.created_at.split(' ');
        const date = dateFns.parse(tokens[5] + " " + tokens[1] + " " + tokens[2] + " " + tokens[3], "yyyy MMM dd HH:mm:ss", new Date())
        return {
          id: status.id.toString(),
          createdAt: UTCtoIST(date),
          text: status.text,
          username: status.user.screen_name,
          truncated: status.truncated
        }
      })
      cache.set(url, tweets, 2 * 60 * 60)
    }
    return tweets;
  }
}
