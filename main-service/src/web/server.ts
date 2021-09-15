import { App } from './App';
import { ConfigService } from './ConfigService';
import { Logger, makeConsoleStrategy, makeFileStrategy } from './Logger';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const cs = new ConfigService({
  rootdir: path.join(__dirname, '..', '..'),
});

const logger = new Logger('info');
logger.addStrategy(makeConsoleStrategy());
// logger.addStrategy(
//   makeFileStrategy(path.join(cs.get('rootdir'), 'general.json.log'))
// );

const PORT = Number(cs.get('PORT'));

const app = new App([]);

app.expressApp.listen(PORT, () => {
  logger.info(`server started on port: ${PORT}`);
});
