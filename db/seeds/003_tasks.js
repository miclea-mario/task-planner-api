/* eslint-disable no-console */
const tasks = require('../resources/tasks');

exports.seed = async (knex) => {
  try {
    console.log('Planting seeds for tasks');

    const seeds = await tasks();
    await knex('tasks').insert(seeds);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert tasks');
    return console.error(err);
  }
};
