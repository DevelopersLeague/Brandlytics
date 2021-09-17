import { Logger, makeFileStrategy } from '../web/Logger';
import { makeConsoleStrategy } from '../web/Logger';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const loggerInstance = new Logger(
  NODE_ENV === 'development' ? 'debug' : 'info'
);

loggerInstance.addStrategy(makeConsoleStrategy());
if (NODE_ENV == 'production') {
  loggerInstance.addStrategy(makeFileStrategy('logs/general.json.log'));
}
