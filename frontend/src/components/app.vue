<template>
  <div>
    <header-bar/>
    <div class="content-wrapper">
      <h2>{{ i18n('recommendations_instructions') }}</h2>
      <beer-style-picker :categories="beerStyleCategories" v-model="selectedBeerStyleCategory" />
      <template v-if="recommendations != null">
        <span class="separator"></span>
        <recommendations-list :recommendations="recommendations" />
      </template>
  </div>
</template>

<script>
import api from '../api';
import BeerStylePicker from './beer-style-picker';
import HeaderBar from './header-bar';
import RecommendationsList from './recommendations-list';


export default {
  name: 'App',
  components: {
    BeerStylePicker,
    HeaderBar,
    RecommendationsList
  },
  data: () => ({
    beerStyleCategories: [],
    selectedBeerStyleCategory: null,
    recommendations: null
  }),
  watch: {
    async selectedBeerStyleCategory() {
      this.recommendations = await api.recommendations.get({
        category: this.selectedBeerStyleCategory
      });
    }
  },
  async mounted() {
    this.beerStyleCategories = await api.beerStyleCategories.getAll();
  }
};

</script>

<style lang="scss">
@import "assets/styles";
@import "assets/constants";

.content-wrapper {
  max-width: $content-max-width;
  margin: auto;
  padding: $baseline;
}
</style>
