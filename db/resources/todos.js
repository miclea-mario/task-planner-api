const { getIdentityByName } = require('../functions');

module.exports = async () => {
  const michael = await getIdentityByName('Michael Scott');
  const jim = await getIdentityByName('Jim Halpert');

  return [
    {
      identity: michael,
      name: 'Make a todo list',
      done: true,
    },
    {
      identity: michael,
      name: 'Add integration tests',
      done: false,
    },
    {
      identity: michael,
      name: 'Complete starter project',
      done: false,
    },
    {
      identity: jim,
      name: 'Make fun of Dwight',
      done: false,
    },
    {
      identity: jim,
      name: 'Go home at 5PM sharp',
      done: true,
    },
  ];
};
