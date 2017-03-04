import { get } from './utils';

export default {
  areas: {
    getAll: () => get('/areas'),
    getVenues: id => get(`/areas/${id}/venues`),
    getRecommendations: (id, params) => get(`/areas/${id}/recommendations`, params)
  },
  beerStyleCategories: {
    getAll: () => get('/beerstyles/categories')
  },
  venues: {
    getAll: () => get('/venues'),
    getRecommendations: id => get(`/venues/${id}/recommendations`)
  }
};
