import { Logger } from '../web/Logger';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const loggerInstance = new Logger(
  NODE_ENV === 'development' ? 'debug' : 'info'
);