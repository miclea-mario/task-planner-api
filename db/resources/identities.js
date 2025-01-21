const { hashSync } = require('bcryptjs');

module.exports = () => {
  return [
    {
      email: 'michael@email.com',
      name: 'Michael Scott',
      role: 'admin',
      password: hashSync('supersecretpassword'),
      active: true,
      confirmed: true,
    },
    {
      email: 'jim@email.com',
      name: 'Jim Halpert',
      role: 'manager',
      password: hashSync('supersecretpassword'),
      active: true,
      confirmed: true,
    },
  ];
};
