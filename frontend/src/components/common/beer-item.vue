<template>
  <li class="beer clearfix">
    <span class="beer__last-seen">{{ lastSeen }}</span>
    <rating-bar class="beer__rating" :rating="beer.avg_rating"/>
    <div class="beer__info">
      <span class="beer__name">
        <link-wrapper :href="beer.untappd_url" target="_blank">
          {{ beer.name }}
        </link-wrapper>
      </span>
      <span class="beer__brewery">{{ beer.brewery }}</span>
      <span class="beer__style"><span class="beer__abv">{{ beer.abv }} %</span>{{ beer.beerstyle_name }}</span>
    </div>
  </li>
</template>

<script>
import moment from 'moment';

import RatingBar from './rating-bar';
import LinkWrapper from './link-wrapper';
import { formatPastDate } from '../../utils/date';


export default {
  components: {
    RatingBar,
    LinkWrapper
  },
  props: {
    beer: {
      type: Object,
      required: true
    }
  },
  computed: {
    lastSeen() {
      return formatPastDate(this.i18n, moment(this.beer.latest_sighting));
    }
  }
};
</script>

<style lang="scss" scoped>
.beer {
  margin: 2*$baseline 0;

  .beer__last-seen {
    float: right;
    font-size: $font-size-tiny;
    font-weight: $font-weight-regular;
    line-height: $font-size-medium;
  }

  .beer__rating {
    float: left;
    margin-right: $baseline;
  }

  .beer__info {
    overflow: hidden;
  }

  .beer__name {
    display: block;
    font-size: $font-size-large;
    font-weight: $font-weight-semibold;
  }

  .beer__abv {
    margin-right: 1ch;
    font-size: $font-size-tiny;
    font-weight: $font-weight-semibold;
  }

  .beer__brewery {
    display: block;
    font-size: $font-size-tiny;
    font-weight: $font-weight-regular;
  }

  .beer__style {
    display: block;
    font-size: $font-size-tiny;
    font-weight: $font-weight-regular;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
