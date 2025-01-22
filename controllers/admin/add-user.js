const { error } = require('../../functions');
const { knex } = require('../../db');
const { hashSync } = require('bcryptjs');

module.exports = async (req, res) => {
  const { name, email, password, role, manager_id } = req.body;

  if (!name || !email || !password || !role) {
    throw error(400, 'All fields (name, email, password, role) are required');
  }

  // Check if user already exists
  const existingUser = await knex('identities').where('email', email).first();
  if (existingUser) {
    throw error(409, 'User with this email already exists');
  }

  const [newUser] = await knex('identities')
    .insert({
      name,
      email,
      password: hashSync(password),
      role,
      active: true,
      confirmed: true,
      manager_id: role === 'executant' ? manager_id : null,
    })
    .returning(['id', 'name', 'email', 'role', 'manager_id']);

  return res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
};
