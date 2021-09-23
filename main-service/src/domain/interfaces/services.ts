import { IUserSignupDTO, IUser, IUserUpdateDTO, IUserLoginDTO } from './index';

export interface IUserService {
  signup: (userCreateDto: IUserSignupDTO) => Promise<string>;
  login: (userLoginDto: IUserLoginDTO) => Promise<string>;
  deleteUser: (id: number) => Promise<IUser>;
  updateUser: (id: number, userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
}
