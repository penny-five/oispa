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
.nav-button {
  display: inline-block;

  position: relative;
  padding: $baseline 2 * $baseline;

  height: $main-nav-height;

  color: #fff;
  text-align: center;

  font-size: $font-size-large;
  font-weight: $font-weight-bold;

  background-color: transparent;

  border: 0 transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;

  &:hover {
    text-decoration: none;

    .label {
      text-decoration: underline;
    }
  }

  .fa {
    margin-right: 5px;
    font-size: 15px;
    color: rgba(#000, 0.5);
  }

  &:hover,
  &:active,
  &:focus {
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
