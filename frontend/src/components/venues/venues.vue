<template>
  <div>
    <page-instructions
      :text="i18n('venues.instructions')"
      :illustration="illustration"
      :illustrationHeight="100"
      :illustrationWidth="105"/>
    <loading-wrapper>
      <div v-if="venues != null">
        <searchbox :placeholder="i18n('venues.searchbox_placeholder')" v-model="venuesFilter" />
        <ul v-if="filteredVenues.length > 0">
          <list-item
            v-for="venue in filteredVenues"
            :title="venue.name"
            :subtitle="formatVenueExamples(venue)"
            :highlight="venuesFilter"
            key="venue.id"
            @click="onSelectVenue(venue)"/>
        </ul>
        <h2 v-else>{{ i18n('results_not_found') }}</h2>
      </div>
    </loading-wrapper>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PageInstructions from '../common/page-instructions';
import LoadingWrapper from '../common/loading-wrapper';
import Searchbox from '../common/searchbox';
import ListItem from '../common/list-item';
import illustration from '../../../assets/illustration_venues.png';


export default {
  name: 'venues',
  components: {
    PageInstructions,
    LoadingWrapper,
    Searchbox,
    ListItem
  },
  data: () => ({
    illustration
  }),
  computed: {
    ...mapGetters([
      'venues'
    ]),
    venuesFilter: {
      get() {
        return this.$store.state.venuesFilter;
      },
      set(value) {
        this.$store.commit('setVenuesFilter', value);
      }
    },
    filteredVenues() {
      if (this.venuesFilter === null || this.venuesFilter === '' || this.venues == null) return this.venues;
      return this.venues.filter(venue => venue.name.toLowerCase().indexOf(this.venuesFilter.toLowerCase()) > -1);
    }
  },
  methods: {
    ...mapActions([
      'fetchVenues'
    ]),
    formatVenueExamples(venue) {
      return venue.examples.map(example => example.name).join(', ');
    },
    onSelectVenue(venue) {
      this.$router.push({
        name: 'venue',
        params: {
          venueId: venue.id
        }
      });
    }
  },
  created() {
    this.fetchVenues();
  },
  watch: {
    $route() {
      this.fetchVenues();
    }
  }
};

</script>
