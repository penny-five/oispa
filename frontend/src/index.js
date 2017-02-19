import Vue from 'vue';
import moment from 'moment';
import langFinnish from './i18n/finnish.json';
import App from './components/app';


if (process.env.API_URL === '') {
  console.error('Oispa API url missing'); // eslint-disable-line no-console
}

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
