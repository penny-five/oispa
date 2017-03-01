import { get } from './utils';

export default {
  echo: get('/echo'),
  beerStyleCategories: {
    getAll: get('/beerstyles/categories')
  },
  recommendations: {
    get: opts => get('/recommendations', opts)()
  },
  venues: {
    getAll: get('/venues'),
    getBeers: venueId => get(`/venues/${venueId}/beers`)
  }
};
