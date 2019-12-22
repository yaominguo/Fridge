<template>
  <ul class="list">
    <li class="row">
      <p>市</p>
      <p>养殖面积(公顷)</p>
      <p>产量(吨)</p>
    </li>
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <p>{{item.name}}</p>
      <p><b><m-count :value="item.area" :decimal="0"/></b></p>
      <p><b><m-count :value="item.output" :decimal="0"/></b></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProductionList',
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
    width 40%
    text-align right
    &:first-child
      width 20%
      text-align center
    &:last-child
      b
        color $color-green
    b
      color #FFCE34
</style>
