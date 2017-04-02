const Joi = require('joi');

const Beers = require('../../models/beers');
const Categories = require('../../models/categories');


const getAll = {
  method: 'GET',
  path: '/api/categories',
  config: {
    description: 'Retrieves all beer style categories',
    validate: {
      query: {
        area: Joi.string(),
        includeExamples: Joi.boolean(),
        examplesLimit: Joi.number().positive()
      }
    }
  },
  async handler(request, reply) {
    let categories = [{ id: 'all' }, ...await Categories.getAll()];
    if (request.query.includeExamples && request.query.area) {
      categories = await Promise.all(categories.map(async category => {
        const examples = await Beers.findByCategoryAndArea({
          category: category.id,
          area: request.query.area,
          limit: request.query.examplesLimit
        });
        return Object.assign({}, category, { examples });
      }));
    }
    reply(categories);
  }
};

module.exports = [
  getAll
];
