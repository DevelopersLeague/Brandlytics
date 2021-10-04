// config
import 'reflect-metadata';
import { loadEnv } from '../config/env';
loadEnv('.env.json');
import '../config/tsyringe';
// import { configServiceInstance as cs } from '../config/configService';
// import { loggerInstance as logger } from '../config/logger';

// setup
import { App, IBaseController } from './app';
import { ILogger, IConfigService } from '../domain/interfaces';
import { container } from 'tsyringe';

const cs = container.resolve<IConfigService>('config_service');
const logger = container.resolve<ILogger>('logger');

const PORT = Number(cs.get('PORT'));

const authController = container.resolve<IBaseController>('auth_controller');
const sentimentController = container.resolve<IBaseController>('sentiment_controller');

const app = new App(
  [authController, sentimentController],
  container.resolve<ILogger>('error_logger'),
  container.resolve<ILogger>('req_logger')
);

app.expressApp.listen(PORT, () => {
  logger.info(`server started on port: ${PORT}`);
});
