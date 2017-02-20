const knex = require('../knex');


module.exports = {
  method: 'GET',
  path: '/api/beerstyles/categories',
  config: {
    description: 'Retrieves all beer style categories'
  },
  handler(request, reply) {
    reply(knex.distinct('category').from('beerstyles').whereNotNull('category').orderBy('category').pluck('category'));
  }
};
