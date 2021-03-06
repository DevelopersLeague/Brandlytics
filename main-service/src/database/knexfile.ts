import path from 'path';

const config: { [key: string]: any } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: ':memory:',
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    },
    useNullAsDefault: true,
  },
};

export default config;
