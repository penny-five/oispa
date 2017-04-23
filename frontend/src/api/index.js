import { get } from './utils';

export default {
  areas: {
    getAll: () => get('/areas'),
    getVenues: id => get(`/areas/${id}/venues`),
    getRecommendations: (id, params) => get(`/areas/${id}/recommendations`, params)
  },
  categories: {
    getAll: area => get(`/categories?includeExamples=true&area=${area}`)
  },
  venues: {
    get: id => get(`/venues/${id}`),
    getAll: () => get('/venues')
  }
};
