<template>
  <li class="item" @click="onClick">
    <span class="item__title" v-html="highlightedTitle"/>
    <span class="item__subtitle" v-if="subtitle != null">{{ subtitle }}</span>
  </li>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    highlight: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
  },
  computed: {
    highlightedTitle() {
      if (!this.highlight) return this.title;
      const highlightStartIndex = this.title.toLowerCase().indexOf(this.highlight.toLowerCase());
      const highlighEndIndex = highlightStartIndex + this.highlight.length;
      const preHighlightedText = this.title.substr(0, highlightStartIndex);
      const highlightedText = this.title.substr(highlightStartIndex, this.highlight.length);
      const postHighlightedText = this.title.substr(highlighEndIndex);
      return `${preHighlightedText}<mark>${highlightedText}</mark>${postHighlightedText}`;
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};

</script>

<style lang="scss" scoped>
.item {
  padding: 1.5*$baseline $baseline;

  cursor: pointer;

  transition: background-color .2s ease-out;

  .item__title {
    @include truncate;
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    color: $color-text-dark;
  }
  .item__subtitle {
    @include truncate;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    color: $color-text-semidark;
  }

  + .item {
    border-top: 1px solid $color-separator-light;
  }

  &:hover {
    background-color: $color-background-light;
  }
}
</style>
