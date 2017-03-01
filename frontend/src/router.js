import Vue from 'vue';
import VueRouter from 'vue-router';

import Recommendations from './components/recommendations';
import Venues from './components/venues';


Vue.use(VueRouter);

const routes = [
  {
    path: '/recommendations',
    alias: '/',
    name: 'recommendations',
    component: Recommendations
  }, {
    path: '/venues',
    name: 'venues',
    component: Venues
  }
];

const router = new VueRouter({
  routes
});

router.replace('/recommendations');

export default router;
