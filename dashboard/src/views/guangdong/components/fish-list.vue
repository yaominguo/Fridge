<template>
  <ul class="list">
    <li class="row">
      <p>月份</p>
      <p>0.6-1斤</p>
      <p>1斤以上</p>
      <p>1.2斤以上</p>
    </li>
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <p>{{item.name}}</p>
      <p><b><m-count :value="item.one"/></b></p>
      <p><b><m-count :value="item.two"/></b></p>
      <p><b><m-count :value="item.three"/></b></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FishList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  height 100%
  overflow auto
  padding 0.5rem 1rem
.row
  display flex
  color #ccc
  padding 0.5rem 0
  align-items center
  justify-content space-between
  border-bottom 0.1rem solid rgba(28, 66, 95, 0.4)
  &:first-child
    color $color-map(1)
  p
    width 30%
    text-align right
    &:first-child
      width 20%
      text-align center
    b
      color #FFCE34
</style>
