import { injectable, inject, singleton } from 'tsyringe'
import { IAnalysisService, ISentimentService, ITweet, ITwitterAPIService, SentimentReport } from '../interfaces';

export class SentimentService implements ISentimentService {
  constructor(
    @inject('twitter_api_service')
    private readonly apiService: ITwitterAPIService,
    @inject('analysis_service')
    private readonly analysisService: IAnalysisService
  ) { }

  public async getSentiment(term: string, opts?: {
    until: string
  }): Promise<SentimentReport> {
    let until;
    if (opts && opts.until) {
      until = opts.until;
    }
    else {
      until = new Date().toISOString().split('T')[0]
    }
    let tweets: ITweet[] = [];
    const iterations = 2;
    for (let i = 0; i < iterations; i++) {
      const resp = await this.apiService.searchTweets(term, {
        until: until,
        count: 100,
      })
      tweets = [...tweets, ...resp]
    }
    const analysedTweets = await this.analysisService.analyseITweets(tweets);
    const totalTweets = iterations * 100;
    /*
    let posCount = 0;
    let negCount = 0;
    let neuCount = 0;
    let posExampleLeft = 5;
    let negExampleLeft = 5;
    let neuExampleLeft = 5;
    // eslint-disable-next-line
    let posExamples: ITweet[] = []
    // eslint-disable-next-line
    let negExamples: ITweet[] = []
    // eslint-disable-next-line
    let neuExamples: ITweet[] = []

    analysedTweets.forEach(tweet => {
      if (tweet.sentiment === 'positive') {
        posCount = posCount + 1;
        if (posExampleLeft > 0) {
          posExampleLeft = posExampleLeft - 1;
          posExamples.push(tweet)
        }
      }
      if (tweet.sentiment === 'negative') {
        negCount = negCount + 1;
        if (negExampleLeft > 0) {
          negExampleLeft = negExampleLeft - 1;
          negExamples.push(tweet)
        }
      }
      if (tweet.sentiment === 'neutral') {
        neuCount = neuCount + 1;
        if (neuExampleLeft > 0) {
          neuExampleLeft = neuExampleLeft - 1;
          neuExamples.push(tweet)
        }
      }
    })

    const sentimentReport: SentimentReport = {
      sentiments: {
        "positive": (posCount * 100) / totalTweets
      }
    }
  */
    return {} as SentimentReport
  }
}