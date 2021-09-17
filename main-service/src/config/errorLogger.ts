import { Logger } from '../web/Logger';
import { makeFileStrategy, makeConsoleStrategy } from '../web/Logger';

export const errLoggerInstance = new Logger("error");

errLoggerInstance.addStrategy(makeFileStrategy("logs/error.json.log"));
errLoggerInstance.addStrategy(makeConsoleStrategy());
