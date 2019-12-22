<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap :data="tradeSituation" :visualConfig="visualConfig" visualFormatter="{b}<br/>水产苗种交易产值：{c}万元"/>
    <ThemeTitle style="width: 310%;">渔业种业综合交易平台交易分析专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="各市水产苗种交易产值">
        <ProgressList :list="tradeSituation"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="价格情况">
        <ProgressList :list="priceSituation" color="gold"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="一二季度各水产品成交价格涨跌情况">
        <div class="trend-wrapper">
          <TradeTrend :list="trendData.slice(0,17)"/>
          <TradeTrend :list="trendData.slice(17)"/>
        </div>
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="供求信息">
        <SupplyDemandList :list="randomData"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProgressList from './components/progress-list'
import ThemeTitle from './components/title'
import SupplyDemandList from './components/supply-demand-list'
import TradeTrend from './components/trade-trend'
import GuangdongMap from './components/map'
export default {
  name: 'GDProduction',
  components: {
    ProgressList,
    ThemeTitle,
    SupplyDemandList,
    TradeTrend,
    GuangdongMap,
  },
  data() {
    return {
      priceSituation: [],
      tradeSituation: [],
      trendData: [],
      randomData: [],
      visualConfig: {
        pieces: [
          {min:0, max: 10000},
          {min:10001, max: 20000},
          {min:20001, max: 30000},
          {min:30001, max: 40000},
          {min:40001},
        ]
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-trade.json').then(res => {
        for(let key in res.data) {
          this[key] = res.data[key]
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    'box1 . . . box2'\
    'box1 . . . box2'\
    'box3 box3 box3 box4 box4'
  grid-template-rows 1fr 1fr 18rem
  grid-template-columns 1.4fr 1fr 1fr 1fr 1.5fr
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
  .trend-wrapper
    display flex
    height 100%
    width 100%
    >ul
      width 50%
</style>
