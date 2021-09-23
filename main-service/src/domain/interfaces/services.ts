import { IUserCreateDTO, IUser, IUserUpdateDTO } from './index';

export interface IUserService {
  createUser: (userCreateDto: IUserCreateDTO) => Promise<IUser>;
  updateUser: (id: number,userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
  deleteUser: (id: number) => Promise<IUser>;
  getUserById: (id: number) => Promise<IUser>;
  getUserByUsername: (username: string) => Promise<IUser>;
  getAllUsers: () => Promise<IUser[]>;
}
