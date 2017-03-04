import Vue from 'vue';
import moment from 'moment';

import localeFI from './i18n/finnish.json';
import router from './router';
import store from './store';
import App from './components/app';


moment.locale('fi');

Vue.mixin({
  methods: {
    i18n: key => localeFI[key] || `{ ${key} }`
  }
});

store.dispatch('init');

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});
