import { IQueryRepository, IQuery, createQueryDto } from '../../domain/interfaces';
import { Knex } from 'knex';
import { injectable, singleton, inject } from 'tsyringe';

@injectable()
@singleton()
export class QueryRepository implements IQueryRepository {

  constructor(
    @inject('knex')
    private readonly knex: Knex
  ) { }

  public async create(dto: createQueryDto): Promise<IQuery> {
    const ts = Date.now();
    const result = await this.knex('queries').insert({
      ...dto,
      created_at: ts,
      updated_at: ts,
    });
    const queries = await this.knex('queries').where({ id: result[0] });
    return this.mapRowToQuery(queries[0]);
  }

  public async findOneById(id: number): Promise<IQuery | null> {
    const queries = await this.knex('queries').where({ id: id, is_deleted: false });
    if (queries.length === 0) {
      return null;
    }
    return this.mapRowToQuery(queries[0]);
  }

  public async findByUserId(userId: number): Promise<IQuery[]> {
    const queries = await this.knex('queries').where({
      user_id: userId,
      is_deleted: false,
    }).orderBy('updated_at', 'desc');
    return queries.map((row) => this.mapRowToQuery(row));
  }

  public async findAll(): Promise<IQuery[]> {
    const queries = await this.knex('queries')
      .where({ is_deleted: false })
      .orderBy('updated_at', 'desc');
    return queries.map((row) => this.mapRowToQuery(row));
  }

  public async save(query: IQuery): Promise<IQuery> {
    await this.knex('queries').where({ id: query.id }).update({
      content: query.content,
      user_id: query.userId,
      updated_at: Date.now(),
      is_deleted: query.isDeleted,
    });
    const queries = await this.knex('queries').where({ id: query.id });
    return this.mapRowToQuery(queries[0]);
  }

  public async delete(id: number): Promise<IQuery | null> {
    const queries = await this.knex('queries').where({ id: id, is_deleted: false });
    if (queries.length === 0) {
      return null;
    }
    await this.knex('queries')
      .where({ id: id })
      .update({ is_deleted: true, updated_at: Date.now() });
    const updateUsers = await this.knex('queries').where({ id: id });
    return this.mapRowToQuery(updateUsers[0]);
  }

  private mapRowToQuery(row: any): IQuery {
    return {
      id: row.id,
      content: row.content,
      userId: row.user_id,
      isDeleted: new Boolean(row.is_deleted).valueOf(),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }
  }
}
