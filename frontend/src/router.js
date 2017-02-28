import Vue from 'vue';
import VueRouter from 'vue-router';

import Recommendations from './components/recommendations';


Vue.use(VueRouter);

const routes = [
  {
    path: '/recommendations',
    alias: '/',
    name: 'recommendations',
    component: Recommendations
  }
];

export default new VueRouter({
  routes
});
