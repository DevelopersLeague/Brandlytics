import { IConfigService } from '../interfaces';

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
      //eslint-disable-next-line
      return process.env[key]!;
    } else if (this.map[key] !== undefined) {
      return this.map[key];
    } else {
      throw new Error(`${key} has no value associated with it`);
    }
  }
}

