import { Logger } from '../web/Logger';
import { makeConsoleStrategy } from '../web/Logger';

export const reqLoggerInstance = new Logger('info');

reqLoggerInstance.addStrategy(makeConsoleStrategy());
