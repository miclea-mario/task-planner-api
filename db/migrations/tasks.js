exports.up = async function (knex) {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title').notNullable();
    table.text('description').notNullable();
    table
      .enum('status', ['open', 'pending', 'completed', 'closed'])
      .notNullable()
      .defaultTo('open');
    table
      .uuid('creator_id')
      .notNullable()
      .references('id')
      .inTable('identities')
      .onDelete('CASCADE');
    table.uuid('assignee_id').references('id').inTable('identities').onDelete('SET NULL');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.index('creator_id');
    table.index('assignee_id');
    table.index('status');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('tasks');
};
