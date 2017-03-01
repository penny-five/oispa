<template>
  <div>
    <ul v-if="beers.length > 0">
      <beer-item v-for="beer in beers" :beer="beer" />
    </ul>
    <h2 v-else>{{ i18n('results_not_found') }}</h2>
  </div>
</template>

<script>
import BeerItem from './beer-item';

export default {
  components: {
    BeerItem
  },
  props: {
    beers: Array
  }
};

</script>
