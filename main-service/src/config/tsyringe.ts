import { container } from 'tsyringe';
import {
  ILogger,
  IConfigService,
  IUserRepository,
  IUserService,
  ITwitterAPIService,
  IAnalysisService,
  ISentimentService,
  IQueryRepository,
  IQueryService,
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
import { QueryController } from '../web/controllers/QueryController';
import { TwitterAPIService } from '../external/TwitterAPIService';
import { AnalysisService } from '../external/AnalyseService';
import { MockAnalysisService } from '../external/mockAnalyseService';
import { SentimentService } from '../domain/services/SentimentService';
import { SentimentController } from '../web/controllers/SentimentController';
import { QueryRepository } from '../database/repositories/QueryRepository';
import { QueryService } from '../domain/services/QueryService';

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

//query repository
container.register<IQueryRepository>('query_repository', {
  useClass: QueryRepository,
});

//query service
container.register<IQueryService>('query_service', {
  useClass: QueryService
});

//query controller
container.register<IBaseController>('query_controller', {
  useClass: QueryController
});

// twitter api service
container.register<ITwitterAPIService>('twitter_api_service', {
  useClass: TwitterAPIService,
})

// analysis service
// container.register<IAnalysisService>('analysis_service', {
//   useClass: AnalysisService
// })

// mock analysis service
container.register<IAnalysisService>('analysis_service', {
  useClass: MockAnalysisService
})

// sentiment service
container.register<ISentimentService>('sentiment_service', {
  useClass: SentimentService
})

// sentiment service
container.register<IBaseController>('sentiment_controller', {
  useClass: SentimentController
})

