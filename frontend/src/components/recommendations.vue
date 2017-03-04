<template>
  <div>
    <h2>{{ i18n('recommendations.instructions') }}</h2>
    <dropdown
      :items="categories"
      :value="selected"
      :placeholder="i18n('recommendations.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onItemSelected"/>
    <template v-if="recommendations != null">
      <span class="separator"></span>
      <ul v-if="recommendations.length > 0">
        <venue-item v-for="recommendation in recommendations"
          :venue="recommendation.venue"
          :beers="recommendation.beers" />
      </ul>
      <h2 v-else>{{ i18n('results_not_found') }}</h2>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

import Dropdown from './dropdown';
import VenueItem from './venue-item';


export default {
  name: 'recommendations',
  components: {
    Dropdown,
    VenueItem
  },
  computed: {
    ...mapState({
      categories({ beerStyleCategories }) {
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
      selected({ selectedCategory }) {
        if (selectedCategory == null) return null;
        return this.categories.find(item => item.id === selectedCategory);
      },
      recommendations: state => state.selectedCategoryRecommendations
    })
  },
  methods: {
    ...mapActions([
      'setSelectedCategory'
    ]),
    onItemSelected(item) {
      this.setSelectedCategory(item != null ? item.id : null);
    }
  }
};

</script>
