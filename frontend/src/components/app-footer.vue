<template>
  <footer>
    <div class="footer-wrapper">
      <span class="disclaimer" v-html="i18n('untappd_disclaimer')"></span>
      <span class="info">v. {{ version }} <span class="divider">|</span> <a :href="homepage">github</a></span>
    </div>
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

<style lang="scss">
@import "assets/constants";
@import "assets/mixins";

footer {
  display: block;

  padding: 0 $baseline;

  color: $color-text-light;
  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: $footer-height; 

  background-color: $color-background-dark;

  .footer-wrapper {
    margin: auto;
    height: $footer-height;
    max-width: $content-max-width;
  }

  .disclaimer {
    display: inline-block;

    a {
      color: white;
    }
  }

  .divider {
    color: $color-separator-light;
  }

  .info {
    display: inline-block;
    float: right;

    a {
      color: white;
    }
  }

  &:before {
    content: "";
    position: absolute;
    left: $baseline; right: $baseline;
    border-top: 1px solid $color-separator-light;
  }

  @include breakpoint($breakpoint-desktop) {
    padding: 0;

    &:before {
      content: none;
    }
  };
}
</style>
