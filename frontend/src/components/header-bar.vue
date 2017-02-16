<template>
  <header>
    <img class="logo" :src="logo"></img>
    <h1>{{ i18n('app title' )}}</h1>
  </header>
</template>

<script>
import logo from '../../assets/logo.png';

export default {
  data: () => ({
    logo
  })
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

header {
  background-color: $color-background-light;
  padding: $baseline;

  width: 100%;

  text-align: center;
}

h1 {
  display: inline-block;
  margin: 0;

  vertical-align: top;

  font-size: 2.8rem;
  letter-spacing: 5px;
  line-height: $logo-height;

  text-transform: uppercase;

  color: $color-text-dark;
}

.logo {
  display: inline-block;
  max-height: $logo-height;
  margin-right: 3*$baseline;
}
</style>
