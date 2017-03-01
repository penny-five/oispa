<template>
  <div>
    <h2>{{ i18n('recommendations.instructions') }}</h2>
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
  name: 'recommendations',
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
        const category = this.selectedCategory.id !== 'all' ? this.selectedCategory.id : null;
        this.recommendations = null;
        this.recommendations = await api.recommendations.get({ category });
      }
    }
  },
  async mounted() {
    this.beerStyleCategories = await api.beerStyleCategories.getAll();
  }
};

</script>
