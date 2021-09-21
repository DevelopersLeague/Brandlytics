import { container } from 'tsyringe';
import { ILogger, IConfigService } from '../domain/interfaces';
import { configServiceInstance } from './configService';
import { loggerInstance } from './logger';
import { errLoggerInstance } from './errorLogger';
import { reqLoggerInstance } from './reqLogger';
import { knexInstance } from './knex';
import { Knex } from 'knex';

// config service
container.register<IConfigService>('configService', {
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
