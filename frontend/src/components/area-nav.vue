<template>
  <nav>
    <ul class="areas">
      <li v-if="areas != null" v-for="area in areas" :class="itemClasses(area)">
        <i class="fa fa-circle" aria-hidden="true"/><span class="name" @click="onSelect(area)">{{ area.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
    areas: Array,
    selectedArea: String
  },
  methods: {
    itemClasses(area) {
      return {
        area: true,
        'area--selected': this.selectedArea === area.id
      };
    },
    onSelect(area) {
      if (area.id !== this.selectedArea) this.$emit('select', area);
    }
  }
};

</script>

<style lang="scss" scoped>
.areas {
  height: $area-nav-height;
  text-align: center;

  background-color: black;

  .area {
    display: inline-block;
    margin: $baseline 0.5*$baseline;
    color: grey;

    transition: color 0.3s ease-in-out;

    > .fa {
      margin-right: 5px;

      opacity: 0;

      font-size: 10px;
      color: white;

      transition: opacity 0.2s ease-in-out;

      &:before {
        display: inline-block;
        height: $font-size-small;
        vertical-align: middle;
      }
    }

    > .name {
      font-size: $font-size-small;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    &.area--selected {
      color: white;

      > .fa {
        opacity: 1;
      }
    }
  }
}
</style>
