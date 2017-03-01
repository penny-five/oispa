<template>
  <div>
    <h2>{{ i18n('venues.instructions') }}</h2>
    <dropdown
      :items="venues"
      :placeholder="i18n('venues.dropdown_placeholder')"
      track-by="id"
      label="name"
      v-model="selectedVenue"/>
    <template v-if="selectedVenue != null && recommendedBeers != null">
      <span class="separator"></span>
      <beers-list :beers="recommendedBeers" />
    </template>
  </div>
</template>

<script>
import api from '../api';
import BeersList from './beers-list';
import Dropdown from './dropdown';

export default {
  name: 'venues',
  components: {
    BeersList,
    Dropdown
  },
  data: () => ({
    selectedVenue: null,
    venues: null,
    recommendedBeers: null
  }),
  watch: {
    async selectedVenue() {
      if (this.selectedVenue != null) {
        this.recommendedBeers = [];
        this.recommendedBeers = await api.venues.getBeers(this.selectedVenue.id)();
      }
    }
  },
  async mounted() {
    this.venues = await api.venues.getAll();
  }
};

</script>
