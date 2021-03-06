<template>
  <div class="rating-bar"></div>
</template>

<script>
import ProgressBar from 'progressbar.js';
import BezierEasing from 'bezier-easing';
import inViewport from 'in-viewport';


const EASING_FN = BezierEasing(0.75, 0.00, 0.76, 1.00);

export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    /**
     * 90% of beers are rated between 3.0 and 4.0. Use eased values to generate more interesting looking rating bars.
     */
    scaledRating() {
      return EASING_FN(this.rating / 5);
    }
  },
  mounted() {
    const vm = this;
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
      from: { color: '#ff3333', width: 6 },
      to: { color: '#16e086', width: 6 },
      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        const value = ((circle.value() / vm.scaledRating) * vm.rating).toFixed(2);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      }
    });
    this.updateRating();
  },
  watch: {
    rating() {
      this.updateRating();
    }
  },
  methods: {
    updateRating() {
      if (inViewport(this.$el)) {
        this.bar.set(0);
        this.bar.animate(this.scaledRating);
      } else {
        this.bar.set(this.scaledRating);
      }
    }
  }
};

</script>

<style lang="scss">
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

    font-size: $font-size-large;
    color: $color-text-dark;

    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
