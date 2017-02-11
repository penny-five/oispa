<template>
  <div class="content-wrapper">
    <header>
      <h1>{{ i18n('app title' )}}</h1>
      <img class="logo" :src="logo"></img>
    </header>
    <beer-style-picker :beer-styles="beerStyles" v-model="selectedBeerStyle"></beer-style-picker>
  </div>
</template>

<script>
import logo from '../../assets/logo.png';

import api from '../api';
import BeerStylePicker from './beer-style-picker';


export default {
  name: 'App',
  components: {
    BeerStylePicker
  },
  data: () => ({
    logo,
    beerStyles: [],
    selectedBeerStyle: null
  }),
  mounted() {
    api.echo().then(() => {
      console.log('ping!');
    });
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
