<template>
  <div>
    <span class="separator"></span>
    <div>
      <ul v-if="recommendations != null && recommendations.length > 0">
        <span class="venues__beer-last-seen">{{ i18n('last-seen') }}</span>
        <beer-item v-for="beer in recommendations" :key="beer.id" :beer="beer" />
      </ul>
      <h2 v-else>{{ i18n('results_not_found') }}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import BeerItem from './beer-item';


export default {
  name: 'venues-list',
  components: {
    BeerItem
  },
  props: ['venue'],
  computed: {
    recommendations() {
      return this.$store.getters.venueRecommendations(this.venue);
    }
  },
  methods: {
    ...mapActions([
      'fetchVenueRecommendations'
    ])
  },
  created() {
    this.fetchVenueRecommendations(this.venue);
  },
  watch: {
    $route() {
      this.fetchVenueRecommendations(this.venue);
    }
  }
};

</script>
