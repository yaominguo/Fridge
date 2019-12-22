<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <FishMap />
    <ThemeTitle style="width: 120%;">广东省罗非鱼专题</ThemeTitle>
    <div class="flag">
      <p><span/>供应量</p>
      <p><span/>采购量</p>
    </div>
    <div class="box1">
      <m-card mode="2" title="排名">
        <div class="apply-demand">
          <div>
            <p>市场供应量排行</p>
            <ApplyDemandList :list="list1"/>
          </div>
          <div>
            <p>市场需求量排行</p>
            <ApplyDemandList :list="list1"/>
          </div>
        </div>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="市场供需数据">
        <MarketingChart />
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="当年罗非鱼各规格均价">
        <m-chart :options="options1" :data="data1"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import ApplyDemandList from './components/apply-demand-list'
import ThemeTitle from './components/title'
import MarketingChart from './components/marketing-chart.vue'
import FishMap from './components/fish-map'
import axios from 'axios'
export default {
  name: 'GDFish',
  components: {
    ApplyDemandList,
    ThemeTitle,
    MarketingChart,
    FishMap,
  },
  data() {
    return {
      list1: [
        {name: '绿色泉水养殖专业合作社', value: 200, unit: '吨'},
        {name: '明基水产品有限公司', value: 192, unit: '吨'},
        {name: '茂南三高良种繁殖基地', value: 159, unit: '吨'},
        {name: '强匠冷冻食品经营部', value: 121, unit: '吨'},
        {name: '新吉奥罗非鱼苗繁育场', value: 115, unit: '吨'},
        {name: '阳西益豪水产食品加工厂', value: 101, unit: '吨'},
        {name: '中恒食品添加剂有限公司', value: 69, unit: '吨'},
        {name: '北京自伍鑫发水产商贸有限公司', value: 59, unit: '吨'},
      ],
      options1: {
        colors: ['#0076FF', '#F47C1F', '#21640D'],
        legend: {
          left: '60%'
        },
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(元)',
          max: 8,
        },
        series: {
          type: 'line',
          symbol: 'circle',
          areaStyle: {
            opacity: 0.5,
          },
        }
      },
      data1: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-fish.json').then(res => {
        const {comparison} = res.data
        this.options1.xAxis.data = comparison.name
        this.data1 = comparison.value.reverse()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. . . box1'\
    '. . . box1'\
    'box2 box2 box3 box3'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 2fr 1fr 1fr 2fr
  .flag
    display flex
    position absolute
    top 15%
    left 5%
    font-family $font-pang
    font-size 1.2rem
    p
      display flex
      align-items center
      &:first-child
        color #5BD5FF
        span
          background #5BD5FF
      &:last-child
        color $color-green
        margin-left 3rem
        span
          background $color-green
      span
        display inline-block
        width 0.8rem
        height 0.8rem
        border-radius 50%
        margin-right 0.5rem
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
.apply-demand
  display flex
  height 100%
  >div
    width 50%
    height 100%
    overflow hidden
    >p
      font-family $font-pang
      font-size 1.4rem
      color $color-map(1)
      padding 0.5rem 1rem 0
</style>
