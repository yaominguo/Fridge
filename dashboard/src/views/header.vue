<template>
  <div class="header">
    <h1 class="main-title">项目管理</h1>
    <div class="info">
      <template v-for="item in list">
        <div :key="item.name">
          <p>
            <b><m-count :value="item.count"/></b>{{item.unit}}
          </p>
          <p>{{item.name}}</p>
        </div>
        <Divider :key="'d' + item.name" class="divider" type="vertical"/>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      list: [
        {
          name: '项目总数',
          count: 13,
          unit: '个',
        },
        {
          name: '人员总数',
          count: 43,
          unit: '人',
        },
        {
          name: '总收入',
          count: 13476678.48,
          unit: '元',
        },
        {
          name: '总成本',
          count: 8726723.17,
          unit: '元',
        },
        {
          name: '利润',
          count: 4749966.31,
          unit: '个',
        },
        {
          name: '利润率',
          count: 43,
          unit: '%',
        },
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center
  color $edgeColor
  font-family DIN, Microsoft YaHei UI
  .main-title
    margin 0 5rem 0 3rem
  .info
    display flex
    align-items center
    div
      display flex
      flex-direction column
      p:last-child
        font-weight 100
      b
        font-size 1.8rem
    .divider
      margin 0 3rem
      background $edgeColor
      opacity 0.5
</style>
