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

  @include breakpoint($breakpoint-desktop) {
    position: fixed;
    top: 0;
  }
}

main {
  margin: 0 auto;
  min-height: calc(100vh - #{$header-height} - #{$footer-height});

  max-width: $content-max-width;

  background-color: white;

  @include breakpoint($breakpoint-desktop) {
    margin: $content-margin-top auto 0 auto;
    min-height: calc(100vh - #{$header-height} - #{$footer-height} - #{2*$baseline});
  }
}

.content-wrapper {
  max-width: $content-max-width;
  margin: auto;
  padding: $baseline $baseline 3*$baseline;

  @include breakpoint($breakpoint-desktop) {
    padding: 2*$baseline;
  }
}
</style>
