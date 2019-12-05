<template>
  <ul class="list">
    <li class="row" v-for="(item, i) in list" :key="item.name + i">
      <span class="name">{{item.name}}</span>
      <Progress class='progress' style="width: 40%" :percent="calcPercent(item.value)" :stroke-width="12" :hide-info="true" status="active" :stroke-color="['#0176fe', '#4aecfd']" />
      <div>
        <b><m-count :value="item.value"/></b>
        <span class="unit">{{item.unit}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProgressList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    calcPercent(val) {
      if (!val || val < 0) return 0
      const percent = Math.round((val / 50) * 100)
      return percent >= 100 ? 100 : percent
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
    .name
      width 21%
    b
      font-size 1.1rem
      color #71C012
    .unit
      font-size 0.5rem
      margin-left 0.2rem
</style>

<style lang="stylus">
.list
  .progress
    .ivu-progress-inner
      background-color transparent
</style>
