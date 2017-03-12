<template>
  <div>
    <span class="separator"></span>
    <template v-if="recommendations">
      <ul v-if="recommendations.length > 0">
        <venue-item
          v-for="recommendation in recommendations"
          :key="recommendation.venue.id"
          :venue="recommendation.venue"
          :beers="recommendation.beers"/>
      </ul>
      <h2 v-else>{{ i18n('results_not_found') }}</h2>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import VenueItem from './venue-item';


export default {
  name: 'categories-list',
  components: {
    VenueItem
  },
  computed: {
    ...mapState({
      recommendations(state) {
        return state.categoryRecommendations[this.$route.params.category];
      }
    })
  },
  methods: {
    ...mapActions([
      'fetchCategoryRecommendations'
    ])
  },
  created() {
    this.fetchCategoryRecommendations(this.$route.params.category);
  },
  watch: {
    $route() {
      this.fetchCategoryRecommendations(this.$route.params.category);
    }
  }
};

</script>
