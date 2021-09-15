import { container, instanceCachingFactory } from 'tsyringe';
import { configServiceInstance, ConfigService } from './ConfigService';
import { Logger } from '../web/Logger';

// config service
container.register<ConfigService>('configService', {
  useValue: configServiceInstance,
});

// logger
container.register<Logger>('logger', {
  useFactory: instanceCachingFactory<Logger>((c) => {
    const cs = c.resolve<ConfigService>('configService');
    return new Logger(cs.get('NODE_ENV') == 'development' ? 'debug' : 'info');
  }),
});
