const knex = require('../../knex');


const getAll = async () => knex.distinct('category')
  .from('beerstyles')
  .whereNotNull('category')
  .orderBy('category')
  .pluck('category');

module.exports = {
  getAll
};
