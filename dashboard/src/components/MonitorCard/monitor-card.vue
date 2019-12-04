<template>
<div class="monitor-card">
  <div v-if="mode == 1" class="card-wrapper">
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
  <div v-else-if="mode == 2" class="map-card-wrapper">
    <div class="card-title">{{title}}</div>
    <div class="card-content">
      <div class="edge left-bottom"/>
      <div class="edge right-bottom"/>
      <slot />
    </div>
  </div>
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
    mode: {
      type: [String, Number],
      default: '1',
    }
  }
}
</script>

<style lang="stylus" scoped>
$edgeWidth = 0
$size()
  height 100%
  width 100%

.monitor-card
  $size()
.card-wrapper
  $size()
  background $cardBg
  // border $cardBorder
  box-shadow inset 0 0 0.8rem rgba(100,200,255,0.5)
  padding 0.5rem 1rem
  position relative
  >.card-title
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
  >.edge
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
.map-card-wrapper
  $size()
  .card-title
    color #fff
    font-size 1.4rem
    font-family $font-pang
  .card-content
    background $color-map(0.1)
    border-top 0.12rem solid $edgeColor
    height calc(100% - 2rem)
    position relative
    >.edge
      position absolute
      width 1rem
      height 1rem
      border: 0.12rem solid $edgeColor
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
</style>
