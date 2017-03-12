import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './components/index';
import Categories from './components/categories/categories';
import CategoriesList from './components/categories/categories-list';
import VenuesList from './components/venues/venues-list';
import Venues from './components/venues/venues';


Vue.use(VueRouter);

const routes = [
  {
    path: '/:area/beers',
    name: 'categories',
    component: Categories,
    meta: {
      type: 'categories'
    },
    children: [
      {
        path: ':category',
        name: 'category',
        component: CategoriesList,
        props: true,
        meta: {
          type: 'categories'
        }
      }
    ]
  },
  {
    path: '/:area/venues',
    name: 'venues',
    component: Venues,
    meta: {
      type: 'venues'
    },
    children: [
      {
        path: ':venue',
        name: 'venue',
        component: VenuesList,
        props: true,
        meta: {
          type: 'venues'
        }
      }
    ]
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
