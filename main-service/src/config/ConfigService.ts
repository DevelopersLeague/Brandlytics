import { IConfigService } from '../domain/interfaces';
import path from 'path';

export class ConfigService implements IConfigService {
  private map: { [key: string]: string };

  constructor(map?: { [key: string]: string }) {
    if (map === undefined) {
      map = {};
    }
    this.map = map;
  }

  get(key: string): string {
    if (process.env[key] !== undefined) {
      return process.env[key]!;
    } else if (this.map[key] !== undefined) {
      return this.map[key];
    } else {
      throw new Error(`${key} has no value associated with it`);
    }
  }
}

export const configServiceInstance = new ConfigService({
  rootdir: path.join(__dirname, '..', '..'),
});
