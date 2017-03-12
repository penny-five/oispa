<template>
  <div>
    <h2>{{ i18n('categories.instructions') }}</h2>
    <dropdown
      :items="categories"
      :value="selected"
      :placeholder="i18n('categories.dropdown_placeholder')"
      track-by="id"
      label="name"
      @input="onItemSelected"/>
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

import Dropdown from '../common/dropdown';


const sort = category => {
  if (category.id === 'all') return 1;
  if (category.id === 'exotic') return null;
  return category.name;
};

export default {
  name: 'categories',
  components: {
    Dropdown
  },
  computed: {
    ...mapState({
      categories({ categories }) {
        if (categories == null) return null;

        return _.chain(categories).map(category => ({
          id: category,
          name: this.i18n(`category.${category}`) || category
        })).sortBy(sort).value();
      },
      selected({ categories }) {
        if (categories == null) return null;
        return this.categories.find(item => item.id === this.$route.params.category);
      }
    })
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ]),
    onItemSelected(item) {
      if (item == null) {
        this.$router.push({
          name: 'categories'
        });
      } else {
        this.$router.push({
          name: 'category',
          params: {
            category: item != null ? item.id : null
          }
        });
      }
    }
  },
  created() {
    this.fetchCategories();
  },
  watch: {
    $route() {
      this.fetchCategories();
    }
  }
};

</script>
