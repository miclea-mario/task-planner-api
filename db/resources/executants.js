const { hashSync } = require('bcryptjs');
const { knex } = require('../../db');

module.exports = async () => {
  const manager = await knex('identities').first('id').where('role', '=', 'manager');

  return [
    {
      email: 'pam@email.com',
      name: 'Pam Beesly',
      role: 'executant',
      password: hashSync('supersecretpassword'),
      active: true,
      confirmed: true,
      manager_id: manager.id,
    },
  ];
};
