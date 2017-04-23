<template>
  <li class="item" @click="onClick">
    <span class="item__title">{{ title }}</span>
    <span class="item__subtitle" v-if="subtitle != null">{{ subtitle }}</span>
  </li>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};

</script>

<style lang="scss" scoped>
.item {
  padding: 1.5*$baseline $baseline;

  cursor: pointer;

  transition: background-color .2s ease-out;

  .item__title {
    @include truncate;
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    color: $color-text-dark;
  }
  .item__subtitle {
    @include truncate;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    color: $color-text-semidark;
  }

  + .item {
    border-top: 1px solid $color-separator-light;
  }

  &:hover {
    background-color: $color-background-light;
  }
}
</style>
