import { IUserRepository, IUser } from '../../domain/interfaces';
import { Knex } from 'knex';
import { injectable, singleton, inject } from 'tsyringe';

@injectable()
@singleton()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('knex')
    private readonly knex: Knex
  ) {}

  public async create(createDto: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  }): Promise<IUser> {
    const ts = new Date().getTime();
    const result = await this.knex('users').insert({
      ...createDto,
      created_at: ts,
      updated_at: ts,
    });
    const users = await this.knex('users').where({ id: result[0] });
    return this.mapRowToUser(users[0]);
  }

  public async findOneById(id: number): Promise<IUser | null> {
    const users = await this.knex('users').where({ id: id, is_deleted: false });
    if (users.length === 0) {
      return null;
    }
    return this.mapRowToUser(users[0]);
  }

  public async findOneByUsername(username: string): Promise<IUser | null> {
    const users = await this.knex('users').where({
      username: username,
      is_deleted: false,
    });
    if (users.length === 0) {
      return null;
    }
    return this.mapRowToUser(users[0]);
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.knex('users').where({ is_deleted: false });
    return users.map((row) => this.mapRowToUser(row));
  }

  public async save(user: IUser): Promise<IUser> {
    await this.knex('users').where({ id: user.id }).update({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      updated_at: Date.now(),
      is_deleted: user.isDeleted,
    });
    const users = await this.knex('users').where({ id: user.id });
    return this.mapRowToUser(users[0]);
  }

  public async delete(id: number): Promise<IUser | null> {
    const users = await this.knex('users').where({ id: id, is_deleted: false });
    if (users.length === 0) {
      return null;
    }
    await this.knex('users').where({ id: id }).update({ is_deleted: true });
    const updateUsers = await this.knex('users').where({ id: id });
    return this.mapRowToUser(updateUsers[0]);
  }

  // eslint-disable-next-line
  private mapRowToUser(row: any): IUser {
    return {
      id: row.id,
      firstname: row.firstname,
      lastname: row.lastname,
      username: row.username,
      password: row.password,
      isDeleted: new Boolean(row.is_deleted).valueOf(),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
