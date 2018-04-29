<template>
  <div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="item-title border-bottom">
        <span class="item-icon"></span>
        {{item.title}}
      </div>
      <div v-if="item.children" class="item-subTitle">
        <detail-list :list="item.children"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .item-title
    height: $headerHeight
    display: flex
    align-items: center
    padding: 0 1rem
    color: $fontColor
    .item-icon
      display: inline-block
      width: 2rem
      height: 2rem
      background: url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 0.2rem no-repeat
      margin-right: .1rem
      background-size: 2rem
  .item-subTitle
    padding: 0 1.2rem
</style>
