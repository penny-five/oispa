<template>
  <div>
    <header-bar>
      <area-list
      v-if="hasFetchedAreas"
      :areas="areas"
      :selected-area="selectedArea"
      @select="onSelectArea" />
    </header-bar>
    <template v-if="hasFetchedAreas">
      <nav>
        <nav-button icon="beer" label="Kaljat" :active="isRecommendations" @click="onSelectRecommendations" />
        <nav-button icon="cutlery" label="Ravintelit" :active="isVenues" @click="onSelectVenues" />
      </nav>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import HeaderBar from './header-bar';
import AreaList from './area-list';
import NavButton from './nav-button';


export default {
  name: 'App',
  components: {
    HeaderBar,
    AreaList,
    NavButton
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

nav {
  max-width: $content-max-width;
  margin: auto;
}

.content-wrapper {
  max-width: $content-max-width;
  margin: auto;
  padding: $baseline;
}
</style>
