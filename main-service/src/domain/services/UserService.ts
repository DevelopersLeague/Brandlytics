import {
  IUser,
  IUserSignupDTO,
  IUserLoginDTO,
  IUserRepository,
  IUserService,
  IUserUpdateDTO,
} from '../interfaces';
import { injectable, singleton, inject } from 'tsyringe';
import { APIError } from '../utils';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(
    @inject('user_repository')
    private readonly userRepo: IUserRepository
  ) {}
}
