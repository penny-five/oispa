<template>
  <div>
    <h2>{{ i18n('recommendations_instructions') }}</h2>
    <beer-style-picker :categories="beerStyleCategories" v-model="selectedCategory" />
    <template v-if="selectedCategory != null && recommendations != null">
      <span class="separator"></span>
      <recommendations-list :recommendations="recommendations" />
  </div>
</template>

<script>
import api from '../api';
import BeerStylePicker from './beer-style-picker';
import RecommendationsList from './recommendations-list';

export default {
  components: {
    BeerStylePicker,
    RecommendationsList
  },
  data: () => ({
    beerStyleCategories: [],
    selectedCategory: null,
    recommendations: null
  }),
  watch: {
    async selectedCategory() {
      if (this.selectedCategory != null) {
        const category = this.selectedCategory !== 'all' ? this.selectedCategory : null;
        this.recommendations = await api.recommendations.get({ category });
      }
    }
  },
  async mounted() {
    this.beerStyleCategories = await api.beerStyleCategories.getAll();
  }
};

</script>
