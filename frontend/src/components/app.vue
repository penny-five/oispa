<template>
  <div>
    <header-bar/>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderBar from './header-bar';


export default {
  name: 'App',
  components: {
    HeaderBar
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
</style>
