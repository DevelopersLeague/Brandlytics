import {
  IConfigService,
  IUser,
  IUserLoginDTO,
  IUserRepository,
  IUserService,
  IUserSignupDTO,
  IUserUpdateDTO,
} from '../interfaces';
import { injectable, singleton, inject } from 'tsyringe';
import * as jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { APIError } from '../utils';

@injectable()
@singleton()
export class UserService implements IUserService {
  constructor(
    @inject('user_repository')
    private readonly userRepo: IUserRepository,
    @inject('config_service')
    private readonly configService: IConfigService
  ) {}

  /**
   *@description creates user and returns jwt token
   */
  public async signup(dto: IUserSignupDTO): Promise<string> {
    const existing = await this.userRepo.findOneByUsername(dto.username);
    if (existing) {
      throw APIError.invalidRequest('username already taken');
    }
    const passHash = await hash(dto.password, 10);
    const user = await this.userRepo.create({
      username: dto.username,
      firstname: dto.firstname,
      lastname: dto.lastname,
      password: passHash,
    });
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      this.configService.get('SECRET_KEY'),
      {
        expiresIn: '2d',
      }
    );
    return token;
  }

  /**
   * @description checks the password and returns a signed token
   */
  public async login(dto: IUserLoginDTO): Promise<string> {
    const user = await this.userRepo.findOneByUsername(dto.username);
    if (!user) {
      throw APIError.notFound('user not found');
    }
    const isValid = await compare(dto.password, user.password);
    if (!isValid) {
      throw APIError.unauthorized('invalid password');
    }
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      this.configService.get('SECRET_KEY'),
      {
        expiresIn: '2d',
      }
    );
    return token;
  }

  /**
   * @description deletes user
   */
  public async deleteUser(id: number): Promise<IUser> {
    const user = await this.userRepo.delete(id);
    if (!user) {
      throw APIError.notFound('user not foudnd');
    }
    return user;
  }

  /**
   * @description updates user details
   */
  public async updateUser(id: number, dto: IUserUpdateDTO): Promise<IUser> {
    const user = await this.userRepo.findOneById(id);
    if (!user) {
      throw APIError.notFound('user not found');
    }
    const newUser = { ...user };
    if (dto.firstname) {
      newUser.firstname = dto.firstname;
    }
    if (dto.lastname) {
      newUser.lastname = dto.lastname;
    }
    if (dto.username) {
      newUser.username = dto.username;
    }
    if (dto.password) {
      newUser.password = dto.password;
    }
    const updatedUser = await this.userRepo.save(user);
    return updatedUser;
  }
}
