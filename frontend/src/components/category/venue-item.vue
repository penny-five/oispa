<template>
  <li class="venue clearfix">
    <span class="venue__beer-last-seen">{{ i18n('last-seen') }}</span>
    <span class="venue__name">
      <router-link :to="{ name: 'venue', params: { venueId: venue.id } }">
        {{ venue.name }}
      </router-link>
    </span>
    <ul>
      <beer-item v-for="beer in beers" :key="beer.id" :beer="beer"/>
    </ul>
  </li>
</template>

<script>
import BeerItem from '../common/beer-item';
import LinkWrapper from '../common/link-wrapper';


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
  }
};

</script>

<style lang="scss" scoped>
.venue {
  padding: 0 0 2*$baseline;

  .venue__name {
    @include truncate;
    padding-right: $baseline;
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
  }

  .venue__beer-last-seen {
    float: right;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    line-height: 2.2rem;
  }

  + .venue {
    padding: 2*$baseline 0;
    border-top: 1px solid $color-separator-light;
  }
}
</style>
