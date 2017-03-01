<template>
  <div class="nav-button">
    <router-link :to="to">
      <i :class="`fa fa-${icon}`" aria-hidden="true"></i>
      <span class="nav-button__label">{{ label }}</span>
    </router-link>
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
    to: {
      type: String,
      required: true
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.nav-button {
  display: inline-block;
  position: relative;
  padding: 2*$baseline $baseline $baseline;
  width: 49%;

  text-align: center;

  a:hover {
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

  .router-link-active {
    .nav-button__label {
      font-size: $font-size-medium;
      font-weight: $font-weight-semibold;
    }
    .fa {
      color: black;
    }
  }

  +.nav-button::before {
    content: "";
    display: block;
    position: absolute;
    top: 0; bottom: 0; left: 0;
    border-left: 2px solid $color-separator-light;
  }
}
</style>
