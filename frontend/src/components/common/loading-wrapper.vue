<template>
  <div class="loading-wrapper">
    <transition name="loading-wrapper-fade" mode="out-in">
      <slot>
        <div class="loading-wrapper__placeholder" key="placeholder">
          <i class="fa fa-circle-o-notch fa-spin"></i>
        </div>
      </slot>
    </transition>
  </div>
</template>

<style lang="scss">
.loading-wrapper__placeholder {
  padding: 4*$baseline;
  text-align: center;

  > .fa {
    font-size: 40px;
    color: $color-brand-primary;
  }
}

.loading-wrapper-fade-enter-active {
  transition: opacity 0.5s ease-in;
}

.loading-wrapper-fade-leave-active {
  transition: opacity .2s;
}

.loading-wrapper-fade-enter, .loading-wrapper-fade-leave-to {
  opacity: 0;
}
</style>
