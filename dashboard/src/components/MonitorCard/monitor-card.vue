<template>
  <div class="card-wrapper">
    <div class="card-title">收入监控</div>
    <div class="edge left-top"/>
    <div class="edge right-top"/>
    <div class="edge left-bottom"/>
    <div class="edge right-bottom"/>
    <div class="edge shadow left"/>
    <div class="edge shadow right"/>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MonitorCard'
}
</script>

<style lang="stylus" scoped>
.card-wrapper
  background $cardBg
  border $cardBorder
  width 100%
  height 100%
  padding 0.5rem 1rem
  position relative
  .card-title
    color $cardFontColor
    border-bottom $cardBorder
    padding-bottom 0.5rem
    font-size 1.2rem
    font-weight bold
  .edge
    position absolute
    width 1rem
    height 1rem
    border: 0.1rem solid $edgeColor
    &.left-top
      border-right-color transparent
      border-bottom-color transparent
      top 0
      left 0
    &.right-top
      border-left-color transparent
      border-bottom-color transparent
      top 0
      right 0
    &.left-bottom
      border-right-color transparent
      border-top-color transparent
      bottom 0
      left 0
    &.right-bottom
      border-left-color transparent
      border-top-color transparent
      bottom 0
      right 0
    &.shadow
      background $edgeColor
      height 24%
      width 0.1rem
      border none
      top 0
      bottom 0
      margin auto
      &.left
        left 0
        box-shadow 1px 0px 6px 1px $edgeColor
      &.right
        right 0
        box-shadow -1px 0px 6px 1px $edgeColor
</style>
