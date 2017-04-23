<template>
  <div>
    <h1 class="category-name">{{ categoryName }}</h1>
    <loading-wrapper>
      <template v-if="recommendations">
        <ul v-if="recommendations.length > 0">
          <venue-item
            v-for="recommendation in recommendations"
            :key="recommendation.venue.id"
            :venue="recommendation.venue"
            :beers="recommendation.beers"/>
        </ul>
        <h2 v-else>{{ i18n('results_not_found') }}</h2>
      </template>
    </loading-wrapper>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import LoadingWrapper from '../common/loading-wrapper';
import VenueItem from './venue-item';


export default {
  name: 'category',
  components: {
    LoadingWrapper,
    VenueItem
  },
  computed: {
    ...mapState({
      recommendations(state) {
        return state.categoryRecommendations[this.$route.params.category];
      }
    }),
    category() {
      return this.$route.params.category;
    },
    categoryName() {
      return this.i18n(`category.${this.category}`) || this.category;
    }
  },
  methods: {
    ...mapActions([
      'fetchCategoryRecommendations'
    ])
  },
  created() {
    this.fetchCategoryRecommendations(this.$route.params.category);
  },
  watch: {
    $route() {
      this.fetchCategoryRecommendations(this.$route.params.category);
    }
  }
};

</script>

<style lang="scss" scoped>
.category-name {
  padding: 0 0 3*$baseline;
  border-bottom: 1px solid $color-separator-light;
}
</style>
