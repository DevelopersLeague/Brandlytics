import { IUserRepository, IUser } from '../../domain/interfaces';
import { Knex } from 'knex';
import { injectable, singleton, inject, injectAll } from 'tsyringe';

@injectable()
@singleton()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('knex')
    private readonly knex: Knex
  ) {}

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

  public async findOneById(id: number): Promise<IUser | null> {
    const users = await this.knex('users').where({ id: id, is_deleted: false });
    if (users.length === 0) {
      return null;
    }
    return this.mapRowToUser(users[0]);
  }

  public async save(user: IUser): Promise<IUser> {
    return {} as IUser;
  }

  public async findAll(): Promise<IUser[]> {
    return [] as IUser[];
  }

  public async delete(id: number): Promise<IUser | null> {
    const ids = await this.knex('users')
      .where({ id: id })
      .update({ is_deleted: true })
      .returning('id');
    if (ids.length == 0) {
      return null;
    }
    const users = await this.knex('users').where({ id: id });
    return this.mapRowToUser(users[0]);
  }

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
