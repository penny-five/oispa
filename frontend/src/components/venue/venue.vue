<template>
  <loading-wrapper>
    <div class="venue" v-if="venue">
      <div class="venue-information">
        <h1 class="venue-information__name">{{ venue.name }}</h1>
        <span class="venue-information__website" v-if="hasWebsiteUrl">
          <a :href="venue.website_url" target="_blank">{{ venue.website_url }}</a>
        </span>
        <span class="venue-information__address" v-if="hasAddress">
          <a :href="googleMapsLink" target="_blank">
            <i class="fa fa-map-marker" aria-hidden="true"/>{{ venue.address }}, {{ venue.city }}
          </a>
        </span>
      </div>
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
  </loading-wrapper>
</template>

<script>
import { mapActions } from 'vuex';

import LoadingWrapper from '../common/loading-wrapper';
import BeerItem from '../common/beer-item';


export default {
  name: 'venue',
  components: {
    LoadingWrapper,
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
    },
    hasAddress() {
      return this.venue != null && this.venue.address != null;
    },
    hasWebsiteUrl() {
      return this.venue != null && this.venue.website_url != null;
    },
    googleMapsLink() {
      const encodedAddress = encodeURI(`${this.venue.address}, ${this.venue.city}, Finland`);
      return (`https://www.google.com/maps/place/${encodedAddress}`);
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
.venue {
  margin-bottom: 2*$baseline;
}

.venue-information {
  padding: 0 0 3*$baseline;
  margin-bottom: 2*$baseline;
  border-bottom: 1px solid $color-separator-light;

  .venue-information__name {
    margin-bottom: 0;
  }

  .venue-information__website {
    display: block;
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;
    line-height: 2;
  }

  .venue-information__address {
    display: block;
    font-size: $font-size-medium;
    line-height: 1.5;

    .fa {
      margin-right: 0.6rem;
    }
  }
}

.venues__beer-last-seen {
  display: block;
  text-align: right;
  font-size: $font-size-small;
  font-weight: $font-weight-bold;
}
</style>
