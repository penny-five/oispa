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
        <nav-button to="recommendations" icon="beer" label="Kaljat"/>
        <nav-button to="venues" icon="cutlery" label="Ravintelit"/>
      </nav>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    selectedArea: state => state.selectedArea,
    hasFetchedAreas: state => state.areas != null
  }),
  methods: {
    onSelectArea(area) {
      this.$store.dispatch('updateSelectedArea', area);
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
