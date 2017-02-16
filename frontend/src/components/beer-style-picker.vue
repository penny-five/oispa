<template>
  <multi-select
    class="oispa-multiselect"
    :loading="beerStyles.length === 0"
    :disabled="beerStyles.length === 0"
    :options="beerStyles"
    :placeholder="i18n('select beer style')"
    selectLabel=""
    selectedLabel=""
    deselectLabel=""
    label="name"
    track-by="name"
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
    beerStyles: Array
  },
  data: () => ({
    selected: null
  }),
  watch: {
    selected() {
      this.$emit('input', this.selected);
    }
  }
};

</script>

<style lang="scss">
@import "assets/constants";

.oispa-multiselect {
  .multiselect__input, .multiselect__single, .multiselect__option {
    font-size: 1.8rem;
    font-weight: $font-weight-semibold;
  }
}
</style>
