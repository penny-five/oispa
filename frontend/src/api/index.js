import { get } from './utils';

export default {
  echo: get('/echo'),
  beerStyles: {
    getAll: get('/beerstyles')
  },
  recommendations: {
    getForBeerStyle: beerStyle => get('/recommendations', { beerstyle: beerStyle })()
  }
};
