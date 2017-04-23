<template>
  <nav class="nav-bar clearfix">
    <div class="wrapper">
      <nav-button icon="beer" :label="i18n('nav.categories')" :active="isCategories" @click="onSelectCategories"/>
      <nav-button icon="cutlery" :label="i18n('nav.venues')" :active="isVenues" @click="onSelectVenues"/>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import NavButton from './nav-button';


export default {
  components: {
    NavButton
  },
  computed: mapState({
    areas: state => state.areas,
    selectedArea: state => state.route.params.area,
    hasFetchedAreas: state => state.areas != null,
    isVenues: state => state.route.meta.type === 'venues',
    isCategories: state => state.route.meta.type === 'categories'
  }),
  methods: {
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

<style lang="scss" scoped>
.nav-bar {
  display: block;

  width: 100%;

  background-color: $color-brand-primary;
  border-bottom: 1px solid darken($color-brand-primary, 15%);

  > .wrapper {
    margin: auto;
    max-width: $content-max-width;
  }
}
</style>
