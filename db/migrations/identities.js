exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('identities', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('email').notNullable();
    table.string('name').notNullable();
    table.enum('role', ['admin', 'manager', 'executant']);
    table.uuid('manager_id').references('id').inTable('identities').onDelete('SET NULL');
    table.string('password').notNullable();
    table.integer('loginAttempts').defaultTo(0);
    table.boolean('active').defaultTo(false);
    table.boolean('confirmed').defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.index('email');
    table.unique('email');

    table.check(
      '(role = ? AND manager_id IS NOT NULL) OR (role != ?)',
      ['executant', 'executant'],
      'manager_id_required_for_executant'
    );
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('identities');
};
