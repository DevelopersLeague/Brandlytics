import {ConfigService} from '../domain/services/ConfigService';
import path from 'path';

export const configServiceInstance = new ConfigService({
  rootdir: path.join(__dirname, '..', '..'),
});