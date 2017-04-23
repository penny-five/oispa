<template>
  <div>
    <page-instructions
      :text="i18n('venues.instructions')"
      :illustration="illustration"/>
    <template v-if="venues != null">
      <searchbox :placeholder="i18n('venues.searchbox_placeholder')" v-model="venuesFilter" />
      <ul>
        <list-item
          v-for="venue in filteredVenues"
          :title="venue.name"
          :subtitle="formatVenueExamples(venue)"
          :highlight="venuesFilter"
          key="venue.id"
          @click="onSelectVenue(venue)"/>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PageInstructions from '../common/page-instructions';
import Searchbox from '../common/searchbox';
import ListItem from '../common/list-item';
import illustration from '../../../assets/illustration_venues.png';


export default {
  name: 'venues',
  components: {
    PageInstructions,
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
