<template>
  <div class="search-bar">
    <input type="text" placeholder="请输入城市名或拼音">
  </div>
</template>

<script>
export default {
  name: 'CitySearch'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .search-bar
    height: $headerHeight
    line-height: $headerHeight
    background: $bgColor
    padding: 0 1rem
    input
      height: 2rem
      width: 100%
      border-radius: 3px
      border: none
      padding: 0 1rem
      box-sizing: border-box
</style>
