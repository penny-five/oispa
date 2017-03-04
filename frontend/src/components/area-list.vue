<template>
  <ul class="area-list">
    <li v-for="area in areas" :class="itemClasses(area)">
      <span @click="onSelect(area)">{{ area.abbr }}</li>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    areas: {
      type: Array,
      required: true
    },
    selectedArea: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemClasses(area) {
      return {
        'area-item': true,
        'area-item--selected': this.selectedArea.id === area.id
      };
    },
    onSelect(area) {
      this.$emit('select', area);
    }
  }
};

</script>

<style lang="scss" scoped>
@import "assets/constants";

.area-list {
  display: inline-block;
  margin: 4px 8px;
}

.area-item {
  display: inline-block;
  font-size: $font-size-small;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &.area-item--selected {
    font-weight: bold;

    &:hover {
      cursor: auto;
      text-decoration: none;
    }
  }

  &:not(:last-of-type)::after {
    content: "|";
    display: inline-block;
    margin: 0 8px;

    font-weight: $font-weight-regular;
    color: #b1b1b1;
  }
}
</style>
