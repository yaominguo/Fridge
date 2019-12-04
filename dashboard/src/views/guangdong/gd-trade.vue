<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap />
    <ThemeTitle style="width: 200%;">渔业种业综合交易平台交易分析专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="排名">
        <DataList :list="list1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各品种成交均价">
        <ProgressList :list="list2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="采购供应数据">
        <PurchaseChart />
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="累计违规举报次数">
        <ReportChart />
      </m-card>
    </div>
  </div>
</template>

<script>
import DataList from './components/list'
import ProgressList from './components/progress-list'
import ThemeTitle from './components/title'
import ReportChart from './components/report-chart.vue'
import PurchaseChart from './components/purchase-chart.vue'
import GuangdongMap from './components/map'
export default {
  name: 'GDProduction',
  components: {
    DataList,
    ProgressList,
    ThemeTitle,
    PurchaseChart,
    ReportChart,
    GuangdongMap,
  },
  data() {
    return {
      list1: [
        {name: '淡水鱼苗', value: 8279, unit: '亿尾'},
        {name: '淡水鱼种', value: 222544, unit: '吨'},
        {name: '投放鱼种', value: 193027, unit: '吨'},
        {name: '稚鳖', value: 6549, unit: '万只'},
        {name: '稚龟', value: 655, unit: '万只'},
        {name: '鳗苗捕捞', value: 43, unit: '千克'},
        {name: '海水鱼苗', value: 508510, unit: '万尾'},
        {name: '虾类育苗', value: 5455, unit: '万尾'},
        {name: '贝类育苗', value: 293678, unit: '万尾'},
        {name: '海带', value: 100, unit: '亿株'},
        {name: '紫菜', value: 0.06, unit: '亿株'},
        {name: '海参', value: 0.09, unit: '亿头'},
      ],
      list2: [
        {name: '淡水鱼苗', value: 15, unit: '元/斤'},
        {name: '淡水鱼种', value: 12, unit: '元/斤'},
        {name: '投放鱼种', value: 29, unit: '元/斤'},
        {name: '稚鳖', value: 21, unit: '元/斤'},
        {name: '稚龟', value: 15, unit: '元/斤'},
        {name: '鳗苗捕捞', value: 11, unit: '元/斤'},
        {name: '海水鱼苗', value: 19, unit: '元/斤'},
        {name: '虾类育苗', value: 9, unit: '元/斤'},
        {name: '贝类育苗', value: 21, unit: '元/斤'},
        {name: '海带', value: 28, unit: '元/斤'},
        {name: '紫菜', value: 4, unit: '元/斤'},
        {name: '海参', value: 200, unit: '元/斤'},
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
#container
  width 100%
  height 100%
  background-size cover
  background-position center
  background-color #061627
  position relative
  display grid
  grid-template-areas \
    'box1 . . box2'\
    'box1 . . box2'\
    'box3 box3 box4 box4'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 1fr 1.2fr 1.2fr 1fr
  grid-gap 0.7rem
  padding 0.7rem
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
</style>
