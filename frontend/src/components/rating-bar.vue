<template>
  <div class="rating-bar"></div>
</template>

<script>
import ProgressBar from 'progressbar.js';


export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.bar = new ProgressBar.Circle(this.$el, {
      trailColor: '#e8e8e8',
      strokeWidth: 6,
      trailWidth: 6,
      easing: 'easeInOut',
      duration: 1000,
      text: {
        className: 'rating-bar__text',
        style: null
      },
      from: { color: '#ff0000', width: 6 },
      to: { color: '#00ff00', width: 6 },
      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        const value = (circle.value() * 5.0).toFixed(2);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      }
    });
    this.bar.animate(this.rating / 5.0);
  },
  watch: {
    rating() {
      this.bar.set(0);
      this.bar.animate(this.rating / 5.0);
    }
  }
};

</script>

<style lang="scss">
@import "assets/constants";

$rating-bar-size: 50px;

.rating-bar {
  position: relative;
  width: $rating-bar-size;
  height: $rating-bar-size;
  font-weight: $font-weight-bold;

  .rating-bar__text {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0;
    margin: 0;

    font-size: 1.7rem;
    color: $color-text-dark;

    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
