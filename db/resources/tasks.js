const { knex } = require('../../db');

module.exports = async () => {
  const managers = await knex('identities').select('id').where('role', '=', 'manager');
  const executants = await knex('identities').select('id').where('role', '=', 'executant');

  if (managers.length === 0 || executants.length === 0) {
    throw new Error(
      'No managers or executants available to assign tasks. Please seed identities first.'
    );
  }

  const managerId = managers[0].id;
  const executantId = executants[0].id;

  return [
    {
      title: 'Design Homepage',
      description: 'Create a modern and responsive homepage design.',
      status: 'open',
      creator_id: managerId, // Must be a manager
      assignee_id: null, // OPEN tasks have no assignee
      created_at: new Date(),
    },
    {
      title: 'Develop Authentication Module',
      description: 'Implement login and registration features.',
      status: 'pending',
      creator_id: managerId, // Must be a manager
      assignee_id: executantId, // PENDING tasks must have an executant assignee
      created_at: new Date(),
    },
    {
      title: 'Fix Critical Bug #123',
      description: 'Resolve the critical bug reported in production.',
      status: 'completed',
      creator_id: managerId, // Must be a manager
      assignee_id: executantId, // COMPLETED tasks may have an assignee
      created_at: new Date(),
    },
    {
      title: 'Prepare Project Documentation',
      description: 'Write comprehensive documentation for the project.',
      status: 'closed',
      creator_id: managerId, // Must be a manager
      assignee_id: null, // CLOSED tasks do not require an assignee
      created_at: new Date(),
    },
  ];
};
