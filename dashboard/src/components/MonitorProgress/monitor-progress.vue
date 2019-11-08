<template>
  <div class="monitor-progress" :style="style">
    <div class="progress-container" :style="containerStyle">
      <div class="progress-bar"/>
      <div class="progress-bg" :style="bgStyle"/>
    </div>
    <b v-if="!hideInfo" class="progress-info">
      <m-count :value="percent"/>%
    </b>
  </div>
</template>

<script>
export default {
  name: 'MonitorProgress',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    color: {
      type: String | Array,
      default: '#0176fe',
    },
    size: {
      type: Number,
      default: 20,
    },
    hideInfo: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'active',
    }
  },
  computed: {
    style() {
      if (!this.hideInfo) {
        return {
          width: '95%',
        }
      }
      return {
        width: '100%',
      }
    },
    containerStyle() {
      return {
        height: `${Math.round(this.size / 10)}rem`,
        width: `${this.percent}%`,
      }
    },
    bgStyle() {
      if ('string' === typeof this.color) {
        return {
          background: this.color
        }
      } else {
        return {
          background: `linear-gradient(90deg, ${this.color[0]}, ${this.color[1]})`
        }
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
$radius = 2rem
.monitor-progress
  padding 0.5rem 0.6rem
  position relative
  border-radius $radius
  background rgba(0,0,0,0.18)
  box-shadow inset 0 0 0.2rem 0 #000
  .progress-container
    width 0
    position relative
    border-radius $radius
    transition width 2s ease
    div
      position: absolute
      top 0
      left 0
      width 100%
      height 100%
      border-radius $radius
      &.progress-bar
        z-index 1
        opacity 0.2
        background-image repeating-linear-gradient(45deg, #fff, #fff 0.8rem, transparent 0.8rem, transparent 1.4rem)
        background-size 10rem
        animation loading-slide 30s linear infinite running
  .progress-info
    display flex
    align-items center
    justify-content center
    width 5%
    position absolute
    right -5%
    top 0
    color $edgeColor
    font-size 1.6rem
    height 100%
    text-shadow 0 0 0.6rem $edgeColor
@keyframes loading-slide
  to
    background-position 100%
</style>
