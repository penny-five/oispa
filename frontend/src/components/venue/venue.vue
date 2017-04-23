<template>
  <div>
    <h1 class="venue-name" v-if="venue">{{ venue.name }}</h1>
    <template v-if="recommendations">
      <div>
        <ul v-if="recommendations.length > 0">
          <span class="venues__beer-last-seen">{{ i18n('last-seen') }}</span>
          <beer-item v-for="beer in recommendations" :key="beer.id" :beer="beer" />
        </ul>
        <h2 v-else>{{ i18n('results_not_found') }}</h2>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import BeerItem from '../common/beer-item';


export default {
  name: 'venue',
  components: {
    BeerItem
  },
  props: ['venueId'],
  computed: {
    venue() {
      const details = this.$store.getters.venueDetails(this.venueId);
      return details != null ? details.venue : null;
    },
    recommendations() {
      const details = this.$store.getters.venueDetails(this.venueId);
      return details != null ? details.recommendations : null;
    }
  },
  methods: {
    ...mapActions([
      'fetchVenueDetails'
    ])
  },
  created() {
    this.fetchVenueDetails(this.venueId);
  },
  watch: {
    $route() {
      this.fetchVenueDetails(this.venueId);
    }
  }
};

</script>

<style lang="scss" scoped>
.venue-name {
  padding: 0 0 3*$baseline;
  border-bottom: 1px solid $color-separator-light;
}

.venues__beer-last-seen {
  display: block;
  text-align: right;
  font-size: $font-size-small;
  font-weight: $font-weight-bold;
}
</style>
