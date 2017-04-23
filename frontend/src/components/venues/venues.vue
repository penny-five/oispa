<template>
  <div>
    <page-instructions
      :text="i18n('venues.instructions')"
      :illustration="illustration"/>
    <ul v-if="venues != null">
      <list-item
        v-for="venue in venues"
        :title="venue.name"
        :subtitle="formatVenueExamples(venue)"
        key="venue.id"
        @click="onSelectVenue(venue)"/>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PageInstructions from '../common/page-instructions';
import ListItem from '../common/list-item';
import illustration from '../../../assets/illustration_venues.png';


export default {
  name: 'venues',
  components: {
    PageInstructions,
    ListItem
  },
  data: () => ({
    illustration
  }),
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
