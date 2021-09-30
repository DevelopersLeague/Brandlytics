import { container } from 'tsyringe';
import {
  ILogger,
  IConfigService,
  IUserRepository,
  IUserService,
  ITwitterAPIService,
  IAnalysisService,
} from '../domain/interfaces';
import { configServiceInstance } from './configservice';
import { loggerInstance } from './logger';
import { errLoggerInstance } from './errorLogger';
import { reqLoggerInstance } from './reqLogger';
import { knexInstance } from './knex';
import { Knex } from 'knex';
import { UserRepository } from '../database/repositories';
import { UserService } from '../domain/services';
import { IBaseController } from '../web/app';
import { AuthController } from '../web/controllers/AuthController';
import { TwitterAPIService } from '../external/TwitterAPIService';
import { AnalysisService } from '../external/AnalyseService';

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

//user controller
container.register<IBaseController>('auth_controller', {
  useClass: AuthController,
});

// twitter api service
container.register<ITwitterAPIService>('twitter_api_service', {
  useClass: TwitterAPIService,
})

// analysis service
container.register<IAnalysisService>('analysis_service', {
  useClass: AnalysisService
})

// sentiment service
