<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont">&#xe624;</span>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      请输入搜索名称
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{this.$store.state.city}}
        <span class="iconfont">&#xe62d;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .header
    height: $headerHeight
    display: flex
    align-items: center
    background: $bgColor
    color: #fff
    .header-left
      width: 2rem
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
      padding: 0 0.5rem
      float: right
      text-align: center
      color: #fff
</style>
