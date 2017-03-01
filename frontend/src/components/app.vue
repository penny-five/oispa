<template>
  <div>
    <header-bar/>
    <nav>
      <nav-button to="recommendations" icon="beer" label="Kaljat"/>
      <nav-button to="venues" icon="cutlery" label="Ravintelit"/>
    </nav>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderBar from './header-bar';
import NavButton from './nav-button';


export default {
  name: 'App',
  components: {
    HeaderBar,
    NavButton
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
