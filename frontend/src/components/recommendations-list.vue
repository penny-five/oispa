<template>
  <div>
    <template v-if="recommendations.length > 0">
      <h2>{{ i18n('recommendations_results_found' )}}</h2>
      <ul>
        <venue-item v-for="recommendation in recommendations"
          :venue="recommendation.venue"
          :beers="recommendation.beers" />
      </ul>
    </template>
    <h2 v-else>{{ i18n('recommendations_results_not_found') }}</h2>
  </div>
</template>

<script>
import VenueItem from './venue-item';

export default {
  components: {
    VenueItem
  },
  props: {
    recommendations: Array
  }
};

</script>
