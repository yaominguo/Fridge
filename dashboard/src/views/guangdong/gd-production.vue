<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap key="production" :data="mapData" :visualConfig="visualConfig" visualFormatter="{b}<br/>养殖面积：{c}公顷"/>
    <ThemeTitle style="width: 150%;margin-left:20%;">广东省渔业生产专题</ThemeTitle>
    <div class="area">
      <p>当前广东省养殖面积</p>
      <b v-if="area"><m-flip :value="area"/></b>
      <span>公顷</span>
    </div>
    <div class="box1">
      <m-card mode="2" title="各种类养殖产量(吨)">
        <DataList :list="production" :decimal="0"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各市养殖面积(亩)">
        <ProductionList :list="cityData"/>
      </m-card>
    </div>
    <!-- <div class="box3">
      <m-card mode="2" title="特色品种养殖产量">
        <m-chart :showLegend="false" :options="options" :data="data" />
      </m-card>
    </div> -->
    <div class="box4">
      <m-card mode="2" title="养殖总面积对比">
        <m-chart :showLegend="false" :options="options1" :data="data1"/>
      </m-card>
    </div>
    <div class="box5">
      <m-card mode="2" title="海水养殖面积对比">
        <m-chart :showLegend="false" :options="options2" :data="data2"/>
      </m-card>
    </div>
    <div class="box6">
      <m-card mode="2" title="淡水养殖面积对比">
        <m-chart :showLegend="false" :options="options3" :data="data3"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import DataList from './components/list'
import ProductionList from './components/production-list'
import ThemeTitle from './components/title'
import GuangdongMap from './components/map'
import axios from 'axios'
export default {
  name: 'GDProduction',
  components: {
    DataList,
    ProductionList,
    ThemeTitle,
    GuangdongMap,
  },
  data() {
    return {
      area: 0,
      production: [],
      specialProduction: [],
      cityData: [],
      options1: {
        colors: [['#1FECFF', '#0076FF']],
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(公顷)',
          min: 450000,
          max: 600000,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      options2: {
        colors: [['#1FECFF', '#0076FF']],
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(公顷)',
          min: 150000,
          max: 200000,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      options3: {
        colors: [['#1FECFF', '#0076FF']],
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(公顷)',
          min: 300000,
          max: 400000,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      data1: [],
      data2: [],
      data3: [],
      visualConfig: {
        pieces: [
          {min:0, max: 10000},
          {min:10001, max: 20000},
          {min:20001, max: 30000},
          {min:30001, max: 40000},
          {min:40001},
        ]
      },
      mapData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-production.json').then(res => {
        for(let key in res.data) {
          this[key] = res.data[key]
        }
        const data1 = [], data2 = [], data3 = []
        this.totalArea.forEach((item, index) => {
          this.options1.xAxis.data.push(item.name)
          this.options2.xAxis.data.push(item.name)
          this.options3.xAxis.data.push(item.name)
          data1.push(item.value)
          data2.push(this.seaArea[index].value)
          data3.push(this.waterArea[index].value)
        })
        this.data1 = [{data: data1}]
        this.data2 = [{data: data2}]
        this.data3 = [{data: data3}]
        this.mapData = this.cityData.map(item => {
          return {
            name: item.name,
            value: item.area,
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    'box1 . . box2'\
    'box1 . . box2'\
    'box4 box5 box6 box2'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 1fr 1fr 1fr 1fr
  .box1
    grid-area box1
    width 80%
  .box2
    grid-area box2
  // .box3
  //   grid-area box3
  .box4
    grid-area box4
  .box5
    grid-area box5
  .box6
    grid-area box6
  .area
    font-size 1.8rem
    color $color-map(1)
    position absolute
    top 10%
    left 0
    right 0
    text-align center
    p
      color #fff
      font-family $font-pang
    b
      font-size 3rem
    >span
      font-family $font-pang
</style>
