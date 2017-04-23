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
    venuesFilter: null,
    categoryRecommendations: {},
    venueDetails: {}
  },
  getters: {
    currentArea: state => state.route.params.area,
    venues: state => state.venues,
    categoryRecommendations: state => category => {
      const id = typeof category === 'object' ? category.id : category;
      return state.categoryRecommendations[id];
    },
    venueDetails: state => venue => {
      const id = typeof venue === 'object' ? venue.id : venue;
      return state.venueDetails[id];
    }
  },
  mutations: {
    clear(state) {
      state.venues = null;
      state.venuesFilter = null;
      state.categories = null;
      state.categoryRecommendations = {};
      state.venueDetails = {};
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
    setVenuesFilter(state, filter) {
      state.venuesFilter = filter;
    },
    addCategoryRecommendations(state, { id, recommendations }) {
      Vue.set(state.categoryRecommendations, id, recommendations);
    },
    addVenueDetails(state, { id, details }) {
      Vue.set(state.venueDetails, id, details);
    }
  },
  actions: {
    async fetchAreas({ state, commit }) {
      if (state.areas == null) {
        const areas = await api.areas.getAll();
        commit('setAreas', areas);
      }
    },
    async fetchCategories({ state, getters, commit }) {
      if (state.categories == null) {
        const categories = await api.categories.getAll(getters.currentArea);
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
    async fetchVenueDetails({ state, getters, commit }, id) {
      if (id != null && getters.venueDetails(id) == null) {
        const details = await api.venues.get(id);
        commit('addVenueDetails', { id, details });
      }
    }
  }
});

export default store;
