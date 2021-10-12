import { IUserSignupDTO, IUser, IUserUpdateDTO, IUserLoginDTO, IQueryCreateDTO, IQueryUpdateDTO, IQueryRespDTO } from './index';

export interface IUserService {
  signup: (userCreateDto: IUserSignupDTO) => Promise<string>;
  login: (userLoginDto: IUserLoginDTO) => Promise<string>;
  deleteUser: (id: number) => Promise<IUser>;
  updateUser: (id: number, userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
}

export interface IQueryService {
  create: (dto: IQueryCreateDTO) => Promise<IQueryRespDTO>;
  update: (dto: IQueryUpdateDTO) => Promise<IQueryRespDTO>;
  delete: (id: number) => Promise<IQueryRespDTO>
  findByUserId: (id: number) => Promise<IQueryRespDTO[]>
  findById: (id: number) => Promise<IQueryRespDTO>
}

export type ITweet = { id: string; text: string; createdAt: Date; username: string, truncated: boolean };

export interface ITwitterAPIService {
  searchTweets: (
    term: string,
    options: {
      until: string,
      count: number
    }
  ) => Promise<ITweet[]>

}

export type IAnalysedTweet = {
  id: string;
  text: string;
  createdAt: Date;
  username: string;
  sentiment: string;
  truncated: boolean;
};

export interface IAnalysisService {
  // analyseITweet: (tweet: ITweet) => Promise<IAnalysedITweet>;
  analyseITweets: (tweets: ITweet[]) => Promise<IAnalysedTweet[]>;
}

export type SentimentItem = {
  date: string,
  positive: number,
  negative: number
  total: number
}

export type SentimentReport = {
  sentiments: SentimentItem[]
  examples: { [key: string]: ITweet[] }
}

export interface ISentimentService {
  getSentiment: (term: string) => Promise<SentimentReport>
}