<template>
  <div class="page-instructions">
    <img
      class="illustration"
      :height="`${illustrationHeight}px`"
      :width="`${illustrationWidth}px`"
      :src="illustration"
      v-if="illustration"/>
    <h2 class="text">{{ text }}</h2>
  </div>
</template>

<script>

export default {
  props: {
    illustration: String,
    illustrationWidth: Number,
    illustrationHeight: Number,
    text: {
      type: String,
      required: true
    }
  }
};

</script>

<style lang="scss" scoped>
.page-instructions {
  margin: 2 * $baseline;
  text-align: center;

  .text {
    margin: $baseline 0;
  }

  @include breakpoint($breakpoint-tablet) {
    .illustration {
      vertical-align: middle;
    }

    .text {
      display: inline;
      margin: 0 0 0 $baseline;
      vertical-align: middle;
    }
  }
}

</style>
