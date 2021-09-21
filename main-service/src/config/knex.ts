import knex, { Knex } from 'knex';
import knexfile from '../database/knexfile';

export let knexInstance: Knex;

switch (process.env.NODE_ENV) {
  case 'production':
    knexInstance = knex(knexfile['production']);
    break;
  case 'test':
    knexInstance = knex(knexfile['test']);
    break;
  default:
    knexInstance = knex(knexfile['development']);
    break;
}
