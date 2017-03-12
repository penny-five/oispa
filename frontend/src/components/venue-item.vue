<template>
  <li class="venue clearfix">
    <span class="venue__beer-last-seen">{{ i18n('last-seen') }}</span>
    <span class="venue__info truncate">
      <span class="venue__name">
        <link-wrapper :href="venue.website_url" target="blank">
          {{ venue.name }}
        </link-wrapper>
      </span>
      <a :href="googleMapsLink" target="_blank" v-if="hasAddress">
        <span class="venue__address">{{ venue.address }}</span>
      </a>
    </span>
    <ul>
      <beer-item v-for="beer in beers" :key="beer.id" :beer="beer"/>
    </ul>
  </li>
</template>

<script>
import _ from 'lodash';

import BeerItem from './beer-item';
import LinkWrapper from './link-wrapper';


export default {
  components: {
    BeerItem,
    LinkWrapper
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
      const encodedAddress = encodeURI(`${this.venue.address}, ${this.venue.city}, Finland`);
      return (`https://www.google.com/maps/place/${encodedAddress}`);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.venue {
  padding: 0 0 2*$baseline;

  .venue__info {
    padding-right: $baseline;

    font-size: $font-size-tiny;
    font-weight: $font-weight-regular;
  }

  .venue__name {
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;
  }

  .venue__address {
    margin-left: 1ch;
  }

  .venue__beer-last-seen {
    float: right;
    font-size: $font-size-tiny;
    font-weight: $font-weight-semibold;
  }

  + .venue {
    padding: 2*$baseline 0;
    border-top: 1px solid $color-separator-light;
  }
}
</style>
