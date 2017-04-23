<template>
  <div class="searchbox">
    <input class="searchbox__input" :placeholder="placeholder" :value="value" type="text" @input="onInput"></input>
    <i class="fa fa-close searchbox__close" aria-hidden="true" @click="onClear" v-show="hasNonEmptyValue"/>
  </div>
</template>

<script>

export default {
  props: {
    value: String,
    placeholder: String
  },
  computed: {
    hasNonEmptyValue() {
      return this.value != null && this.value.length > 0;
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    onClear() {
      this.$emit('input', '');
    }
  }
};
</script>

<style lang="scss" scoped>
.searchbox {
  position: relative;
}

.searchbox__input {
  display: block;
  padding: $baseline 3*$baseline $baseline $baseline;
  margin: 4*$baseline 0 $baseline;
  width: 100%;

  font-size: $font-size-large;

  outline: none;
  border: 1px solid $color-separator-light;

  &:focus {
    border: 1px solid $color-brand-primary;
  }
}

.searchbox__close {
  position: absolute;
  top: 10px; right: $baseline;
}
</style>
