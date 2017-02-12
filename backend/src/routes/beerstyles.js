const knex = require('../knex');

module.exports = {
  method: 'GET',
  path: '/beerstyles',
  handler(request, reply) {
    reply(knex.select('id', 'name').orderBy('name').from('beerstyles'));
  }
};
