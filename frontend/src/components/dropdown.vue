<template>
  <multi-select
    class="oispa-multiselect"
    :loading="!hasItems"
    :disabled="!hasItems"
    :options="items || []"
    :placeholder="placeholder"
    :track-by="trackBy"
    :label="label"
    selectLabel=""
    selectedLabel=""
    deselectLabel=""
    v-model="selected">
  </multi-select>
</template>

<script>
import MultiSelect from 'vue-multiselect';


export default {
  components: {
    MultiSelect
  },
  props: {
    value: {},
    items: Array,
    trackBy: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: String
  },
  data: () => ({
    selected: null
  }),
  computed: {
    hasItems() {
      return this.items != null && this.items.length > 0;
    }
  },
  watch: {
    selected(selected) {
      this.$emit('input', selected);
      if (selected == null) {
        this.$emit('clear');
      }
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
