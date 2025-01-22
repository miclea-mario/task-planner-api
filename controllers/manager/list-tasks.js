const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { me } = req.user;
  const { status, assignee_id, creator_id } = req.query;

  const select = [
    'tasks.id',
    'tasks.title',
    'tasks.description',
    'tasks.status',
    'tasks.created_at',
    'tasks.creator_id',
    'tasks.assignee_id',
    'creator.name as creator_name',
    'assignee.name as assignee_name',
  ];

  const query = knex('tasks')
    .select(...select)
    .where('tasks.creator_id', me)
    .leftJoin('identities as creator', 'tasks.creator_id', 'creator.id')
    .leftJoin('identities as assignee', 'tasks.assignee_id', 'assignee.id');

  // Apply filters if they exist in the query
  if (status) {
    query.where('tasks.status', status.toUpperCase());
  }

  if (assignee_id) {
    query.where('tasks.assignee_id', assignee_id);
  }

  if (creator_id) {
    query.where('tasks.creator_id', creator_id);
  }

  // Add sorting by creation date (newest first)
  query.orderBy('tasks.created_at', 'desc');

  const tasks = await query;

  // Query for the manager's executants
  const executants = await knex('identities')
    .select('id', 'name', 'email', 'role')
    .where({ manager_id: me, role: 'executant' });

  return res.status(200).json({
    tasks,
    executants,
  });
};
