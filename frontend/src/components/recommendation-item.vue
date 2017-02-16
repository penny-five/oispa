<template>
  <li class="recommendation">
    <rating-bar class="recommendation__rating" :rating="recommendation.beer.avg_rating"/>
    <span class="recommendation__beer-name">{{ recommendation.beer.name }}</span>
    <span class="recommendation__brewery-name">{{ recommendation.beer.brewery }}</span>
  </li>
</template>

<script>
import RatingBar from './rating-bar';


export default {
  components: {
    RatingBar
  },
  props: {
    recommendation: {
      type: Object,
      required: true
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

$rating_size: 60px;

.recommendation {
  margin: 2*$baseline 0;

  .recommendation__rating {
    float: left;
    margin-right: $baseline;
  }

  .recommendation__beer-name {
    display: block;
    font-size: 1.8rem;
  }

  .recommendation__brewery-name {
    display: block;
    font-size: 1.5rem;
  }
}
</style>
