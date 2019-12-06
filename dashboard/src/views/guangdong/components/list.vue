<template>
  <ul class="list">
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <p>{{item.name}}</p>
      <p>
        <b><m-count :value="item.value" :decimal="decimal"/></b>
        <span>{{item.unit}}</span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DataList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    decimal: { // 默认保留2位小数点
      type: Number,
      default: 2,
    },
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
  p
    >b
      font-size 1.1rem
      color $color-map(1)
    >span
      font-size 0.5rem
</style>
