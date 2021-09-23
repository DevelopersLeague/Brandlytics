import {
  IUser,
  IUserCreateDTO,
  IUserRepository,
  IUserService,
  IUserUpdateDTO,
} from '../interfaces';
import { injectable, singleton, inject } from 'tsyringe';
import { CustomPromisifyLegacy } from 'util';
import { APIError } from '../utils';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(
    @inject('user_repository')
    private readonly userRepo: IUserRepository
  ) {}

  public async createUser(dto: IUserCreateDTO): Promise<IUser> {
    console.log(this.userRepo);
    const existingUser = await this.userRepo.findOneByUsername(dto.username);
    if (existingUser) {
      throw APIError.invalidRequest('username already taken');
    }
    const user = this.userRepo.create(dto);
    return user;
  }

  public async deleteUser(id: number): Promise<IUser> {
    const user = await this.userRepo.delete(id);
    if (!user) {
      throw APIError.notFound('user not found');
    }
    return user;
  }

  public async updateUser(id: number, dto: IUserUpdateDTO): Promise<IUser> {
    return {} as IUser;
  }

  public async getUserById(id: number): Promise<IUser> {
    const user = await this.userRepo.findOneById(id);
    if (!user) {
      throw APIError.notFound('user not found');
    }
    return user;
  }

  public async getUserByUsername(username: string): Promise<IUser> {
    const user = await this.userRepo.findOneByUsername(username);
    if (!user) {
      throw APIError.notFound('user not found');
    }
    return user;
  }

  public async getAllUsers(): Promise<IUser[]> {
    return [] as IUser[];
  }

  /*
  createUser: (userCreateDto: IUserCreateDTO) => Promise<IUser>;
  updateUser: (userUpdateDto: IUserUpdateDTO) => Promise<IUser>;
  deleteUser: (id: number) => Promise<IUser>;
  getUserById: (id: number) => Promise<IUser>;
  getUserByUsername: (username: string) => Promise<IUser>;
  getAllUsers: () => Promise<IUser[]>;
  */
}
