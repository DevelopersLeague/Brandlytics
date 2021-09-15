import { container } from 'tsyringe';
import { ConfigService } from '../domain/services/ConfigService';
import { configServiceInstance } from './configservice';
import { Logger } from '../web/Logger';
import { loggerInstance } from './logger';

// config service
container.register<ConfigService>('configService', {
  useValue: configServiceInstance,
});

// logger
container.register<Logger>('logger', {
  useValue: loggerInstance,
});
