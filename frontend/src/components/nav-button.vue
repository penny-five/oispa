<template>
  <div :class="classes" @click="onClick">
    <i :class="`fa fa-${icon}`" aria-hidden="true"></i>
    <span class="nav-button__label">{{ label }}</span>
  </div>
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
  computed: {
    classes() {
      return {
        'nav-button': true,
        'nav-button--active': this.active
      };
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
  float: left;
  position: relative;
  padding: 2*$baseline $baseline;
  width: 50%;

  text-align: center;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    .nav-button__label {
      text-decoration: underline;
    }
  }

  .fa {
    display: block;
    margin-bottom: $baseline;
    font-size: 20px;
    color: $color-inactive;
  }

  &.nav-button--active {
    background-color: white;

    &:hover {
      cursor: default;
      .nav-button__label {
        text-decoration: none;
      }
    }
    .nav-button__label {
      font-size: $font-size-medium;
      font-weight: $font-weight-semibold;
    }
    .fa {
      color: black;
    }
  }
}
</style>
