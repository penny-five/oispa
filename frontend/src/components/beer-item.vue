<template>
  <div class="beer clearfix">
    <span class="beer__last-seen">{{ lastSeen }}</span>
    <rating-bar class="beer__rating" :rating="beer.avg_rating"/>
    <span class="beer__name">{{ beer.name }}</span>
    <span class="beer__brewery">{{ beer.brewery }}</span>
    <span class="beer__style">{{ beer.beerstyle_name }}</span>
  </div>
</template>

<script>
import moment from 'moment';

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
  },
  computed: {
    lastSeen() {
      return moment(this.beer.latest_sighting).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/constants";

.beer {
  margin: 2*$baseline 0;

  .beer__last-seen {
    float: right;
    font-size: $font-size-small;
    line-height: $font-size-medium;
  }

  .beer__rating {
    float: left;
    margin-right: $baseline;
  }

  .beer__name {
    display: block;
    font-size: $font-size-large;
    font-weight: $font-weight-semibold;
  }

  .beer__brewery {
    display: block;
    font-size: $font-size-small;
  }

  .beer__style {
    display: block;
    font-size: $font-size-small;
  }
}
</style>
