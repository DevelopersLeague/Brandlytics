import { SupportOptionRange } from 'prettier';

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
  text: string;
  userId: number;
  categoryId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: number;
  name: string;
  userId: number;
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

export interface IQueryRepository extends IRepository<IQuery> {
  findByUserId: (userid: number) => Promise<IQuery[]>;
}

export interface ICategoryRepository extends IRepository<ICategory> {
  findByUserId: (userid: number) => Promise<IQuery[]>;
}
