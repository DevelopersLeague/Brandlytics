
import { inject, injectable, singleton } from 'tsyringe'
import { IAnalysedTweet, IAnalysisService, IConfigService, ITweet } from '../domain/interfaces';

@injectable()
@singleton()
export class MockAnalysisService implements IAnalysisService {

  public async analyseITweets(tweets: ITweet[]): Promise<IAnalysedTweet[]> {
    //eslint-disable-next-line
    let val: IAnalysedTweet[] = [];
    tweets.forEach(tweet => {
      let sentiment = "positive"
      if (Math.random() >= 0.5) {
        sentiment = "negative"
      }
      val.push({
        ...tweet,
        sentiment
      })
    })
    return val;
  }
}