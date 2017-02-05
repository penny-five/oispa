<template>
  <h1>Hello world</h1>
</template>

<script>
import api from '../api';

export default {
  mounted() {
    api.beerstyles.getAll().then(beerstyles => {
      console.log(beerstyles);
    });
  }
};
</script>

<style lang="scss">
h1 {
  color: red;
}
</style>
