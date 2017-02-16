<template>
  <li class="venue clearfix">
    <span class="venue__name">{{ venue.name }}</span>
    <ul>
      <beer-item v-for="beer in beers" :beer="beer"/>
    </ul>
  </li>
</template>

<script>
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
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.venue {
  padding: $baseline 0;

  .venue__name {
    font-weight: $font-weight-bold;
    font-size: 1.6rem;
  }

  + .venue {
    border-top: 1px solid #e8e8e8;
  }
}
</style>
