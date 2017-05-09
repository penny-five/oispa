<template>
  <footer>
    <div class="footer-wrapper">
      <span class="disclaimer" v-html="i18n('untappd_disclaimer')"></span>
      <span class="info">v. {{ version }}<span class="divider">|</span><a :href="homepage">github</a></span>
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
footer {
  display: block;

  padding: 0 $content-horizontal-padding-mobile;

  font-size: $font-size-small;
  font-weight: $font-weight-regular;
  line-height: $footer-height;
  color: $color-text-light;

  background-color: $color-background-dark;

  .footer-wrapper {
    margin: auto;
    height: $footer-height;
    max-width: $desktop-content-max-width;
  }

  .disclaimer {
    display: inline-block;

    font-weight: $font-weight-bold;

    a {
      color: $color-brand-secondary;
    }
  }

  .divider {
    margin: 0 0.8rem;
    color: transparentize($color-separator-light, 0.8);
  }

  .info {
    display: inline-block;
    float: right;

    font-weight: $font-weight-bold;

    a {
      color: $color-brand-secondary;
    }
  }

  @include breakpoint($breakpoint-tablet) {
    padding: 0 $content-horizontal-padding-tablet;
  }

  @include breakpoint($breakpoint-desktop) {
    padding: 0;

    &::before {
      content: none;
    }
  }
}
</style>
