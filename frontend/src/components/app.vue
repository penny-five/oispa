<template>
  <div>
    <header-bar/>
    <div class="content-wrapper">
      <h2>{{ i18n('instructions') }}</h2>
      <beer-style-picker :beer-styles="beerStyles" v-model="selectedBeerStyle" />
      <template v-if="recommendations != null">
        <template v-if="recommendations.length > 0">
          <h2>{{ i18n('results found' )}}</h2>
          <ul>
            <venue-item v-for="recommendation in recommendations"
              :venue="recommendation.venue"
              :beers="recommendation.beers" />
          </ul>
        </template>
        <h2 v-else>{{ i18n('no search results') }}</h2>
      </template>
    </div>
  </div>
</template>

<script>
import api from '../api';
import BeerStylePicker from './beer-style-picker';
import HeaderBar from './header-bar';
import VenueItem from './venue-item';


export default {
  name: 'App',
  components: {
    BeerStylePicker,
    HeaderBar,
    VenueItem
  },
  data: () => ({
    beerStyles: [],
    selectedBeerStyle: null,
    recommendations: null
  }),
  watch: {
    selectedBeerStyle() {
      api.recommendations.getForBeerStyle(this.selectedBeerStyle.id).then(recommendations => {
        this.recommendations = recommendations;
      });
    }
  },
  mounted() {
    api.beerStyles.getAll().then(beerStyles => {
      this.beerStyles = beerStyles;
    });
  }
};

</script>

<style lang="scss">
@import "assets/styles";
@import "assets/constants";

.content-wrapper {
  max-width: $content-max-width;
  margin: auto;
  padding: $baseline;
}

header {
  padding: $baseline;
  margin: auto;
  text-align: center;
}

h1 {
  display: inline-block;
  margin: 0;

  font-size: 10rem;
  font-weight: $font-weight-regular;
  line-height: $logo-height;
  vertical-align: top;

  color: $color-text-dark;
}

.logo {
  display: inline-block;
  max-height: $logo-height;
  margin-left: 25px;
}
</style>
