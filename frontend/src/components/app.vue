<template>
  <div>
    <header-bar>
      <area-list
      v-if="hasFetchedAreas"
      :areas="areas"
      :selected-area="selectedArea"
      @select="onSelectArea" />
    </header-bar>
    <main>
      <nav class="clearfix">
        <nav-button icon="beer" :label="i18n('nav.beers')" :active="isRecommendations" @click="onSelectRecommendations" />
        <nav-button icon="cutlery" :label="i18n('nav.venues')" :active="isVenues" @click="onSelectVenues" />
      </nav>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import HeaderBar from './header-bar';
import AreaList from './area-list';
import NavButton from './nav-button';
import FooterBar from './footer-bar.vue';


export default {
  name: 'App',
  components: {
    HeaderBar,
    AreaList,
    NavButton,
    FooterBar
  },
  computed: mapState({
    areas: state => state.areas,
    selectedArea: state => state.route.params.area,
    hasFetchedAreas: state => state.areas != null,
    isVenues: state => state.route.meta.type === 'venues',
    isRecommendations: state => state.route.meta.type === 'recommendations'
  }),
  methods: {
    ...mapActions([
      'updateSelectedArea'
    ]),
    onSelectArea(area) {
      this.$router.push({
        name: 'recommendations',
        params: {
          area: area.id
        }
      });
    },
    onSelectRecommendations() {
      this.$router.push({
        name: 'recommendations'
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
