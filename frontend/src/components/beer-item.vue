<template>
  <div class="beer">
    <rating-bar class="beer__rating" :rating="beer.avg_rating"/>
    <span class="beer__name">{{ beer.name }}</span>
    <span class="beer__brewery">{{ beer.brewery }}</span>
  </div>
</template>

<script>
import RatingBar from './rating-bar';


export default {
  components: {
    RatingBar
  },
  props: {
    beer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/constants";

.beer {
  margin: 2*$baseline 0;

  .beer__rating {
    float: left;
    margin-right: $baseline;
  }

  .beer__name {
    display: block;
    font-size: 1.8rem;
  }

  .beer__brewery {
    display: block;
    font-size: 1.5rem;
  }
}
</style>
