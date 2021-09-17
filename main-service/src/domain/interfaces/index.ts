export interface IAPIError extends Error {
  statusCode: number;
}

export interface IConfigService {
  get: (key: string) => string;
}

export type LogLevel = 'debug' | 'info' | 'warning' | 'error';

export interface ILogger {
  log: (logLevel: LogLevel, message: string, logObj?: any) => Promise<void>;
  debug: (message: string, logObj?: any) => Promise<void>;
  info: (message: string, logObj?: any) => Promise<void>;
  warning: (message: string, logObj?: any) => Promise<void>;
  error: (message: string, logObj?: any) => Promise<void>;
}

export interface IRepository<T> {
  create: () => Promise<T>;
  save: (entity: T) => Promise<T>;
  findAll: () => Promise<T[]>;
  findOneById: (id: number) => Promise<T>;
  delete: (id: number) => Promise<T>;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  isDeleted: boolean;
}

export interface IQuery {
  id: number;
  name: string;
  query: string;
  userId: number;
  categoryId: number;
  isDeleted: boolean;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IUserRepository extends IRepository<IUser> {
  findByUsername: (username: string) => Promise<IUser>;
}

// eslint-disable-next-line
export interface IQueryRepository extends IRepository<IQuery> {}

//eslint-disable-next-line
export interface IQueryRepository extends IRepository<IQuery> {}
