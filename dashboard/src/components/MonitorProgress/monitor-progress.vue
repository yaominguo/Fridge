<template>
  <div class="monitor-progress" :style="style">
    <div class="progress-container" :style="containerStyle">
      <div class="progress-bar"/>
      <div class="progress-bg" :style="bgStyle"/>
    </div>
    <b v-if="!hideInfo" class="progress-info" :style="infoStyle">
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
  },
  computed: {
    style() {
      const size = Math.round(this.size / 10)
      const result = {
        padding: `${(size / 5).toFixed(1)}rem ${(size / 4.5).toFixed(1)}rem`,
      }
      if (!this.hideInfo) {
        result.width = '93%'
      } else {
        result.width = '100%'
      }
      return result
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
    infoStyle() {
      return {
        fontSize: `${(this.size * 0.7 / 10).toFixed(1)}rem`,
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
$radius = 2rem
.monitor-progress
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
        background-image repeating-linear-gradient(45deg, #fff, #fff 0.8rem, transparent 0.8rem, transparent 1.2rem)
        background-size 17rem
        animation rolling 10s linear infinite running
  .progress-info
    display flex
    align-items center
    justify-content center
    width 7%
    position absolute
    right -7%
    top 0
    color $edgeColor
    height 100%
    text-shadow 0 0 0.6rem $edgeColor
@keyframes rolling
  to
    background-position-x 17rem
</style>
