import knex from 'knex';
import knexfile from './knexfile';

const instance = knex(knexfile['development']);

instance('users')
  .insert({
    firstname: 'aniket',
    lastname: 'more',
    username: 'aniket_more',
    password: 'test123',
  })
  .then((num) => {
    instance('users')
      .where({ firstname: 'aniket' })
      .then((val) => {
        console.log(val);
      });
  })
  .catch((err) => {
    console.log(err);
  });
