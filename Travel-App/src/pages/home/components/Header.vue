<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      请输入搜索名称
    </div>
    <div class="header-right">
      {{city}}
      <span class="iconfont">&#xe62d;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    city: String
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .header
    height: 3rem
    display: flex
    align-items: center
    background: $bgColor
    color: #fff
    .header-left
      width: 10%
      float: left
      text-align: center
    .header-input
      display: flex
      padding: 0 1rem
      flex: 1
      background: #fff
      border-radius: 3px
      height: 80%
      color: #ccc
      align-items: center
    .header-right
      width: 20%
      float: right
      text-align: center
</style>
