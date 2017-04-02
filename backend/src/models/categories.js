const knex = require('../knex');


const getAll = async () => knex.distinct('category as id')
  .from('beerstyles')
  .whereNotNull('category')
  .orderBy('category');

module.exports = {
  getAll
};
