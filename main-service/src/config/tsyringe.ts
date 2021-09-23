import { container } from 'tsyringe';
import {
  ILogger,
  IConfigService,
  IUserRepository,
  IUserService,
} from '../domain/interfaces';
import { configServiceInstance } from './configService';
import { loggerInstance } from './logger';
import { errLoggerInstance } from './errorLogger';
import { reqLoggerInstance } from './reqLogger';
import { knexInstance } from './knex';
import { Knex } from 'knex';
import { UserRepository } from '../database/repositories';
import { UserService } from '../domain/services';
import { IBaseController } from '../web/App';
import { AuthController } from '../web/controllers/AuthController';

console.log('config service init');
// config service
container.register<IConfigService>('config_service', {
  useValue: configServiceInstance,
});

//knex
container.register<Knex>('knex', {
  useValue: knexInstance,
});

// logger
container.register<ILogger>('logger', {
  useValue: loggerInstance,
});

// logger
container.register<ILogger>('error_logger', {
  useValue: errLoggerInstance,
});

// logger
container.register<ILogger>('req_logger', {
  useValue: reqLoggerInstance,
});

//user repository
container.register<IUserRepository>('user_repository', {
  useClass: UserRepository,
});

//user service
container.register<IUserService>('user_service', {
  useClass: UserService,
});

//user service
container.register<IBaseController>('auth_controller', {
  useClass: AuthController,
});
