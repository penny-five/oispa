<template>
  <a :href="href" :target="target" v-if="href != null">
    <slot></slot>
  </a>
  <span v-else>
    <slot></slot>
  </span>
</template>

<script>

export default {
  props: {
    href: String,
    target: {
      type: String,
      default: '_self'
    }
  }
};

</script>
