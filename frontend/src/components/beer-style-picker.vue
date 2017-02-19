<template>
  <multi-select
    class="oispa-multiselect"
    :loading="categories.length === 0"
    :disabled="categories.length === 0"
    :options="options"
    :placeholder="i18n('recommendations_beer_style_picker_placeholder')"
    track-by="id"
    label="name"
    selectLabel=""
    selectedLabel=""
    deselectLabel=""
    v-model="selected">
  </multi-select>
</template>

<script>
import _ from 'lodash';
import MultiSelect from 'vue-multiselect';


export default {
  components: {
    MultiSelect
  },
  props: {
    value: {},
    categories: Array
  },
  data: () => ({
    selected: null
  }),
  computed: {
    options() {
      if (this.categories == null) return null;

      let options = this.categories.map(category => ({
        id: category,
        name: this.i18n(`category.${category}`) || category
      }));
      /* Leave exotic category as last, otherwise sort by name */
      options = _.sortBy(options, category => (category.id === 'exotic' ? null : category.name));
      /* First dropdown option is a special option for selecting all categories */
      options = [{ id: -1, name: this.i18n('category.anything') }, ...options];
      return options;
    }
  },
  watch: {
    selected(selected) {
      this.$emit('input', selected.id === -1 ? null : selected.id);
    }
  }
};

</script>

<style lang="scss">
@import "assets/constants";

.oispa-multiselect {
  .multiselect__input, .multiselect__single, .multiselect__option {
    font-size: $font-size-large;
    font-weight: $font-weight-semibold;
  }
}
</style>
