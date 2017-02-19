<template>
  <li class="venue clearfix">
    <span class="venue__name">{{ venue.name }}</span>
    <a :href="googleMapsLink" target="_blank" v-if="hasAddress">
      <span class="venue__address">{{ venue.address }}</span>
    </a>
    <span class="venue__beer-last-seen">{{ i18n('last-seen') }}</span>
    <ul>
      <beer-item v-for="beer in beers" :beer="beer"/>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash';

import BeerItem from './beer-item';


export default {
  components: {
    BeerItem
  },
  props: {
    venue: {
      type: Object,
      required: true
    },
    beers: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasAddress() {
      return !_.isEmpty(this.venue.address);
    },
    googleMapsLink() {
      const encodedAddress = encodeURI(`${this.venue.address}, Tampere, Finland`);
      return (`https://www.google.com/maps/place/${encodedAddress}`);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.venue {
  padding: 1.5*$baseline 0;

  .venue__name {
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;
  }

  .venue__address {
    font-size: $font-size-small;
    margin-left: 1ch;
  }

  .venue__beer-last-seen {
    float: right;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
  }

  + .venue {
    border-top: 1px solid $color-separator-light;
  }
}
</style>
