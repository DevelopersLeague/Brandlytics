import { IUserSignupDTO, IUser, IUserUpdateDTO, IUserLoginDTO } from './index';

export interface IUserService {
  signup: (userCreateDto: IUserSignupDTO) => Promise<string>;
  login: (userLoginDto: IUserLoginDTO) => Promise<string>;
  deleteUser: (id: number) => Promise<IUser>;
  updateUser: (id: number, userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
}

type Tweet = { id: string; text: string; createdAt: Date; username: string };

export interface ITweeterAPIService {
  searchTweets: (
    term: string,
    options: {
      until: string;
    }
  ) => Tweet[];
}

type AnalysedTweet = {
  id: string;
  text: string;
  createdAt: Date;
  username: string;
  sentiment: string;
  confidence: number;
};

export interface IAnalysisService {
  analyseTweet: (tweet: Tweet) => AnalysedTweet;
  analyseTweets: (tweets: Tweet[]) => AnalysedTweet[];
}
