<template>
  <div>
    <h2>{{ i18n('venues.instructions') }}</h2>
    <dropdown
      :items="venues"
      :value="selected"
      :placeholder="i18n('venues.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onSelectVenue"/>
    <template v-if="selectedRecommendations != null">
      <span class="separator"></span>
      <div>
        <ul v-if="selectedRecommendations.length > 0">
          <span class="venues__beer-last-seen">{{ i18n('last-seen') }}</span>
          <beer-item v-for="beer in selectedRecommendations" :beer="beer" />
        </ul>
        <h2 v-else>{{ i18n('results_not_found') }}</h2>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Dropdown from './dropdown';
import BeerItem from './beer-item';


export default {
  name: 'venues',
  components: {
    Dropdown,
    BeerItem
  },
  computed: {
    ...mapState({
      venues: state => state.venues,
      selected: state => state.selectedVenue,
      selectedRecommendations: state => state.selectedVenueRecommendations
    })
  },
  methods: {
    onSelectVenue(venue) {
      this.$store.dispatch('setSelectedVenue', venue);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.venues__beer-last-seen {
  display: block;
  text-align: right;
  font-size: $font-size-small;
  font-weight: $font-weight-semibold;
}
</style>
