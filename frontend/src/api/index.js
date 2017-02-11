import { get } from './utils';

export default {
  echo: get('/echo'),
  beerStyles: {
    getAll: get('/beerstyles')
  }
};
