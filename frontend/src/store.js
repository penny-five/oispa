/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import api from './api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    areas: null,
    selectedArea: null,
    beerStyleCategories: null,
    selectedCategory: null,
    selectedCategoryRecommendations: null,
    venues: null,
    selectedVenue: null,
    selectedVenueRecommendations: null
  },
  mutations: {
    setBeerStyleCategories(state, categories) {
      state.beerStyleCategories = categories;
    },
    setAreas(state, areas) {
      state.areas = areas;
    },
    setSelectedArea(state, area) {
      state.selectedArea = area;
      state.venues = null;
      state.selectedVenue = null;
      state.selectedVenueRecommendations = null;
      state.selectedCategory = null;
      state.selectedCategoryRecommendations = null;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
      state.selectedCategoryRecommendations = null;
    },
    setSelectedCagoryRecommendations(state, recommendations) {
      state.selectedCategoryRecommendations = recommendations;
    },
    setVenues(state, venues) {
      state.venues = venues;
      state.selectedVenue = null;
      state.selectedVenueRecommendations = null;
    },
    setSelectedVenue(state, venue) {
      state.selectedVenue = venue;
      state.selectedVenueRecommendations = null;
    },
    setSelectedVenueRecommendations(state, recommendations) {
      state.selectedVenueRecommendations = recommendations;
    }
  },
  actions: {
    init({ dispatch }) {
      dispatch('updateAreas');
      dispatch('updateBeerStyleCategories');
    },
    updateSelectedArea({ commit, dispatch }, area) {
      commit('setSelectedArea', area);
      dispatch('updateVenues');
    },
    async updateAreas({ commit, dispatch }) {
      const areas = await api.areas.getAll();
      commit('setAreas', areas);
      dispatch('updateSelectedArea', areas[0]);
    },
    async updateBeerStyleCategories({ commit }) {
      const categories = await api.beerStyleCategories.getAll();
      commit('setBeerStyleCategories', categories);
    },
    async setSelectedCategory({ state, commit }, category) {
      commit('setSelectedCategory', category);
      if (category != null) {
        const recommendations = await api.areas.getRecommendations(state.selectedArea.id, {
          category
        });
        commit('setSelectedCagoryRecommendations', recommendations);
      }
    },
    async updateVenues({ state, commit }) {
      commit('setVenues', null);
      const venues = await api.areas.getVenues(state.selectedArea.id);
      commit('setVenues', venues);
    },
    async setSelectedVenue({ state, commit }, venue) {
      commit('setSelectedVenue', venue);
      if (venue != null) {
        const recommendations = await api.venues.getRecommendations(venue.id);
        commit('setSelectedVenueRecommendations', recommendations);
      }
    }
  }
});

export default store;
