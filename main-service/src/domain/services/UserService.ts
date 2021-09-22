import { IUserRepository, IUserService } from '../interfaces';
import { injectable, singleton, inject } from 'tsyringe';

@injectable()
@singleton()
export class UserService implements Partial<IUserService> {
  constructor(
    @inject('user_repository')
    userRepo: IUserRepository
  ) 
  {}

  /*
  createUser: (userCreateDto: IUserCreateDTO) => Promise<IUser>;
  updateUser: (userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
  deleteUser: (id: number) => Promise<IUser>;
  getUserById: (id: number) => Promise<IUser>;
  getUserByUsername: (username: string) => Promise<IUser>;
  getAllUsers: () => Promise<IUser[]>;
  */
}
