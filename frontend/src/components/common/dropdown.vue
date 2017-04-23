<template>
  <multi-select
    class="oispa-multiselect"
    :loading="!hasItems"
    :disabled="!hasItems"
    :options="items || []"
    :value="value || undefined"
    :placeholder="placeholder"
    :track-by="trackBy"
    :label="label"
    selectLabel=""
    selectedLabel=""
    deselectLabel=""
    @input="onInput">
      <template slot="noResult">
        <span>{{ i18n('results_not_found') }}</span>
      </template>
  </multi-select>
</template>

<script>
import MultiSelect from 'vue-multiselect';


export default {
  components: {
    MultiSelect
  },
  props: {
    value: Object,
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
  computed: {
    hasItems() {
      return this.items != null && this.items.length > 0;
    }
  },
  methods: {
    onInput(item) {
      this.$emit('input', item);
    }
  }
};

</script>

<style lang="scss">
.oispa-multiselect {
  &.multiselect--disabled .multiselect__select {
    background: none;
  }
  .multiselect__input, .multiselect__single, .multiselect__option {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
  }
}
</style>
