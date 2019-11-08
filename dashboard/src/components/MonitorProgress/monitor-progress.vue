<template>
  <div class="monitor-progress">
    <div class="progress-container">
      <div class="progress-bar"/>
      <div class="progress-bg"/>
    </div>
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
      default: null,
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
}
</script>

<style lang="stylus" scoped>
$radius = 2rem
.monitor-progress
  width 100%
  padding 0.4rem 0.5rem
  border-radius $radius
  background transparent
  box-shadow inset 0 0 0.2rem 0 #000
  .progress-container
    width 100%
    position relative
    height 2rem
    border-radius $radius
    div
      position: absolute
      top 0
      left 0
      width 100%
      height 100%
      border-radius $radius
      &.progress-bg
        background linear-gradient(90deg, #0176fe, #4aecfd)
      &.progress-bar
        background-position 0%
        z-index 1
        opacity 0.2
        background-image repeating-linear-gradient(45deg, #fff, #fff 0.8rem, transparent 0.8rem, transparent 1.4rem)
        animation loading-slide 1s linear infinite
@keyframes loading-slide
  to
    background-position 100%
</style>
