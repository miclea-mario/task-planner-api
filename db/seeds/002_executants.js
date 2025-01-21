/* eslint-disable no-console */
const executants = require('../resources/executants');

exports.seed = async (knex) => {
  try {
    console.log('Planting seeds for executants');

    const seeds = await executants();
    await knex('identities').insert(seeds);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert executants');
    return console.error(err);
  }
};
