<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <span class="iconfont back-btn">&#xe624;</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    position: relative
    overflow: hidden
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $bgColor
    font-size: 1.1rem
    .back-btn
      position: absolute
      left: 0
      padding: 0 1rem
      color: #fff
</style>
