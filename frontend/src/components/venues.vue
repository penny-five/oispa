<template>
  <div>
    <h2>{{ i18n('venues.instructions') }}</h2>
    <dropdown
      :items="venues"
      :value="selected"
      :placeholder="i18n('venues.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onVenueSelected"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Dropdown from './dropdown';


export default {
  name: 'venues',
  components: {
    Dropdown
  },
  computed: {
    ...mapGetters([
      'venues'
    ]),
    venueId() {
      return parseInt(this.$route.params.venue, 10);
    },
    selected() {
      if (this.venues == null) return null;
      return this.venues.find(venue => venue.id === this.venueId);
    }
  },
  methods: {
    ...mapActions([
      'fetchVenues',
      'setSelectedVenue'
    ]),
    onVenueSelected(venue) {
      if (venue == null) {
        this.$router.push({
          name: 'venues'
        });
      } else {
        this.$router.push({
          name: 'venue',
          params: {
            venue: venue.id
          }
        });
      }
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
