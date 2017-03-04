const _ = require('lodash');

const knex = require('../knex');


module.exports = {
  method: 'GET',
  path: '/api/beerstyles/categories',
  config: {
    description: 'Retrieves all beer style categories'
  },
  async handler(request, reply) {
    const categories = await knex.distinct('category')
      .from('beerstyles')
      .whereNotNull('category')
      .orderBy('category')
      .pluck('category');

    reply(['all', ...categories]);
  }
};
