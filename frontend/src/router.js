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
    component: Categories,
    meta: {
      type: 'categories'
    }
  },
  {
    path: '/:area/beers/:category',
    name: 'category',
    component: Category,
    props: true,
    meta: {
      type: 'categories'
    }
  },
  {
    path: '/:area/venues',
    name: 'venues',
    component: Venues,
    meta: {
      type: 'venues'
    }
  },
  {
    path: '/:area/venues/:venueId',
    name: 'venue',
    component: Venue,
    props: true,
    meta: {
      type: 'venues'
    }
  },
  {
    path: '/:area',
    redirect: { name: 'recommendations' }
  },
  {
    path: '/',
    component: Index
  }
];

const router = new VueRouter({
  routes
});

export default router;
