<template>
  <div class="searchbox">
    <input class="searchbox__input" :placeholder="placeholder" :value="value" type="text" @input="onInput"></input>
    <div :class="clearButtonClasses">
      <i class="fa fa-close" aria-hidden="true" @click="onClear"/>
    </div>
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
    },
    clearButtonClasses() {
      return {
        searchbox__clear: true,
        'searchbox__clear--hidden': !this.hasNonEmptyValue
      };
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
  padding: $baseline 40px $baseline $baseline;
  margin: 4*$baseline 0 $baseline;
  width: 100%;
  height: 40px;

  font-size: $font-size-large;

  outline: none;
  border: 1px solid $color-separator-light;

  transition: border-color 0.3s;

  &:focus {
    border: 1px solid $color-brand-primary;
  }
}

.searchbox__clear {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 40px;
  line-height: 40px;

  text-align: center;

  transform: scale(1);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-out;

  &.searchbox__clear--hidden {
    transform: scale(0);
    opacity: 0;
  }

  > .fa {
    line-height: inherit;
  }
}
</style>
