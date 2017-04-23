import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './components/index';
import Categories from './components/categories/categories';
import Category from './components/category/category';
import Venues from './components/venues/venues';
import Venue from './components/venue/venue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/:area/beers',
    name: 'categories',
    component: Categories
  },
  {
    path: '/:area/beers/:category',
    name: 'category',
    component: Category,
    props: true
  },
  {
    path: '/:area/venues',
    name: 'venues',
    component: Venues
  },
  {
    path: '/:area/venues/:venueId',
    name: 'venue',
    component: Venue,
    props: true
  },
  {
    path: '/:area',
    redirect: { name: 'categories' }
  },
  {
    path: '/',
    component: Index
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
});

export default router;
