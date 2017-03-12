import Vue from 'vue';
import moment from 'moment';

import mixins from './mixins';
import router from './router';
import store from './store';
import sync from './sync';
import App from './components/app';


moment.locale('fi');

mixins.forEach(mixin => Vue.mixin(mixin));

sync(store, router);

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});
