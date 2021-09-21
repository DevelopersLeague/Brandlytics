import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().unique().notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('username').notNullable().unique();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.string('password').notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
