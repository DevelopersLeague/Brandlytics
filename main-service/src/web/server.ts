import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import '../config/tsyringe';

import { App } from './App';
import { ConfigService } from '../domain/services/ConfigService';
import { Logger, makeConsoleStrategy, makeFileStrategy } from './Logger';
import { container } from 'tsyringe';

const cs = container.resolve<ConfigService>('configService');

const logger = container.resolve<Logger>('logger');

logger.addStrategy(makeConsoleStrategy());

const PORT = Number(cs.get('PORT'));

const app = new App([]);

app.expressApp.listen(PORT, () => {
  logger.info(`server started on port: ${PORT}`);
  logger.debug(`server started on port: ${PORT}`);
});
