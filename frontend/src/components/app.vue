<template>
  <div>
    <app-header>
      <area-picker
      v-if="hasFetchedAreas"
      :areas="areas"
      :selected-area="selectedArea"
      @select="onSelectArea" />
    </app-header>
    <main>
      <nav class="clearfix">
        <nav-button icon="beer" :label="i18n('nav.categories')" :active="isCategories" @click="onSelectCategories" />
        <nav-button icon="cutlery" :label="i18n('nav.venues')" :active="isVenues" @click="onSelectVenues" />
      </nav>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppHeader from './app-header';
import AreaPicker from './area-picker';
import NavButton from './nav-button';
import AppFooter from './app-footer';


export default {
  name: 'App',
  components: {
    AppHeader,
    AreaPicker,
    NavButton,
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
@import "assets/constants";
@import "assets/mixins";

nav {
  max-width: $content-max-width;
  margin: auto;
  background-color: $color-body-background;
}

main {
  margin: 0 auto;
  min-height: calc(100vh - #{$header-height} - #{$footer-height});

  max-width: $content-max-width;

  background-color: white;

  @include breakpoint($breakpoint-desktop) {
    margin: $header-height + 2*$baseline auto 0 auto;
    min-height: calc(100vh - #{$header-height} - #{$footer-height} - #{2*$baseline});
  }
}

.content-wrapper {
  max-width: $content-max-width;
  margin: auto;
  padding: $baseline;

  @include breakpoint($breakpoint-desktop) {
    padding: 2*$baseline;
  }
}
</style>
