import { IUserSignupDTO, IUser, IUserUpdateDTO, IUserLoginDTO } from './index';

export interface IUserService {
  signup: (userCreateDto: IUserSignupDTO) => Promise<string>;
  login: (userLoginDto: IUserLoginDTO) => Promise<string>;
  deleteUser: (id: number) => Promise<IUser>;
  updateUser: (id: number, userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
}

export type ITweet = { id: string; text: string; createdAt: Date; username: string };

export interface ITweeterAPIService {
  searchTweets: (
    term: string,
    options: {
      until: string,
      count: number
    }
  ) => Promise<ITweet[]>

}

export type IAnalysedITweet = {
  id: string;
  text: string;
  createdAt: Date;
  username: string;
  sentiment: string;
  confidence: number;
};

export interface IAnalysisService {
  analyseITweet: (tweet: ITweet) => Promise< IAnalysedITweet>;
  analyseITweets: (tweets: ITweet[]) => Promise<IAnalysedITweet[]>;
}
