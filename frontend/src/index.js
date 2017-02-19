import Vue from 'vue';
import moment from 'moment';
import langFinnish from './i18n/finnish.json';
import App from './components/app';


moment.locale('fi');

Vue.mixin({
  methods: {
    i18n: key => langFinnish[key] || `{ ${key} }`
  }
});

export default new Vue({
  el: '#root',
  render: h => h(App)
});
