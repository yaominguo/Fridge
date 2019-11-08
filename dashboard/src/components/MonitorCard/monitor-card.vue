<template>
  <div class="card-wrapper">
    <div class="card-title">
      <span class="s"/>
      <span class="m"/>
      <p>{{title}}</p>
      <span class="m"/>
      <span class="s"/>
    </div>
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
  name: 'MonitorCard',
  props: {
    title: {
      type: String,
      default: '标题',
    },
  }
}
</script>

<style lang="stylus" scoped>
$edgeWidth = -0.1rem
.card-wrapper
  background $cardBg
  border $cardBorder
  width 100%
  height 100%
  padding 0.5rem 1rem
  position relative
  .card-title
    display flex
    align-items center
    color $cardFontColor
    border-bottom $cardBorder
    padding-bottom 0.5rem
    font-size 1.2rem
    font-weight 460
    p
      margin 0 0.5rem
    span
      display inline-block
      background $edgeColor
      margin 0 0.1rem
      &.s
        width 0.2rem
        height 1rem
        opacity 0.5
      &.m
        width 0.3rem
        height 1.2rem
  .edge
    position absolute
    width 1rem
    height 1rem
    border: 0.12rem solid $edgeColor
    &.left-top
      border-right-color transparent
      border-bottom-color transparent
      top $edgeWidth
      left $edgeWidth
    &.right-top
      border-left-color transparent
      border-bottom-color transparent
      top $edgeWidth
      right $edgeWidth
    &.left-bottom
      border-right-color transparent
      border-top-color transparent
      bottom $edgeWidth
      left $edgeWidth
    &.right-bottom
      border-left-color transparent
      border-top-color transparent
      bottom $edgeWidth
      right $edgeWidth
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
