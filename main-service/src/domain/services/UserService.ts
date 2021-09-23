import { IUserRepository, IUserService } from '../interfaces';
import { injectable, singleton, inject } from 'tsyringe';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(
    @inject('user_repository')
    private readonly userRepo: IUserRepository
  ) {}
}
