import Vue from 'vue';

import App from './components/app';


if (process.env.API_URL === '') {
  console.error('Oispa API url missing'); // eslint-disable-line no-console
}

export default new Vue({
  el: '#root',
  render: h => h(App)
});
