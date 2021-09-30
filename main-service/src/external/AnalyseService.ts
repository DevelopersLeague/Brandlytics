import axios from 'axios';
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
    const baseUrl = this.configService.get('SENTIMENT_SERVICE_BASE_URL')
    const resp = await axios.post(`${baseUrl}/api/v1/analyse/tweets/`, tweets, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return resp.data as IAnalysedTweet[];
  }
}