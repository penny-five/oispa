import _ from 'lodash';

import locale from './i18n/finnish.json';


const template = _.memoize(key => _.template(locale[key]));

const i18n = {
  methods: {
    i18n: (key, values) => template(key)(values) || `{ ${key} }`
  }
};

export default [i18n];
