import Vue from 'vue';
import VueRouter from 'vue-router';

import Recommendations from './components/recommendations';
import Venues from './components/venues';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/kaljat'
  },
  {
    path: '/kaljat',
    alias: '/',
    name: 'recommendations',
    component: Recommendations
  }, {
    path: '/ravintelit',
    name: 'venues',
    component: Venues
  }
];

const router = new VueRouter({
  routes
});

export default router;
