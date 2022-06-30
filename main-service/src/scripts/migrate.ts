import { loadEnv } from '../config/env';
loadEnv('.env.json');
import { knexInstance } from '../config/knex';

async function main(): Promise<void> {
  console.log("executing")
  if (process.argv[2] === 'up') {
    await knexInstance.migrate.latest();
  } else if (process.argv[2] === 'down') {
    await knexInstance.migrate.down();
  } else {
    throw new Error('invalid arguments');
  }
}
main()
  .then(() => {
    console.log('Migration Complete');
    process.exit();
  })
  .catch((err) => console.log(err));
