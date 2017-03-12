import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './components/index';
import Recommendations from './components/recommendations';
import RecommendationsList from './components/recommendations-list';
import VenuesList from './components/venues-list';
import Venues from './components/venues';


Vue.use(VueRouter);

const routes = [
  {
    path: '/:area/beers',
    name: 'recommendations',
    component: Recommendations,
    meta: {
      type: 'recommendations'
    },
    children: [
      {
        path: ':category',
        name: 'categories',
        component: RecommendationsList,
        props: true,
        meta: {
          type: 'recommendations'
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
