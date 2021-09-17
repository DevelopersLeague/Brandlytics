// config
import 'reflect-metadata';
import { loadEnv } from '../config/env';
loadEnv('.env');
import '../config/tsyringe';

// setup
import { App } from './App';
import { ILogger, IConfigService } from '../domain/interfaces';
import { container } from 'tsyringe';

const cs = container.resolve<IConfigService>('configService');
const logger = container.resolve<ILogger>('logger');

const PORT = Number(cs.get('PORT'));

const app = new App(
  [],
  container.resolve<ILogger>('error_logger'),
  container.resolve<ILogger>('req_logger')
);

app.expressApp.listen(PORT, () => {
  logger.info(`server started on port: ${PORT}`);
});
