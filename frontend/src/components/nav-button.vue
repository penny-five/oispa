<template>
  <button class="nav-button" @click="onClick" :disabled="active">
    <i :class="`fa fa-${icon}`" aria-hidden="true"></i>
    <span class="label">{{ label }}</span>
  </button>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      if (!this.active) {
        this.$emit('click');
      }
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.nav-button {
  display: inline-block;

  float: left;

  position: relative;
  padding: $baseline 2*$baseline;

  color: white;
  text-align: center;

  background-color: transparent;

  border: none;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;

  &:hover {
    text-decoration: none;
    .label {
      text-decoration: underline;
    }
  }

  .label {
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
  }

  .fa {
    margin-right: 5px;
    font-size: 15px;
    color: rgba(black, 0.5);
  }

  &:hover, &:active, &:focus {
    outline: none;
  }

  &:disabled {
    background-color: darken($color-brand-primary, 5%);
    border-right: 1px solid darken($color-brand-primary, 15%);
    border-left: 1px solid darken($color-brand-primary, 15%);

    &:hover {
      cursor: default;
      .label {
        text-decoration: none;
      }
    }
  }
}
</style>
