<template>
  <footer>
    <span class="disclaimer" v-html="i18n('untappd_disclaimer')"></span>
    <span class="info">v. {{ version }} <span class="divider">|</span> <a :href="homepage">github</a></span>
  </footer>
</template>

<script>

export default {
  data: () => ({
    version: process.env.APP_VERSION,
    homepage: process.env.APP_HOMEPAGE
  })
};

</script>

<style lang="scss" scoped>
@import "assets/constants";
@import "assets/mixins";

footer {
  display: block;

  margin: auto;
  padding: 0 $baseline;

  height: $footer-height;
  max-width: $content-max-width;

  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: $footer-height;

  background-color: white;

  .disclaimer {
    display: inline-block;
  }

  .divider {
    color: $color-separator-light;
  }

  .info {
    display: inline-block;
    float: right;
  }

  &:before {
    content: "";
    position: absolute;
    left: $baseline; right: $baseline;
    border-top: 1px solid $color-separator-light;
  }

  @include breakpoint($breakpoint-desktop) {
    padding: 0;
    background-color: $color-body-background;

    &:before {
      content: none;
    }
  };
}
</style>
