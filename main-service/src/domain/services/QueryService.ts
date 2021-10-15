import { id } from 'date-fns/locale';
import { injectable, singleton, inject } from 'tsyringe';
import { IQueryCreateDTO, IQueryUpdateDTO, IQueryRespDTO, IQueryRepository, IQuery } from '../interfaces'
import { IQueryService } from '../interfaces'
import { APIError } from '../utils';

@injectable()
@singleton()
export class QueryService implements IQueryService {
  constructor(
    @inject('query_repository')
    private readonly queryRepo: IQueryRepository,
  ) { }

  public async create(dto: IQueryCreateDTO): Promise<IQueryRespDTO> {
    const query = await this.queryRepo.create({
      user_id: dto.userId,
      content: dto.content,
      category: dto.category
    })
    return this.mapQueryToResp(query)
  }

  public async update(dto: IQueryUpdateDTO): Promise<IQueryRespDTO> {
    //eslint-disable-next-line
    let query = await this.queryRepo.findOneById(dto.id)
    if (!query) {
      throw APIError.invalidRequest("query not found")
    }
    if (dto.content) {
      query.content = dto.content
    }
    if (dto.category) {
      query.category = dto.category
    }
    const updated = await this.queryRepo.save(query);
    return this.mapQueryToResp(updated)
  }


  public async delete(id: number): Promise<IQueryRespDTO> {
    const query = await this.queryRepo.delete(id)
    if (!query) {
      throw APIError.invalidRequest('query not found')
    }
    return this.mapQueryToResp(query)
  }

  public async findByUserId(id: number): Promise<IQueryRespDTO[]> {
    const queries = await this.queryRepo.findByUserId(id);
    return queries.map(query => this.mapQueryToResp(query))
  }

  public async findById(id: number): Promise<IQueryRespDTO> {
    const query = await this.queryRepo.findOneById(id);
    if (!query) {
      throw APIError.invalidRequest('query not found')
    }
    return this.mapQueryToResp(query);
  }

  public async getCategories(userId: number): Promise<string[]> {
    const queries = await this.queryRepo.findByUserId(userId);
    const st: Set<string> = new Set();
    queries.forEach(query => {
      st.add(query.category)
    })
    //eslint-disable-next-line
    let cats: string[] = []
    st.forEach(val => {
      cats.push(val)
    })
    return cats
  }

  private mapQueryToResp(query: IQuery): IQueryRespDTO {
    return {
      id: query.id,
      content: query.content,
      category: query.category,
      userId: query.userId,
      createdAt: query.createdAt.toISOString(),
      updatedAt: query.updatedAt.toISOString()
    }
  }
}