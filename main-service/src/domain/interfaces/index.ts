export * from './services';
export * from './dto';

export interface IAPIError extends Error {
  statusCode: number;
}

export interface IConfigService {
  get: (key: string) => string;
}

export type LogLevel = 'debug' | 'info' | 'warning' | 'error';

export interface ILogger {
  /* eslint-disable */
  log: (logLevel: LogLevel, message: string, logObj?: any) => Promise<void>;
  debug: (message: string, logObj?: any) => Promise<void>;
  info: (message: string, logObj?: any) => Promise<void>;
  warning: (message: string, logObj?: any) => Promise<void>;
  error: (message: string, logObj?: any) => Promise<void>;
  /* eslint-enable */
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuery {
  id: number;
  content: string;
  userId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRepository<T> {
  save: (entity: T) => Promise<T>;
  findAll: () => Promise<T[]>;
  findOneById: (id: number) => Promise<T | null>;
  delete: (id: number) => Promise<T | null>;
}

export interface IUserRepository extends IRepository<IUser> {
  create: (createDto: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  }) => Promise<IUser>;
  findOneByUsername: (username: string) => Promise<IUser | null>;
}

export type createQueryDto = { content: string, user_id: number }

export interface IQueryRepository extends IRepository<IQuery> {
  findByUserId: (userid: number) => Promise<IQuery[]>;
  create: (dto: createQueryDto) => Promise<IQuery>
}
