const { error } = require('../../functions');
const { knex } = require('../../db');

module.exports = async (req, res) => {
  const { role } = req.query;

  const select = ['id', 'email', 'name', 'role'];

  // Base query for selecting users with specific roles
  const query = knex('identities')
    .select(...select)
    .whereIn('role', ['manager', 'executant']);

  // Apply role filter if it exists in the query
  if (role) {
    query.andWhere('role', role);
  }

  const users = await query.paginate(req.query);

  if (!users || users.length === 0) {
    throw error(404, 'No users found with the specified roles');
  }

  return res.status(200).json(users);
};
