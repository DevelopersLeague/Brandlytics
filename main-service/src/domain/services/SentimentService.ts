import { injectable, inject, singleton } from 'tsyringe'
import { IAnalysedTweet, IAnalysisService, ISentimentService, ITweet, ITwitterAPIService, SentimentItem, SentimentReport } from '../interfaces';

@injectable()
@singleton()
export class SentimentService implements ISentimentService {
  constructor(
    @inject('twitter_api_service')
    private readonly apiService: ITwitterAPIService,
    @inject('analysis_service')
    private readonly analysisService: IAnalysisService
  ) { }

  public async getSentiment(term: string): Promise<SentimentReport> {
    const oneWeekBack = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    let date = new Date(oneWeekBack.getTime() + 1 * 24 * 60 * 60 * 1000);
    const tweets: IAnalysedTweet[] = []
    const tweetsMap: { [key: string]: IAnalysedTweet[] } = {}
    for (let i = 0; i < 7; i++) {
      // date is one day ahead of expected date for tweets because of the behaviour of the api
      // fetch tweets for each date
      const respTweets: ITweet[] = []
      for (let i = 0; i < 1; i++) {
        const resp = await this.apiService.searchTweets(term, {
          until: date.toISOString().split('T')[0],
          count: 100
        })
        let flag = true;
        respTweets.push(...resp.filter(tweet => {
          if (flag) {
            flag = false
          }
          if (tweet.truncated) {
            return false
          }
          else {
            return true
          }
        }))
      }

      // analyse them
      const analysed = await this.analysisService.analyseITweets(respTweets);
      // collect them
      tweetsMap[(new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]] = analysed
      date = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    }
    const report: SentimentReport = {
      sentiments: [],
      examples: {
        "positive": [],
        "negative": [],
      }
    }
    const examplesSize = 5;
    // sort them in right date if not ordered
    Object.keys(tweetsMap).forEach((key) => {
      const reportItem: SentimentItem = {
        date: key,
        positive: 0,
        negative: 0,
        total: 0
      }
      tweetsMap[key].forEach((tweet, index) => {
        if (tweet.sentiment === "positive") {
          reportItem.positive += 1;
          if (report.examples['positive'].length < examplesSize) {
            report.examples['positive'].push(tweet);
          }
        }
        if (tweet.sentiment === "negative") {
          reportItem.negative += 1;
          if (report.examples['negative'].length < examplesSize) {
            report.examples['negative'].push(tweet);
          }
        }
        reportItem.total += 1;
      })
      report.sentiments.push(reportItem)
    })
    return report;
  }
}