/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import api from './api';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    areas: null,
    categories: null,
    venues: null,
    categoryRecommendations: {},
    venueRecommendations: {}
  },
  getters: {
    currentArea: state => state.route.params.area,
    venues: state => state.venues,
    categoryRecommendations: state => category => {
      const id = typeof category === 'object' ? category.id : category;
      return state.categoryRecommendations[id];
    },
    venueRecommendations: state => venue => {
      const id = typeof venue === 'object' ? venue.id : venue;
      return state.venueRecommendations[id];
    }
  },
  mutations: {
    clear(state) {
      state.venues = null;
      state.categoryRecommendations = {};
      state.venueRecommendations = {};
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setAreas(state, areas) {
      state.areas = areas;
    },
    setVenues(state, venues) {
      state.venues = venues;
    },
    addCategoryRecommendations(state, { id, recommendations }) {
      Vue.set(state.categoryRecommendations, id, recommendations);
    },
    addVenueRecommendations(state, { id, recommendations }) {
      Vue.set(state.venueRecommendations, id, recommendations);
    }
  },
  actions: {
    async fetchAreas({ state, commit }) {
      if (state.areas == null) {
        const areas = await api.areas.getAll();
        commit('setAreas', areas);
      }
    },
    async fetchCategories({ state, commit }) {
      if (state.categories == null) {
        const categories = await api.beerStyleCategories.getAll();
        commit('setCategories', categories);
      }
    },
    async fetchVenues({ state, getters, commit }) {
      if (state.venues == null) {
        const venues = await api.areas.getVenues(getters.currentArea);
        commit('setVenues', venues);
      }
    },
    async fetchCategoryRecommendations({ state, getters, commit }, category) {
      const id = typeof category === 'object' ? category.id : category;
      if (id != null && getters.categoryRecommendations(id) == null) {
        const recommendations = await api.areas.getRecommendations(getters.currentArea, {
          category: id
        });
        commit('addCategoryRecommendations', { id, recommendations });
      }
    },
    async fetchVenueRecommendations({ state, getters, commit }, venue) {
      const id = typeof venue === 'object' ? venue.id : venue;
      if (id != null && getters.venueRecommendations(id) == null) {
        const recommendations = await api.venues.getRecommendations(id);
        commit('addVenueRecommendations', { id, recommendations });
      }
    }
  }
});

export default store;
