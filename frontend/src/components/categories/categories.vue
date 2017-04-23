<template>
  <div>
    <page-instructions
      :text="i18n('categories.instructions')"
      :illustration="illustration"/>
    <ul v-if="categories != null">
      <list-item
        v-for="category in categories"
        :title="category.name"
        :subtitle="category.examples"
        key="category.id"
        @click="onSelectCategory(category)"/>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

import PageInstructions from '../common/page-instructions';
import ListItem from '../common/list-item';
import illustration from '../../../assets/illustration_categories.png';


const sort = category => {
  if (category.id === 'all') return 1;
  if (category.id === 'exotic') return null;
  return category.name;
};

export default {
  name: 'categories',
  components: {
    ListItem,
    PageInstructions
  },
  data: () => ({
    illustration
  }),
  computed: {
    ...mapState({
      categories({ categories }) {
        if (categories == null) return null;

        return _.chain(categories).map(category => ({
          id: category.id,
          name: this.i18n(`category.${category.id}`) || category.id,
          examples: category.examples.map(example => example.name).join(', ')
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
    onSelectCategory({ id }) {
      this.$router.push({
        name: 'category',
        params: {
          category: id
        }
      });
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
