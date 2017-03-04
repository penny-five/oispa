<template>
  <div>
    <h2>{{ i18n('recommendations.instructions') }}</h2>
    <dropdown
      :items="items"
      :value="selectedItem"
      :placeholder="i18n('recommendations.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onItemSelected"/>
    <template v-if="recommendations != null">
      <span class="separator"></span>
      <recommendations-list :recommendations="recommendations" />
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';

import Dropdown from './dropdown';
import RecommendationsList from './recommendations-list';


export default {
  name: 'recommendations',
  components: {
    Dropdown,
    RecommendationsList
  },
  computed: {
    ...mapState({
      items({ beerStyleCategories }) {
        if (beerStyleCategories == null) return null;

        return _.chain(beerStyleCategories).map(category => ({
          id: category,
          name: this.i18n(`category.${category}`) || category
        })).sortBy(category => {
          if (category.id === 'all') return 1;
          if (category.id === 'exotic') return null;
          return category.name;
        }).value();
      },
      selectedItem({ selectedCategory }) {
        if (selectedCategory == null) return null;
        return this.items.find(item => item.id === selectedCategory);
      },
      recommendations: state => state.selectedCategoryRecommendations
    })
  },
  methods: {
    onItemSelected(item) {
      this.$store.dispatch('setSelectedCategory', item != null ? item.id : null);
    }
  }
};

</script>
