<template>
  <dropdown
    :items="items"
    :placeholder="i18n('recommendations.dropdown_placeholder')"
    track-by="id"
    label="name"
    v-model="selected">
  </dropdown>
</template>

<script>
import _ from 'lodash';
import Dropdown from './dropdown';


export default {
  components: {
    Dropdown
  },
  props: {
    value: {},
    categories: Array
  },
  data: () => ({
    selected: null
  }),
  computed: {
    items() {
      if (this.categories == null) return null;

      let options = this.categories.map(category => ({
        id: category,
        name: this.i18n(`category.${category}`) || category
      }));
      /* Leave exotic category as last, otherwise sort by name */
      options = _.sortBy(options, category => (category.id === 'exotic' ? null : category.name));
      /* First dropdown option should be a special option for selecting all categories */
      options = [{ id: 'all', name: this.i18n('category.anything') }, ...options];
      return options;
    }
  },
  watch: {
    selected(selected) {
      this.$emit('input', selected);
    }
  }
};

</script>
