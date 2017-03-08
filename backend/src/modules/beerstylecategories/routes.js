const BeerStyleCategories = require('./model');


const getAll = {
  method: 'GET',
  path: '/api/beerstyles/categories',
  config: {
    description: 'Retrieves all beer style categories'
  },
  async handler(request, reply) {
    const categories = await BeerStyleCategories.getAll();
    reply(['all', ...categories]);
  }
};

module.exports = [
  getAll
];
