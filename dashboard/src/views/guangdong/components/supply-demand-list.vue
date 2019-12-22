<template>
<ul class="list">
  <li class="row title">
    <p>品种</p>
    <p>供/求</p>
    <p>数量</p>
    <!-- <p>最小价格</p>
    <p>最大价格</p> -->
    <p>价格</p>
    <p>价格单位</p>
  </li>
  <VueSeamlessScroll v-if="list.length > 0" :autoPlay="true" :class-option="{step: 0.5}" :data="list" class="seamless-wrap">
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <p>{{item.name}}</p>
      <p :style="whichColor(item.type)">{{item.type}}</p>
      <p>{{item.count}}</p>
      <!-- <p><b><m-count :value="item.min"/></b></p>
      <p><b><m-count :value="item.max"/></b></p> -->
      <p><b><m-count :value="item.price"/></b></p>
      <p>{{item.unit}}</p>
    </li>
  </VueSeamlessScroll>
</ul>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'SupplyDemandList',
  components: {VueSeamlessScroll},
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    whichColor(type) {
      return {
        color: type == '供' ? 'green' : 'red',
        fontWeight: 'bold',
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  height 100%
  overflow hidden
  padding 0.5rem
.row
  display flex
  color #ccc
  padding 0.5rem 0 0.5rem 1rem
  align-items center
  justify-content space-between
  border-bottom 0.1rem solid rgba(28, 66, 95, 0.4)
  background $color-map(0.05)
  &.title
    // color $color-map(1)
    font-weight bold
    color #fff
    background $color-map(0.2)
    position sticky
    top 0
  &:nth-child(2n)
    background transparent
  p
    text-align left
    width 15%
    &:first-child
      width 40%
.seamless-wrap
  overflow hidden
</style>
