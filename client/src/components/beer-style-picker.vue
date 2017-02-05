<template>
  <multi-select
    :loading="beerStyles.length === 0"
    :disabled="beerStyles.length === 0"
    :options="beerStyles"
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
.multiselect__input, .multiselect__single, .multiselect__option {
  font-size: 2.1rem;
}
</style>
