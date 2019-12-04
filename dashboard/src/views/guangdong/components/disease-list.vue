<template>
  <ul class="list">
    <li class="row">
      <p>市</p>
      <p>次数</p>
      <p>面积(k㎡)</p>
      <p>损失(万元)</p>
    </li>
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <p>{{item.name}}</p>
      <p><m-count :value="item.count" :decimal="0"/></p>
      <p><m-count :value="item.area"/></p>
      <p><b><m-count :value="item.lose"/></b></p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DiseaseList',
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
    width 28%
    &:nth-child(2)
      width 16%
  b
    color #FFCE34
</style>
