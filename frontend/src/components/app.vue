<template>
  <div>
    <header>
      <area-nav :areas="areas" :selected-area="selectedArea" @select="onSelectArea"/>
      <logo-bar/>
      <main-nav/>
    </header>
    <main>
      <div class="content-wrapper">
        <router-view/>
      </div>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AreaNav from './area-nav';
import LogoBar from './logo-bar';
import MainNav from './main-nav';
import AppFooter from './app-footer';


export default {
  name: 'App',
  components: {
    AreaNav,
    LogoBar,
    MainNav,
    AppFooter
  },
  computed: mapState({
    areas: state => state.areas,
    selectedArea: state => state.route.params.area,
    hasFetchedAreas: state => state.areas != null,
    isVenues: state => state.route.meta.type === 'venues',
    isCategories: state => state.route.meta.type === 'categories'
  }),
  methods: {
    ...mapActions([
      'updateSelectedArea'
    ]),
    onSelectArea(area) {
      this.$router.push({
        name: 'categories',
        params: {
          area: area.id
        }
      });
    },
    onSelectCategories() {
      this.$router.push({
        name: 'categories'
      });
    },
    onSelectVenues() {
      this.$router.push({
        name: 'venues'
      });
    }
  }
};

</script>

<style lang="scss">
@import "assets/styles";

header {
  width: 100%;
  z-index: 100;

  @include breakpoint($breakpoint-tablet) {
    position: fixed;
    top: 0;
  }
}

main {
  margin: 0 auto;
  min-height: calc(100vh - #{$header-height} - #{$footer-height});

  background-color: #fff;

  @include breakpoint($breakpoint-tablet) {
    margin: $content-margin-top auto 0 auto;
    min-height: calc(100vh - #{$header-height} - #{$footer-height} - #{2*$baseline});
  }

  @include breakpoint($breakpoint-desktop) {
    max-width: $desktop-content-max-width;
  }
}

.content-wrapper {
  margin: auto;
  padding: $baseline $content-horizontal-padding-mobile 3 * $baseline;

  @include breakpoint($breakpoint-tablet) {
    padding: 2 * $baseline $content-horizontal-padding-tablet;
  }

  @include breakpoint($breakpoint-desktop) {
    max-width: $desktop-content-max-width;
    padding: 2 * $baseline $content-horizontal-padding-desktop;
  }
}
</style>
