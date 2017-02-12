const knex = require('../knex');

module.exports = {
  method: 'GET',
  path: '/beerstyles',
  config: {
    description: 'Retrieves all beer styles'
  },
  handler(request, reply) {
    reply(knex.select('id', 'name').orderBy('name').from('beerstyles'));
  }
};
