// Update with your config settings.

const config = {
  development: {
    client: 'postgresql',
    connection:
      'postgres://jrancgdllfsrxr:1ac49ca99e7c8f0e69d1bd558aa09ac306c87c435dba9ff2576dea4071f6c4cf@ec2-52-45-73-150.compute-1.amazonaws.com:5432/dej613uj569bko',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
