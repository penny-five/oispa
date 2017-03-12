<template>
  <div></div>
</template>

<script>

export default {
  mounted() {
    this.$router.replace({
      name: 'categories',
      params: {
        area: this.$store.state.areas[0].id
      }
    });
  }
};
</script>
