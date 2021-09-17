import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import '../config/tsyringe';

import { App } from './App';
import {ILogger, IConfigService} from '../domain/interfaces'
import { container } from 'tsyringe';

const cs = container.resolve<IConfigService>('configService');
const logger = container.resolve<ILogger>('logger');


const PORT = Number(cs.get('PORT'));

const app = new App([], container.resolve<ILogger>('error_logger'), container.resolve<ILogger>('req_logger'));

app.expressApp.listen(PORT, () => {
  logger.info(`server started on port: ${PORT}`);
  logger.debug(`server started on port: ${PORT}`);
});
