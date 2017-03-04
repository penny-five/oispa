<template>
  <div>
    <h2>{{ i18n('venues.instructions') }}</h2>
    <dropdown
      :items="venues"
      :value="selectedVenue"
      :placeholder="i18n('venues.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onSelectVenue"/>
    <template v-if="selectedVenueRecommendations != null">
      <span class="separator"></span>
      <beers-list :beers="selectedVenueRecommendations" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import BeersList from './beers-list';
import Dropdown from './dropdown';


export default {
  name: 'venues',
  components: {
    BeersList,
    Dropdown
  },
  computed: {
    ...mapState({
      venues: state => state.venues,
      selectedVenue: state => state.selectedVenue,
      selectedVenueRecommendations: state => state.selectedVenueRecommendations
    })
  },
  methods: {
    onSelectVenue(venue) {
      this.$store.dispatch('setSelectedVenue', venue);
    }
  }
};

</script>
