import { Logger } from '../web/Logger';
import { makeFileStrategy, makeConsoleStrategy } from '../web/Logger';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const errLoggerInstance = new Logger('error');

errLoggerInstance.addStrategy(makeConsoleStrategy());
if (NODE_ENV == 'production') {
  errLoggerInstance.addStrategy(makeFileStrategy('logs/error.json.log'));
}
